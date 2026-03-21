import { ReactNode } from "react";
import { basicMathTools } from "./tools/basicMathTools";
import { arithmeticTools } from "./tools/arithmeticTools";
import { algebraTools } from "./tools/algebraTools";
import { trigTools } from "./tools/trigTools";
import { geometryTools } from "./tools/geometryTools";
import { mensurationTools } from "./tools/mensurationTools";
import { coordinateGeometryTools } from "./tools/coordinateGeometryTools";
import { calculusTools } from "./tools/calculusTools";
import { advancedMathTools } from "./tools/advancedMathTools";
import { utilityTools } from "./tools/utilityTools";

export type ToolInput = {
  id: string;
  label: string;
  type: "number" | "text" | "select";
  options?: { label: string; value: string }[];
  placeholder?: string;
};

export type ToolResult = {
  result: string | ReactNode;
  steps?: string[];
  formula?: string;
};

export type MathTool = {
  id: string;
  name: string;
  category: string;
  description: string;
  inputs: ToolInput[];
  calculate: (values: Record<string, string>) => ToolResult;
};

export const mathTools: MathTool[] = [
  ...basicMathTools,
  ...arithmeticTools,
  ...algebraTools,
  ...trigTools,
  ...geometryTools,
  ...mensurationTools,
  ...coordinateGeometryTools,
  ...calculusTools,
  ...advancedMathTools,
  ...utilityTools,
];
