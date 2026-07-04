import { buildSlideElements } from "./elements";
import type { SlideData, SlideElement } from "./shared";

figma.showUI(__html__, { width: 340, height: 320, themeColors: true });

type ExportableNode = FrameNode | ComponentNode | ComponentSetNode | InstanceNode;

function isExportable(node: SceneNode): node is ExportableNode {
  return (
    node.type === "FRAME" ||
    node.type === "COMPONENT" ||
    node.type === "COMPONENT_SET" ||
    node.type === "INSTANCE"
  );
}

function collectSlides(): ExportableNode[] {
  const selected = figma.currentPage.selection.filter(isExportable);
  const nodes = selected.length > 0 ? selected : figma.currentPage.children.filter(isExportable);
  // Порядок чтения: сверху вниз (по рядам), внутри ряда — слева направо.
  return [...nodes].sort((a, b) => {
    const rowA = Math.round(a.y / 50);
    const rowB = Math.round(b.y / 50);
    return rowA !== rowB ? rowA - rowB : a.x - b.x;
  });
}

function safeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, "_").trim() || "presentation";
}

figma.ui.onmessage = async (msg: { type: string; scale?: number }) => {
  if (msg.type !== "export") return;

  const scale = Math.min(4, Math.max(1, msg.scale ?? 2));
  const nodes = collectSlides();

  if (nodes.length === 0) {
    figma.ui.postMessage({
      type: "error",
      message:
        "Не нашёл фреймов. Выдели слайды (фреймы) или открой страницу, где фреймы лежат на верхнем уровне.",
    });
    return;
  }

  const slides: SlideData[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    // Полный растр фрейма — нужен только для PDF (там "экран" и предполагается).
    const png = await node.exportAsync({
      format: "PNG",
      constraint: { type: "SCALE", value: scale },
    });

    // Для PPTX — реальные элементы (текст/фигуры), а не картинка целиком.
    // Если слайд слишком сложный (много узлов) — откатываемся на один
    // элемент-картинку на весь слайд, чтобы не сгенерировать неподъёмный pptx.
    let elements: SlideElement[] | null = null;
    try {
      elements = await buildSlideElements(node, scale);
    } catch (e) {
      elements = null;
    }
    if (!elements) {
      elements = [
        {
          kind: "image",
          x: 0,
          y: 0,
          w: node.width,
          h: node.height,
          rotation: 0,
          png,
        },
      ];
    }

    slides.push({ name: node.name, width: node.width, height: node.height, png, elements });
    figma.ui.postMessage({ type: "progress", done: i + 1, total: nodes.length });
  }

  figma.ui.postMessage({
    type: "slides",
    fileName: safeFileName(figma.root.name),
    slides,
  });
};
