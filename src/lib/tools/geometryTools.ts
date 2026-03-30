import { MathTool } from "../mathTools";
import { geometrySolver } from "../solvers/geometrySolver";

export const geometryTools: MathTool[] = [
  {
    id: "area_circle",
    name: "Area of a Circle",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the area of a circle given its radius. Essential for finding the space occupied by circular objects like wheels or fields.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "7", defaultValue: "7" },
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
    classLevel: "Class 8",
    description: "Calculate the area of a triangle given its base and height. A fundamental formula used in architecture, surveying, and 3D modeling.",
    inputs: [
      { id: "base", label: "Base (b)", type: "number", placeholder: "12", defaultValue: "12" },
      { id: "height", label: "Height (h)", type: "number", placeholder: "5", defaultValue: "5" },
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
    classLevel: "Class 8",
    description: "Calculate the area of a rectangle given length and width. Useful for determining floor space, land area, and material requirements.",
    inputs: [
      { id: "length", label: "Length (l)", type: "number", placeholder: "15", defaultValue: "15" },
      { id: "width", label: "Width (w)", type: "number", placeholder: "8", defaultValue: "8" },
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
    classLevel: "Class 8",
    description: "Calculate the total distance around the outside of a rectangle. Perfect for finding the length of fencing or framing needed.",
    inputs: [
      { id: "length", label: "Length (l)", type: "number", placeholder: "15", defaultValue: "15" },
      { id: "width", label: "Width (w)", type: "number", placeholder: "8", defaultValue: "8" },
    ],
    calculate: (values) => {
      const l = parseFloat(values.length);
      const w = parseFloat(values.width);
      if (isNaN(l) || isNaN(w)) return { result: "Invalid input" };
      const p = 2 * (l + w);
      return {
        result: `$$${p}$$`,
        steps: [
          `Find perimeter of rectangle with length $l = ${l}$ and width $w = ${w}$`,
          `Formula: $\\text{Perimeter} = 2(l + w)$`,
          `$\\text{Perimeter} = 2(${l} + ${w})$`,
          `$\\text{Perimeter} = 2(${l + w})$`,
          `$\\text{Perimeter} = ${p}$`
        ]
      };
    },
  },
  {
    id: "circumference_circle",
    name: "Circumference of a Circle",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the distance around the edge of a circle. Useful for measuring circular tracks, rings, and rotational distances.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "7", defaultValue: "7" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      if (isNaN(r)) return { result: "Invalid input" };
      const c = 2 * Math.PI * r;
      return {
        result: `$$${c.toFixed(4)}$$`,
        steps: [
          `Find circumference of circle with radius $r = ${r}$`,
          `Formula: $\\text{Circumference} = 2\\pi r$`,
          `$\\text{Circumference} = 2 \\times \\pi \\times ${r}$`,
          `$\\text{Circumference} \\approx ${c.toFixed(4)}$`
        ]
      };
    },
  },
  {
    id: "area_trapezoid",
    name: "Area of a Trapezoid",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the area of a trapezoid given two parallel bases and height. Often used in land surveying and calculating cross-sectional areas.",
    inputs: [
      { id: "a", label: "Base a", type: "number", placeholder: "6", defaultValue: "6" },
      { id: "b", label: "Base b", type: "number", placeholder: "10", defaultValue: "10" },
      { id: "h", label: "Height h", type: "number", placeholder: "4", defaultValue: "4" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const h = parseFloat(values.h);
      if (isNaN(a) || isNaN(b) || isNaN(h)) return { result: "Invalid input" };
      const area = ((a + b) / 2) * h;
      return {
        result: `$$${area}$$`,
        steps: [
          `Find area of trapezoid with bases $a=${a}$, $b=${b}$ and height $h=${h}$`,
          `Formula: $\\text{Area} = \\frac{a + b}{2} \\times h$`,
          `$\\text{Area} = \\frac{${a} + ${b}}{2} \\times ${h}$`,
          `$\\text{Area} = \\frac{${a + b}}{2} \\times ${h}$`,
          `$\\text{Area} = ${(a + b) / 2} \\times ${h}$`,
          `$\\text{Area} = ${area}$`
        ]
      };
    },
  },
  {
    id: "perimeter_triangle",
    name: "Perimeter of a Triangle",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the total distance around a triangle given its three sides. Useful for finding the boundary length of triangular plots.",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "3", defaultValue: "3" },
      { id: "b", label: "Side b", type: "number", placeholder: "4", defaultValue: "4" },
      { id: "c", label: "Side c", type: "number", placeholder: "5", defaultValue: "5" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const c = parseFloat(values.c);
      if (isNaN(a) || isNaN(b) || isNaN(c)) return { result: "Invalid input" };
      const p = a + b + c;
      return {
        result: `$$${p}$$`,
        steps: [
          `Find perimeter of triangle with sides $a=${a}$, $b=${b}$, $c=${c}$`,
          `Formula: $\\text{Perimeter} = a + b + c$`,
          `$\\text{Perimeter} = ${a} + ${b} + ${c}$`,
          `$\\text{Perimeter} = ${p}$`
        ]
      };
    },
  },
  {
    id: "area_parallelogram",
    name: "Area of a Parallelogram",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the area of a parallelogram given base and height. Important for geometry problems involving slanted rectangular shapes.",
    inputs: [
      { id: "base", label: "Base (b)", type: "number", placeholder: "12", defaultValue: "12" },
      { id: "height", label: "Height (h)", type: "number", placeholder: "7", defaultValue: "7" },
    ],
    calculate: (values) => {
      const b = parseFloat(values.base);
      const h = parseFloat(values.height);
      if (isNaN(b) || isNaN(h)) return { result: "Invalid input" };
      const area = b * h;
      return {
        result: `$$${area}$$`,
        steps: [
          `Find area of parallelogram with base $b=${b}$ and height $h=${h}$`,
          `Formula: $\\text{Area} = b \\times h$`,
          `$\\text{Area} = ${b} \\times ${h}$`,
          `$\\text{Area} = ${area}$`
        ]
      };
    },
  },
  {
    id: "perimeter_parallelogram",
    name: "Perimeter of a Parallelogram",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the perimeter of a parallelogram given two adjacent sides. Helps in determining the boundary length of slanted shapes.",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "12", defaultValue: "12" },
      { id: "b", label: "Side b", type: "number", placeholder: "7", defaultValue: "7" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid input" };
      const p = 2 * (a + b);
      return {
        result: `$$${p}$$`,
        steps: [
          `Find perimeter of parallelogram with adjacent sides $a=${a}$ and $b=${b}$`,
          `Formula: $\\text{Perimeter} = 2(a + b)$`,
          `$\\text{Perimeter} = 2(${a} + ${b})$`,
          `$\\text{Perimeter} = 2(${a + b})$`,
          `$\\text{Perimeter} = ${p}$`
        ]
      };
    },
  },
  {
    id: "area_rhombus",
    name: "Area of a Rhombus",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the area of a rhombus given its two diagonals. Useful for calculating the area of diamond-shaped objects.",
    inputs: [
      { id: "d1", label: "Diagonal 1 (d1)", type: "number", placeholder: "10", defaultValue: "10" },
      { id: "d2", label: "Diagonal 2 (d2)", type: "number", placeholder: "8", defaultValue: "8" },
    ],
    calculate: (values) => {
      const d1 = parseFloat(values.d1);
      const d2 = parseFloat(values.d2);
      if (isNaN(d1) || isNaN(d2)) return { result: "Invalid input" };
      const area = (d1 * d2) / 2;
      return {
        result: `$$${area}$$`,
        steps: [
          `Find area of rhombus with diagonals $d1=${d1}$ and $d2=${d2}$`,
          `Formula: $\\text{Area} = \\frac{d1 \\times d2}{2}$`,
          `$\\text{Area} = \\frac{${d1} \\times ${d2}}{2}$`,
          `$\\text{Area} = \\frac{${d1 * d2}}{2}$`,
          `$\\text{Area} = ${area}$`
        ]
      };
    },
  },
  {
    id: "perimeter_rhombus",
    name: "Perimeter of a Rhombus",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the perimeter of a rhombus given its side length. Since all sides are equal, this is a quick calculation.",
    inputs: [
      { id: "a", label: "Side length (a)", type: "number", placeholder: "5", defaultValue: "5" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      if (isNaN(a)) return { result: "Invalid input" };
      const p = 4 * a;
      return {
        result: `$$${p}$$`,
        steps: [
          `Find perimeter of rhombus with side length $a=${a}$`,
          `Formula: $\\text{Perimeter} = 4a$`,
          `$\\text{Perimeter} = 4 \\times ${a}$`,
          `$\\text{Perimeter} = ${p}$`
        ]
      };
    },
  },
  {
    id: "area_regular_polygon",
    name: "Area of a Regular Polygon",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the area of a regular polygon given the number of sides and side length. Great for shapes like pentagons, hexagons, and octagons.",
    inputs: [
      { id: "n", label: "Number of sides (n)", type: "number", placeholder: "6", defaultValue: "6" },
      { id: "s", label: "Side length (s)", type: "number", placeholder: "4", defaultValue: "4" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      const s = parseFloat(values.s);
      if (isNaN(n) || isNaN(s) || n < 3) return { result: "Invalid input (n >= 3)" };
      const area = (n * s * s) / (4 * Math.tan(Math.PI / n));
      return {
        result: `$$${area.toFixed(4)}$$`,
        steps: [
          `Find area of regular polygon with $n=${n}$ sides and side length $s=${s}$`,
          `Formula: $\\text{Area} = \\frac{n \\times s^2}{4 \\times \\tan(\\frac{\\pi}{n})}$`,
          `$\\text{Area} = \\frac{${n} \\times ${s}^2}{4 \\times \\tan(\\frac{\\pi}{${n}})}$`,
          `$\\text{Area} = \\frac{${n * s * s}}{4 \\times ${Math.tan(Math.PI / n).toFixed(4)}}$`,
          `$\\text{Area} \\approx ${area.toFixed(4)}$`
        ]
      };
    },
  },
  {
    id: "perimeter_regular_polygon",
    name: "Perimeter of a Regular Polygon",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the perimeter of a regular polygon by multiplying the number of sides by the side length.",
    inputs: [
      { id: "n", label: "Number of sides (n)", type: "number", placeholder: "6", defaultValue: "6" },
      { id: "s", label: "Side length (s)", type: "number", placeholder: "4", defaultValue: "4" },
    ],
    calculate: (values) => {
      const n = parseFloat(values.n);
      const s = parseFloat(values.s);
      if (isNaN(n) || isNaN(s) || n < 3 || s <= 0) return { result: "Invalid input" };
      
      const perimeter = n * s;
      return {
        result: `$$${perimeter}$$`,
        steps: [
          `Find the perimeter of a regular polygon with $n=${n}$ sides and side length $s=${s}$`,
          `Formula: $\\text{Perimeter} = n \\times s$`,
          `$\\text{Perimeter} = ${n} \\times ${s}$`,
          `$\\text{Perimeter} = ${perimeter}$`
        ]
      };
    },
  },
  {
    id: "area_ellipse",
    name: "Area of an Ellipse",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the area of an ellipse using its semi-major and semi-minor axes. Useful in astronomy and engineering.",
    inputs: [
      { id: "a", label: "Semi-major axis (a)", type: "number", placeholder: "5", defaultValue: "5" },
      { id: "b", label: "Semi-minor axis (b)", type: "number", placeholder: "3", defaultValue: "3" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return { result: "Invalid input" };
      
      const area = Math.PI * a * b;
      return {
        result: `$$${area.toFixed(4)}$$`,
        steps: [
          `Find the area of an ellipse with semi-major axis $a=${a}$ and semi-minor axis $b=${b}$`,
          `Formula: $\\text{Area} = \\pi \\times a \\times b$`,
          `$\\text{Area} = \\pi \\times ${a} \\times ${b}$`,
          `$\\text{Area} \\approx ${area.toFixed(4)}$`
        ]
      };
    },
  },
  {
    id: "area_sector",
    name: "Area of a Sector",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the area of a circular sector given its radius and central angle. Perfect for finding the area of a 'slice of pie'.",
    inputs: [
      { id: "r", label: "Radius (r)", type: "number", placeholder: "6", defaultValue: "6" },
      { id: "theta", label: "Central Angle (θ in degrees)", type: "number", placeholder: "60", defaultValue: "60" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.r);
      const theta = parseFloat(values.theta);
      if (isNaN(r) || isNaN(theta) || r <= 0 || theta <= 0 || theta > 360) return { result: "Invalid input" };
      
      const area = (theta / 360) * Math.PI * r * r;
      return {
        result: `$$${area.toFixed(4)}$$`,
        steps: [
          `Find the area of a sector with radius $r=${r}$ and angle $\\theta=${theta}^{\\circ}$`,
          `Formula: $\\text{Area} = \\frac{\\theta}{360} \\times \\pi \\times r^2$`,
          `$\\text{Area} = \\frac{${theta}}{360} \\times \\pi \\times ${r}^2$`,
          `$\\text{Area} = ${(theta/360).toFixed(4)} \\times \\pi \\times ${r * r}$`,
          `$\\text{Area} \\approx ${area.toFixed(4)}$`
        ]
      };
    },
  },
  {
    id: "arc_length",
    name: "Arc Length of a Sector",
    category: "Geometry",
    classLevel: "Class 8",
    description: "Calculate the arc length of a circular sector. Useful for determining the distance along a curved path.",
    inputs: [
      { id: "r", label: "Radius (r)", type: "number", placeholder: "6", defaultValue: "6" },
      { id: "theta", label: "Central Angle (θ in degrees)", type: "number", placeholder: "60", defaultValue: "60" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.r);
      const theta = parseFloat(values.theta);
      if (isNaN(r) || isNaN(theta) || r <= 0 || theta <= 0 || theta > 360) return { result: "Invalid input" };
      
      const arcLength = (theta / 360) * 2 * Math.PI * r;
      return {
        result: `$$${arcLength.toFixed(4)}$$`,
        steps: [
          `Find the arc length of a sector with radius $r=${r}$ and angle $\\theta=${theta}^{\\circ}$`,
          `Formula: $\\text{Arc Length} = \\frac{\\theta}{360} \\times 2 \\times \\pi \\times r$`,
          `$\\text{Arc Length} = \\frac{${theta}}{360} \\times 2 \\times \\pi \\times ${r}$`,
          `$\\text{Arc Length} = ${(theta/360).toFixed(4)} \\times 2 \\times \\pi \\times ${r}$`,
          `$\\text{Arc Length} \\approx ${arcLength.toFixed(4)}$`
        ]
      };
    },
  }
];
