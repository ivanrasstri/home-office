// Общие типы для сообщений между песочницей плагина (code.ts) и UI (ui.ts).

export interface TextRun {
  text: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string; // hex, без #
  fontSize: number; // pt
  fontFace: string;
}

export interface TextElement {
  kind: "text";
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number; // градусы, по часовой стрелке
  align: "left" | "center" | "right" | "justify";
  valign: "top" | "middle" | "bottom";
  runs: TextRun[];
}

export interface ShapeElement {
  kind: "shape";
  shape: "rect" | "roundRect" | "ellipse" | "line";
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  fillColor: string | null; // hex без #, null = без заливки
  fillAlpha: number; // 0..1
  lineColor: string | null;
  lineWidth: number; // pt
}

export interface ImageElement {
  kind: "image";
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  png: Uint8Array;
}

export type SlideElement = TextElement | ShapeElement | ImageElement;

export interface SlideData {
  name: string;
  width: number;
  height: number;
  png: Uint8Array; // полный рендер фрейма — используется для PDF
  elements: SlideElement[]; // используется для PPTX
}

export interface SlidesMessage {
  type: "slides";
  fileName: string;
  slides: SlideData[];
}

export interface ProgressMessage {
  type: "progress";
  done: number;
  total: number;
}

export interface ErrorMessage {
  type: "error";
  message: string;
}
