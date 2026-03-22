import {
  Calculator,
  FunctionSquare,
  Triangle,
  Square,
  Hash,
  Star,
  Clock,
  BookOpen,
  LineChart,
  GraduationCap,
  Sigma,
  Box,
  Map,
  Wrench,
  Flame,
  Home,
  BarChart,
  PieChart
} from "lucide-react";

export const MAIN_MENU = [
  { id: "home", name: "Home", icon: Home },
  { id: "all", name: "All Tools", icon: Box },
];

export const CLASSES = [
  { id: "Class 8", name: "Class 8", icon: BookOpen },
  { id: "Class 9-10", name: "Class 9-10", icon: BookOpen },
  { id: "Class 11-12", name: "Class 11-12", icon: BookOpen },
  { id: "General", name: "General", icon: BookOpen },
];

export const CATEGORIES = [
  { id: "Basic Math", name: "Basic Math", icon: Calculator },
  { id: "Arithmetic & Number System", name: "Arithmetic & Number System", icon: Hash },
  { id: "Algebra", name: "Algebra", icon: FunctionSquare },
  { id: "Trigonometry", name: "Trigonometry", icon: Triangle },
  { id: "Geometry", name: "Geometry", icon: Square },
  { id: "Mensuration", name: "Mensuration", icon: Box },
  { id: "Coordinate Geometry", name: "Coordinate Geometry", icon: Map },
  { id: "Calculus", name: "Calculus", icon: Sigma },
  { id: "Statistics & Data", name: "Statistics & Data", icon: BarChart },
  { id: "Charts & Graphs", name: "Charts & Graphs", icon: PieChart },
  { id: "Advanced Math (JEE Level)", name: "Advanced Math (JEE Level)", icon: GraduationCap },
  { id: "Utilities", name: "Utilities", icon: Wrench },
];

export const EXTRA_MENU = [
  { id: "Formulas", name: "Formula Library", icon: BookOpen },
  { id: "Graphs", name: "Graph Viewer", icon: LineChart },
];
