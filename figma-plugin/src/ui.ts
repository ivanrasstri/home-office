import { PDFDocument } from "pdf-lib";
import PptxGenJS from "pptxgenjs";

interface Slide {
  name: string;
  width: number;
  height: number;
  png: Uint8Array;
}

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
    const slides: Slide[] = msg.slides;
    try {
      statusEl.textContent = "Собираю PDF...";
      await buildAndDownloadPdf(msg.fileName, slides);
      statusEl.textContent = "Собираю PPTX...";
      await buildAndDownloadPptx(msg.fileName, slides);
      statusEl.textContent = `Готово: ${slides.length} слайдов -> скачаны PDF и PPTX.`;
    } catch (e) {
      statusEl.textContent = `Ошибка сборки: ${(e as Error).message}`;
    } finally {
      exportBtn.disabled = false;
    }
  }
};

async function buildAndDownloadPdf(fileName: string, slides: Slide[]): Promise<void> {
  const pdf = await PDFDocument.create();
  for (const slide of slides) {
    const image = await pdf.embedPng(slide.png);
    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  const bytes = await pdf.save();
  download(`${fileName}.pdf`, new Blob([new Uint8Array(bytes)], { type: "application/pdf" }));
}

async function buildAndDownloadPptx(fileName: string, slides: Slide[]): Promise<void> {
  const pptx = new PptxGenJS();

  // pptxgenjs оперирует дюймами; переводим px (96dpi) в дюймы и ограничиваем
  // максимум разрешённым PowerPoint размером слайда (56").
  const maxW = clampInches(Math.max(...slides.map((s) => s.width)) / 96);
  const maxH = clampInches(Math.max(...slides.map((s) => s.height)) / 96);
  pptx.defineLayout({ name: "FIGMA", width: maxW, height: maxH });
  pptx.layout = "FIGMA";

  for (const slide of slides) {
    const s = pptx.addSlide();
    const { x, y, w, h } = fit(slide.width / 96, slide.height / 96, maxW, maxH);
    s.addImage({ data: toBase64Png(slide.png), x, y, w, h });
  }

  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  download(`${fileName}.pptx`, blob);
}

function fit(w: number, h: number, boxW: number, boxH: number) {
  const scale = Math.min(boxW / w, boxH / h);
  const fw = w * scale;
  const fh = h * scale;
  return { x: (boxW - fw) / 2, y: (boxH - fh) / 2, w: fw, h: fh };
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
