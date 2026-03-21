import { MathTool } from "../mathTools";
import { geometrySolver } from "../solvers/geometrySolver";

export const geometryTools: MathTool[] = [
  {
    id: "area_circle",
    name: "Area of a Circle",
    category: "Geometry",
    description: "Calculate the area of a circle given its radius.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      if (isNaN(r)) return { result: "Invalid input" };
      return geometrySolver.areaCircle(r);
    },
  },
  {
    id: "area_triangle",
    name: "Area of a Triangle",
    category: "Geometry",
    description: "Calculate the area of a triangle given base and height.",
    inputs: [
      { id: "base", label: "Base (b)", type: "number", placeholder: "10" },
      { id: "height", label: "Height (h)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const b = parseFloat(values.base);
      const h = parseFloat(values.height);
      if (isNaN(b) || isNaN(h)) return { result: "Invalid input" };
      return geometrySolver.areaTriangle(b, h);
    },
  },
  {
    id: "area_rectangle",
    name: "Area of a Rectangle",
    category: "Geometry",
    description: "Calculate the area of a rectangle given length and width.",
    inputs: [
      { id: "length", label: "Length (l)", type: "number", placeholder: "10" },
      { id: "width", label: "Width (w)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const l = parseFloat(values.length);
      const w = parseFloat(values.width);
      if (isNaN(l) || isNaN(w)) return { result: "Invalid input" };
      return geometrySolver.areaRectangle(l, w);
    },
  },
  {
    id: "perimeter_rectangle",
    name: "Perimeter of a Rectangle",
    category: "Geometry",
    description: "Calculate the perimeter of a rectangle.",
    inputs: [
      { id: "length", label: "Length (l)", type: "number", placeholder: "10" },
      { id: "width", label: "Width (w)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const l = parseFloat(values.length);
      const w = parseFloat(values.width);
      if (isNaN(l) || isNaN(w)) return { result: "Invalid input" };
      const p = 2 * (l + w);
      return {
        result: p.toString(),
        steps: [
          `Find perimeter of rectangle with length l = ${l} and width w = ${w}`,
          `Formula: Perimeter = 2(l + w)`,
          `Perimeter = 2(${l} + ${w})`,
          `Perimeter = 2(${l + w})`,
          `Perimeter = ${p}`
        ]
      };
    },
  },
  {
    id: "circumference_circle",
    name: "Circumference of a Circle",
    category: "Geometry",
    description: "Calculate the circumference of a circle.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      if (isNaN(r)) return { result: "Invalid input" };
      const c = 2 * Math.PI * r;
      return {
        result: c.toFixed(4),
        steps: [
          `Find circumference of circle with radius r = ${r}`,
          `Formula: Circumference = 2πr`,
          `Circumference = 2 * π * ${r}`,
          `Circumference ≈ ${c.toFixed(4)}`
        ]
      };
    },
  },
  {
    id: "area_trapezoid",
    name: "Area of a Trapezoid",
    category: "Geometry",
    description: "Calculate the area of a trapezoid given two parallel bases and height.",
    inputs: [
      { id: "a", label: "Base a", type: "number", placeholder: "5" },
      { id: "b", label: "Base b", type: "number", placeholder: "7" },
      { id: "h", label: "Height h", type: "number", placeholder: "4" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const h = parseFloat(values.h);
      if (isNaN(a) || isNaN(b) || isNaN(h)) return { result: "Invalid input" };
      const area = ((a + b) / 2) * h;
      return {
        result: area.toString(),
        steps: [
          `Find area of trapezoid with bases a=${a}, b=${b} and height h=${h}`,
          `Formula: Area = ((a + b) / 2) * h`,
          `Area = ((${a} + ${b}) / 2) * ${h}`,
          `Area = (${a + b} / 2) * ${h}`,
          `Area = ${(a + b) / 2} * ${h}`,
          `Area = ${area}`
        ]
      };
    },
  },
  {
    id: "perimeter_triangle",
    name: "Perimeter of a Triangle",
    category: "Geometry",
    description: "Calculate the perimeter of a triangle given its three sides.",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "3" },
      { id: "b", label: "Side b", type: "number", placeholder: "4" },
      { id: "c", label: "Side c", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const c = parseFloat(values.c);
      if (isNaN(a) || isNaN(b) || isNaN(c)) return { result: "Invalid input" };
      const p = a + b + c;
      return {
        result: p.toString(),
        steps: [
          `Find perimeter of triangle with sides a=${a}, b=${b}, c=${c}`,
          `Formula: Perimeter = a + b + c`,
          `Perimeter = ${a} + ${b} + ${c}`,
          `Perimeter = ${p}`
        ]
      };
    },
  },
  {
    id: "area_parallelogram",
    name: "Area of a Parallelogram",
    category: "Geometry",
    description: "Calculate the area of a parallelogram given base and height.",
    inputs: [
      { id: "base", label: "Base (b)", type: "number", placeholder: "10" },
      { id: "height", label: "Height (h)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const b = parseFloat(values.base);
      const h = parseFloat(values.height);
      if (isNaN(b) || isNaN(h)) return { result: "Invalid input" };
      const area = b * h;
      return {
        result: area.toString(),
        steps: [
          `Find area of parallelogram with base b=${b} and height h=${h}`,
          `Formula: Area = b * h`,
          `Area = ${b} * ${h}`,
          `Area = ${area}`
        ]
      };
    },
  },
  {
    id: "perimeter_parallelogram",
    name: "Perimeter of a Parallelogram",
    category: "Geometry",
    description: "Calculate the perimeter of a parallelogram given two adjacent sides.",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "10" },
      { id: "b", label: "Side b", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid input" };
      const p = 2 * (a + b);
      return {
        result: p.toString(),
        steps: [
          `Find perimeter of parallelogram with adjacent sides a=${a} and b=${b}`,
          `Formula: Perimeter = 2(a + b)`,
          `Perimeter = 2(${a} + ${b})`,
          `Perimeter = 2(${a + b})`,
          `Perimeter = ${p}`
        ]
      };
    },
  },
  {
    id: "area_rhombus",
    name: "Area of a Rhombus",
    category: "Geometry",
    description: "Calculate the area of a rhombus given its two diagonals.",
    inputs: [
      { id: "d1", label: "Diagonal 1 (d1)", type: "number", placeholder: "10" },
      { id: "d2", label: "Diagonal 2 (d2)", type: "number", placeholder: "8" },
    ],
    calculate: (values) => {
      const d1 = parseFloat(values.d1);
      const d2 = parseFloat(values.d2);
      if (isNaN(d1) || isNaN(d2)) return { result: "Invalid input" };
      const area = (d1 * d2) / 2;
      return {
        result: area.toString(),
        steps: [
          `Find area of rhombus with diagonals d1=${d1} and d2=${d2}`,
          `Formula: Area = (d1 * d2) / 2`,
          `Area = (${d1} * ${d2}) / 2`,
          `Area = ${d1 * d2} / 2`,
          `Area = ${area}`
        ]
      };
    },
  },
  {
    id: "perimeter_rhombus",
    name: "Perimeter of a Rhombus",
    category: "Geometry",
    description: "Calculate the perimeter of a rhombus given its side length.",
    inputs: [
      { id: "a", label: "Side length (a)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      if (isNaN(a)) return { result: "Invalid input" };
      const p = 4 * a;
      return {
        result: p.toString(),
        steps: [
          `Find perimeter of rhombus with side length a=${a}`,
          `Formula: Perimeter = 4a`,
          `Perimeter = 4 * ${a}`,
          `Perimeter = ${p}`
        ]
      };
    },
  },
  {
    id: "area_regular_polygon",
    name: "Area of a Regular Polygon",
    category: "Geometry",
    description: "Calculate the area of a regular polygon given number of sides and side length.",
    inputs: [
      { id: "n", label: "Number of sides (n)", type: "number", placeholder: "5" },
      { id: "s", label: "Side length (s)", type: "number", placeholder: "4" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      const s = parseFloat(values.s);
      if (isNaN(n) || isNaN(s) || n < 3) return { result: "Invalid input (n >= 3)" };
      const area = (n * s * s) / (4 * Math.tan(Math.PI / n));
      return {
        result: area.toFixed(4),
        steps: [
          `Find area of regular polygon with n=${n} sides and side length s=${s}`,
          `Formula: Area = (n * s²) / (4 * tan(π/n))`,
          `Area = (${n} * ${s}²) / (4 * tan(π/${n}))`,
          `Area = (${n * s * s}) / (4 * ${Math.tan(Math.PI / n).toFixed(4)})`,
          `Area ≈ ${area.toFixed(4)}`
        ]
      };
    },
  },
  {
    id: "perimeter_regular_polygon",
    name: "Perimeter of a Regular Polygon",
    category: "Geometry",
    description: "Calculate the perimeter of a regular polygon.",
    inputs: [
      { id: "n", label: "Number of sides (n)", type: "number", placeholder: "e.g., 5" },
      { id: "s", label: "Side length (s)", type: "number", placeholder: "e.g., 4" },
    ],
    calculate: (values) => {
      const n = parseFloat(values.n);
      const s = parseFloat(values.s);
      if (isNaN(n) || isNaN(s) || n < 3 || s <= 0) return { result: "Invalid input" };
      
      const perimeter = n * s;
      return {
        result: perimeter.toString(),
        steps: [
          `Find the perimeter of a regular polygon with ${n} sides and side length ${s}`,
          `Formula: Perimeter = n * s`,
          `Perimeter = ${n} * ${s}`,
          `Perimeter = ${perimeter}`
        ]
      };
    },
  },
  {
    id: "area_ellipse",
    name: "Area of an Ellipse",
    category: "Geometry",
    description: "Calculate the area of an ellipse.",
    inputs: [
      { id: "a", label: "Semi-major axis (a)", type: "number", placeholder: "e.g., 5" },
      { id: "b", label: "Semi-minor axis (b)", type: "number", placeholder: "e.g., 3" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return { result: "Invalid input" };
      
      const area = Math.PI * a * b;
      return {
        result: area.toFixed(4),
        steps: [
          `Find the area of an ellipse with semi-major axis a=${a} and semi-minor axis b=${b}`,
          `Formula: Area = π * a * b`,
          `Area = π * ${a} * ${b}`,
          `Area ≈ ${area.toFixed(4)}`
        ]
      };
    },
  },
  {
    id: "area_sector",
    name: "Area of a Sector",
    category: "Geometry",
    description: "Calculate the area of a circular sector.",
    inputs: [
      { id: "r", label: "Radius (r)", type: "number", placeholder: "e.g., 5" },
      { id: "theta", label: "Central Angle (θ in degrees)", type: "number", placeholder: "e.g., 60" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.r);
      const theta = parseFloat(values.theta);
      if (isNaN(r) || isNaN(theta) || r <= 0 || theta <= 0 || theta > 360) return { result: "Invalid input" };
      
      const area = (theta / 360) * Math.PI * r * r;
      return {
        result: area.toFixed(4),
        steps: [
          `Find the area of a sector with radius r=${r} and angle θ=${theta}°`,
          `Formula: Area = (θ/360) * π * r²`,
          `Area = (${theta}/360) * π * ${r}²`,
          `Area = ${(theta/360).toFixed(4)} * π * ${r * r}`,
          `Area ≈ ${area.toFixed(4)}`
        ]
      };
    },
  },
  {
    id: "arc_length",
    name: "Arc Length of a Sector",
    category: "Geometry",
    description: "Calculate the arc length of a circular sector.",
    inputs: [
      { id: "r", label: "Radius (r)", type: "number", placeholder: "e.g., 5" },
      { id: "theta", label: "Central Angle (θ in degrees)", type: "number", placeholder: "e.g., 60" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.r);
      const theta = parseFloat(values.theta);
      if (isNaN(r) || isNaN(theta) || r <= 0 || theta <= 0 || theta > 360) return { result: "Invalid input" };
      
      const arcLength = (theta / 360) * 2 * Math.PI * r;
      return {
        result: arcLength.toFixed(4),
        steps: [
          `Find the arc length of a sector with radius r=${r} and angle θ=${theta}°`,
          `Formula: Arc Length = (θ/360) * 2 * π * r`,
          `Arc Length = (${theta}/360) * 2 * π * ${r}`,
          `Arc Length = ${(theta/360).toFixed(4)} * 2 * π * ${r}`,
          `Arc Length ≈ ${arcLength.toFixed(4)}`
        ]
      };
    },
  }
];
