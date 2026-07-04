import { PDFDocument } from "pdf-lib";
import PptxGenJS from "pptxgenjs";
import type { SlideData, SlideElement, TextRun } from "./shared";

const exportBtn = document.getElementById("export") as HTMLButtonElement;
const scaleInput = document.getElementById("scale") as HTMLInputElement;
const statusEl = document.getElementById("status") as HTMLDivElement;

exportBtn.addEventListener("click", () => {
  exportBtn.disabled = true;
  statusEl.textContent = "Рендерю кадры в Figma...";
  parent.postMessage(
    { pluginMessage: { type: "export", scale: Number(scaleInput.value) || 2 } },
    "*",
  );
});

window.onmessage = async (event: MessageEvent) => {
  const msg = event.data.pluginMessage;
  if (!msg) return;

  if (msg.type === "progress") {
    statusEl.textContent = `Рендер: ${msg.done}/${msg.total}`;
    return;
  }

  if (msg.type === "error") {
    statusEl.textContent = `Ошибка: ${msg.message}`;
    exportBtn.disabled = false;
    return;
  }

  if (msg.type === "slides") {
    const slides: SlideData[] = msg.slides;
    try {
      statusEl.textContent = "Собираю PDF...";
      await buildAndDownloadPdf(msg.fileName, slides);
      statusEl.textContent = "Собираю PPTX (текст и фигуры как элементы)...";
      await buildAndDownloadPptx(msg.fileName, slides);
      statusEl.textContent = `Готово: ${slides.length} слайдов -> скачаны PDF и PPTX.`;
    } catch (e) {
      statusEl.textContent = `Ошибка сборки: ${(e as Error).message}`;
    } finally {
      exportBtn.disabled = false;
    }
  }
};

async function buildAndDownloadPdf(fileName: string, slides: SlideData[]): Promise<void> {
  const pdf = await PDFDocument.create();
  for (const slide of slides) {
    const image = await pdf.embedPng(slide.png);
    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  const bytes = await pdf.save();
  download(`${fileName}.pdf`, new Blob([new Uint8Array(bytes)], { type: "application/pdf" }));
}

const PX_PER_INCH = 96;
const PT_PER_PX = 0.75; // 96dpi -> 72dpi

async function buildAndDownloadPptx(fileName: string, slides: SlideData[]): Promise<void> {
  const pptx = new PptxGenJS();

  // У pptx один общий размер слайда на всю презентацию — берём самый крупный
  // фрейм за основу, остальные слайды масштабируем и центрируем в него, не
  // теряя относительного расположения элементов.
  const baseWpx = Math.max(...slides.map((s) => s.width));
  const baseHpx = Math.max(...slides.map((s) => s.height));
  const baseWin = clampInches(baseWpx / PX_PER_INCH);
  const baseHin = clampInches(baseHpx / PX_PER_INCH);
  pptx.defineLayout({ name: "FIGMA", width: baseWin, height: baseHin });
  pptx.layout = "FIGMA";

  for (const slide of slides) {
    const s = pptx.addSlide();
    const fit = fitBox(slide.width, slide.height, baseWpx, baseHpx);
    for (const el of slide.elements) {
      addElementToSlide(s, el, fit);
    }
  }

  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  download(`${fileName}.pptx`, blob);
}

interface Fit {
  offsetXpx: number;
  offsetYpx: number;
  scale: number;
}

function fitBox(w: number, h: number, boxW: number, boxH: number): Fit {
  if (!w || !h) return { offsetXpx: 0, offsetYpx: 0, scale: 1 };
  const scale = Math.min(boxW / w, boxH / h);
  return { offsetXpx: (boxW - w * scale) / 2, offsetYpx: (boxH - h * scale) / 2, scale };
}

function px(el: number, fit: Fit): number {
  return el * fit.scale;
}

function toInches(pxValue: number): number {
  return pxValue / PX_PER_INCH;
}

function addElementToSlide(slide: PptxGenJS.Slide, el: SlideElement, fit: Fit): void {
  const x = toInches(fit.offsetXpx + px(el.x, fit));
  const y = toInches(fit.offsetYpx + px(el.y, fit));
  const w = toInches(px(el.w, fit));
  const h = toInches(px(el.h, fit));
  const rotate = el.rotation ? -Math.round(el.rotation) : 0; // Figma: по часовой = отрицательный угол в pptxgenjs

  if (el.kind === "text") {
    const runs = el.runs.map((run: TextRun) => ({
      text: run.text,
      options: {
        bold: run.bold,
        italic: run.italic,
        underline: run.underline ? { style: "sng" as const } : undefined,
        color: run.color,
        fontSize: Math.max(1, Math.round(run.fontSize * PT_PER_PX * fit.scale)),
        fontFace: run.fontFace,
      },
    }));
    slide.addText(runs, {
      x,
      y,
      w,
      h,
      rotate,
      align: el.align,
      valign: el.valign,
      wrap: true,
      margin: 0,
    });
    return;
  }

  if (el.kind === "shape") {
    const shapeType =
      el.shape === "ellipse"
        ? "ellipse"
        : el.shape === "line"
          ? "line"
          : el.shape === "roundRect"
            ? "roundRect"
            : "rect";
    slide.addShape(shapeType as PptxGenJS.ShapeType, {
      x,
      y,
      w,
      h,
      rotate,
      fill: el.fillColor ? { color: el.fillColor, transparency: Math.round((1 - el.fillAlpha) * 100) } : { type: "none" },
      line: el.lineColor ? { color: el.lineColor, width: el.lineWidth || 1 } : { type: "none" },
    });
    return;
  }

  // image
  slide.addImage({ data: toBase64Png(el.png), x, y, w, h, rotate });
}

function clampInches(value: number): number {
  return Math.min(56, Math.max(1, value || 10));
}

function toBase64Png(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return `data:image/png;base64,${btoa(binary)}`;
}

function download(name: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
