import type { ShapeElement, SlideElement, TextElement, TextRun } from "./shared";

// Ограничитель: если в слайде слишком много узлов, векторизация всех как
// отдельных элементов станет медленной и даст неподъёмный pptx — в этом
// случае вызывающий код должен откатиться на один экспортированный PNG.
export const MAX_ELEMENTS_PER_SLIDE = 400;

type Mat = [[number, number, number], [number, number, number]];

function multiply(m1: Mat, m2: Mat): Mat {
  const [[a1, c1, tx1], [b1, d1, ty1]] = m1;
  const [[a2, c2, tx2], [b2, d2, ty2]] = m2;
  return [
    [a1 * a2 + c1 * b2, a1 * c2 + c1 * d2, a1 * tx2 + c1 * ty2 + tx1],
    [b1 * a2 + d1 * b2, b1 * c2 + d1 * d2, b1 * tx2 + d1 * ty2 + ty1],
  ];
}

function invert(m: Mat): Mat {
  const [[a, c, tx], [b, d, ty]] = m;
  const det = a * d - c * b;
  if (Math.abs(det) < 1e-9) return [[1, 0, 0], [0, 1, 0]];
  const ia = d / det;
  const ic = -c / det;
  const ib = -b / det;
  const id = a / det;
  const itx = -(ia * tx + ic * ty);
  const ity = -(ib * tx + id * ty);
  return [[ia, ic, itx], [ib, id, ity]];
}

/** Позиция левого верхнего угла (до поворота) узла в системе координат фрейма-слайда. */
function positionRelativeToFrame(node: SceneNode, frame: SceneNode): { x: number; y: number } {
  const rel = multiply(invert(frame.absoluteTransform as Mat), node.absoluteTransform as Mat);
  return { x: rel[0][2], y: rel[1][2] };
}

function colorToHex(color: RGB): string {
  const toHex = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, "0");
  return `${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`.toUpperCase();
}

function firstSolidFill(node: MinimalFillsMixin): { color: string; alpha: number } | null {
  const fills = node.fills;
  if (fills === figma.mixed || !Array.isArray(fills)) return null;
  const solid = fills.find((f) => f.type === "SOLID" && f.visible !== false) as SolidPaint | undefined;
  if (!solid) return null;
  return { color: colorToHex(solid.color), alpha: solid.opacity ?? 1 };
}

function firstSolidStroke(node: MinimalStrokesMixin): { color: string; weight: number } | null {
  const strokes = node.strokes;
  if (!Array.isArray(strokes) || strokes.length === 0) return null;
  const solid = strokes.find((s) => s.type === "SOLID" && s.visible !== false) as SolidPaint | undefined;
  if (!solid) return null;
  const weight = "strokeWeight" in node && typeof node.strokeWeight === "number" ? node.strokeWeight : 1;
  return { color: colorToHex(solid.color), weight };
}

/** true, если у узла заливки/эффекты слишком сложны для честной векторизации
 * (картинка, градиент, несколько заливок, тени/блюры) — тогда его надёжнее
 * растеризовать целиком, чем пытаться приблизить фигурой pptx. */
function needsRasterFallback(node: SceneNode): boolean {
  if ("effects" in node && node.effects.some((e) => e.visible !== false)) return true;
  if ("fills" in node) {
    const fills = (node as MinimalFillsMixin).fills;
    if (fills === figma.mixed) return true;
    if (Array.isArray(fills)) {
      const visible = fills.filter((f) => f.visible !== false);
      if (visible.length > 1) return true;
      if (visible.length === 1 && visible[0].type !== "SOLID") return true;
    }
  }
  return false;
}

function pxToPt(px: number): number {
  return px * 0.75; // 96dpi px -> pt (72dpi)
}

async function textToElement(node: TextNode, frame: SceneNode): Promise<TextElement> {
  const { x, y } = positionRelativeToFrame(node, frame);

  const segments = node.getStyledTextSegments([
    "fontSize",
    "fontName",
    "fills",
    "textDecoration",
  ]);

  const runs: TextRun[] = segments.map((seg) => {
    const fontName = seg.fontName as FontName;
    const style = fontName.style.toLowerCase();
    const fillColor =
      Array.isArray(seg.fills) && seg.fills.length > 0 && seg.fills[0].type === "SOLID"
        ? colorToHex((seg.fills[0] as SolidPaint).color)
        : "000000";
    return {
      text: seg.characters,
      bold: style.includes("bold"),
      italic: style.includes("italic"),
      underline: seg.textDecoration === "UNDERLINE",
      color: fillColor,
      fontSize: seg.fontSize as number,
      fontFace: fontName.family,
    };
  });

  const alignMap: Record<string, TextElement["align"]> = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",
    JUSTIFIED: "justify",
  };
  const valignMap: Record<string, TextElement["valign"]> = {
    TOP: "top",
    CENTER: "middle",
    BOTTOM: "bottom",
  };

  return {
    kind: "text",
    x,
    y,
    w: node.width,
    h: node.height,
    rotation: node.rotation,
    align: alignMap[node.textAlignHorizontal] ?? "left",
    valign: valignMap[node.textAlignVertical] ?? "top",
    runs: runs.length > 0 ? runs : [{ text: "", bold: false, italic: false, underline: false, color: "000000", fontSize: 12, fontFace: "Arial" }],
  };
}

function shapeToElement(
  node: RectangleNode | EllipseNode | LineNode,
  frame: SceneNode,
  shape: ShapeElement["shape"],
): ShapeElement {
  const { x, y } = positionRelativeToFrame(node, frame);
  const fill = "fills" in node ? firstSolidFill(node) : null;
  const stroke = "strokes" in node ? firstSolidStroke(node) : null;
  return {
    kind: "shape",
    shape,
    x,
    y,
    w: node.width,
    h: Math.max(node.height, shape === "line" ? 0 : node.height),
    rotation: node.rotation,
    fillColor: fill ? fill.color : null,
    fillAlpha: fill ? fill.alpha : 1,
    lineColor: stroke ? stroke.color : null,
    lineWidth: stroke ? pxToPt(stroke.weight) : 0,
  };
}

async function rasterElement(
  node: SceneNode,
  frame: SceneNode,
  scale: number,
): Promise<SlideElement | null> {
  if (!("exportAsync" in node)) return null;
  const { x, y } = positionRelativeToFrame(node, frame);
  if (node.width <= 0 || node.height <= 0) return null;
  const png = await (node as ExportMixin).exportAsync({
    format: "PNG",
    constraint: { type: "SCALE", value: scale },
  });
  return { kind: "image", x, y, w: node.width, h: node.height, rotation: "rotation" in node ? (node as { rotation: number }).rotation : 0, png };
}

/** Рекурсивно превращает содержимое фрейма-слайда в список pptx-элементов.
 * Возвращает null, если узлов слишком много — вызывающий код должен
 * откатиться на растровый экспорт всего слайда целиком. */
export async function buildSlideElements(
  frame: SceneNode & ChildrenMixin,
  scale: number,
): Promise<SlideElement[] | null> {
  const elements: SlideElement[] = [];

  async function walk(node: SceneNode): Promise<boolean> {
    if (!node.visible) return true;
    if (elements.length >= MAX_ELEMENTS_PER_SLIDE) return false;

    if (node.type === "TEXT") {
      elements.push(await textToElement(node, frame));
      return true;
    }

    if (node.type === "RECTANGLE" && !needsRasterFallback(node)) {
      const radius = "cornerRadius" in node ? node.cornerRadius : 0;
      elements.push(shapeToElement(node, frame, typeof radius === "number" && radius > 0 ? "roundRect" : "rect"));
      return true;
    }

    if (node.type === "ELLIPSE" && !needsRasterFallback(node)) {
      elements.push(shapeToElement(node, frame, "ellipse"));
      return true;
    }

    if (node.type === "LINE") {
      elements.push(shapeToElement(node, frame, "line"));
      return true;
    }

    if (node.type === "GROUP" || (("children" in node) && !needsRasterFallback(node) && isSimpleContainer(node))) {
      const container = node as SceneNode & MinimalFillsMixin;
      if ("fills" in container) {
        const fill = firstSolidFill(container);
        if (fill) {
          elements.push({
            kind: "shape",
            shape: "rect",
            ...positionRelativeToFrame(node, frame),
            w: (node as SceneNode & { width: number }).width,
            h: (node as SceneNode & { height: number }).height,
            rotation: "rotation" in node ? (node as { rotation: number }).rotation : 0,
            fillColor: fill.color,
            fillAlpha: fill.alpha,
            lineColor: null,
            lineWidth: 0,
          });
          if (elements.length >= MAX_ELEMENTS_PER_SLIDE) return false;
        }
      }
      for (const child of (node as ChildrenMixin).children) {
        const ok = await walk(child);
        if (!ok) return false;
      }
      return true;
    }

    // Всё остальное (векторные фигуры, изображения, сложные заливки/эффекты,
    // инстансы компонентов и т.п.) — растрируем как один элемент-картинку.
    const rasterized = await rasterElement(node, frame, scale);
    if (rasterized) elements.push(rasterized);
    return true;
  }

  function isSimpleContainer(node: SceneNode): node is SceneNode & ChildrenMixin {
    // INSTANCE/COMPONENT_SET нарочно исключены: чаще всего это иконки или
    // готовая графика, которую лучше растрировать целиком, чем разбирать
    // на десятки мелких векторных кусочков.
    return node.type === "FRAME" || node.type === "COMPONENT";
  }

  for (const child of frame.children) {
    const ok = await walk(child);
    if (!ok) return null;
  }

  return elements;
}
