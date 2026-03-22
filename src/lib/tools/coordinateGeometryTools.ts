import { MathTool } from "../mathTools";
import { coordinateGeometrySolver } from "../solvers/coordinateGeometrySolver";

export const coordinateGeometryTools: MathTool[] = [
  {
    id: "distance_2d",
    name: "Distance Between Two Points",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Find the straight-line distance between two points (x₁, y₁) and (x₂, y₂) on a 2D plane. Essential for mapping and spatial analysis.",
    inputs: [
      { id: "x1", label: "x₁", type: "number", placeholder: "0" },
      { id: "y1", label: "y₁", type: "number", placeholder: "0" },
      { id: "x2", label: "x₂", type: "number", placeholder: "3" },
      { id: "y2", label: "y₂", type: "number", placeholder: "4" },
    ],
    calculate: (values) => {
      const x1 = parseFloat(values.x1);
      const y1 = parseFloat(values.y1);
      const x2 = parseFloat(values.x2);
      const y2 = parseFloat(values.y2);
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return { result: "Invalid input" };
      return coordinateGeometrySolver.distance(x1, y1, x2, y2);
    },
  },
  {
    id: "midpoint_2d",
    name: "Midpoint Calculator",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Find the exact center point between (x₁, y₁) and (x₂, y₂). Useful for finding the center of a line segment or balancing points.",
    inputs: [
      { id: "x1", label: "x₁", type: "number", placeholder: "0" },
      { id: "y1", label: "y₁", type: "number", placeholder: "0" },
      { id: "x2", label: "x₂", type: "number", placeholder: "4" },
      { id: "y2", label: "y₂", type: "number", placeholder: "6" },
    ],
    calculate: (values) => {
      const x1 = parseFloat(values.x1);
      const y1 = parseFloat(values.y1);
      const x2 = parseFloat(values.x2);
      const y2 = parseFloat(values.y2);
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return { result: "Invalid input" };
      return coordinateGeometrySolver.midpoint(x1, y1, x2, y2);
    },
  },
  {
    id: "slope_2d",
    name: "Slope of a Line",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Calculate the steepness or incline of a line passing through two points. A fundamental concept in algebra and calculus.",
    inputs: [
      { id: "x1", label: "x₁", type: "number", placeholder: "1" },
      { id: "y1", label: "y₁", type: "number", placeholder: "2" },
      { id: "x2", label: "x₂", type: "number", placeholder: "3" },
      { id: "y2", label: "y₂", type: "number", placeholder: "6" },
    ],
    calculate: (values) => {
      const x1 = parseFloat(values.x1);
      const y1 = parseFloat(values.y1);
      const x2 = parseFloat(values.x2);
      const y2 = parseFloat(values.y2);
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return { result: "Invalid input" };
      return coordinateGeometrySolver.slope(x1, y1, x2, y2);
    },
  },
  {
    id: "line_equation",
    name: "Equation of a Line",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Determine the equation of a line (y = mx + b) passing through two given points. Crucial for modeling linear relationships.",
    inputs: [
      { id: "x1", label: "x₁", type: "number", placeholder: "1" },
      { id: "y1", label: "y₁", type: "number", placeholder: "2" },
      { id: "x2", label: "x₂", type: "number", placeholder: "3" },
      { id: "y2", label: "y₂", type: "number", placeholder: "6" },
    ],
    calculate: (values) => {
      const x1 = parseFloat(values.x1);
      const y1 = parseFloat(values.y1);
      const x2 = parseFloat(values.x2);
      const y2 = parseFloat(values.y2);
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return { result: "Invalid input" };
      return coordinateGeometrySolver.lineEquation(x1, y1, x2, y2);
    },
  },
  {
    id: "distance_3d",
    name: "3D Distance Between Two Points",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Calculate the straight-line distance between two points in three-dimensional space. Essential for 3D modeling and physics.",
    inputs: [
      { id: "x1", label: "x₁", type: "number", placeholder: "0" },
      { id: "y1", label: "y₁", type: "number", placeholder: "0" },
      { id: "z1", label: "z₁", type: "number", placeholder: "0" },
      { id: "x2", label: "x₂", type: "number", placeholder: "3" },
      { id: "y2", label: "y₂", type: "number", placeholder: "4" },
      { id: "z2", label: "z₂", type: "number", placeholder: "12" },
    ],
    calculate: (values) => {
      const x1 = parseFloat(values.x1);
      const y1 = parseFloat(values.y1);
      const z1 = parseFloat(values.z1);
      const x2 = parseFloat(values.x2);
      const y2 = parseFloat(values.y2);
      const z2 = parseFloat(values.z2);
      if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) return { result: "Invalid input" };
      
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dz = z2 - z1;
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
      
      return {
        result: dist.toFixed(4),
        steps: [
          `Find 3D distance between (${x1}, ${y1}, ${z1}) and (${x2}, ${y2}, ${z2})`,
          `Formula: d = √((x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²)`,
          `d = √((${x2} - ${x1})² + (${y2} - ${y1})² + (${z2} - ${z1})²)`,
          `d = √((${dx})² + (${dy})² + (${dz})²)`,
          `d = √(${dx*dx} + ${dy*dy} + ${dz*dz})`,
          `d = √(${dx*dx + dy*dy + dz*dz})`,
          `d ≈ ${dist.toFixed(4)}`
        ]
      };
    },
  },
  {
    id: "midpoint_3d",
    name: "3D Midpoint Calculator",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Find the exact center point between two points in 3D space. Useful in computer graphics and spatial geometry.",
    inputs: [
      { id: "x1", label: "x₁", type: "number", placeholder: "0" },
      { id: "y1", label: "y₁", type: "number", placeholder: "0" },
      { id: "z1", label: "z₁", type: "number", placeholder: "0" },
      { id: "x2", label: "x₂", type: "number", placeholder: "4" },
      { id: "y2", label: "y₂", type: "number", placeholder: "6" },
      { id: "z2", label: "z₂", type: "number", placeholder: "8" },
    ],
    calculate: (values) => {
      const x1 = parseFloat(values.x1);
      const y1 = parseFloat(values.y1);
      const z1 = parseFloat(values.z1);
      const x2 = parseFloat(values.x2);
      const y2 = parseFloat(values.y2);
      const z2 = parseFloat(values.z2);
      if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) return { result: "Invalid input" };
      
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const mz = (z1 + z2) / 2;
      
      return {
        result: `(${mx}, ${my}, ${mz})`,
        steps: [
          `Find 3D midpoint between (${x1}, ${y1}, ${z1}) and (${x2}, ${y2}, ${z2})`,
          `Formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2, (z₁ + z₂)/2)`,
          `M = ((${x1} + ${x2})/2, (${y1} + ${y2})/2, (${z1} + ${z2})/2)`,
          `M = (${x1 + x2}/2, ${y1 + y2}/2, ${z1 + z2}/2)`,
          `M = (${mx}, ${my}, ${mz})`
        ]
      };
    },
  },
  {
    id: "section_formula_2d",
    name: "Section Formula (2D)",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Find the coordinates of a point that divides a line segment into a given ratio m:n. Important for interpolation.",
    inputs: [
      { id: "x1", label: "x₁", type: "number", placeholder: "1" },
      { id: "y1", label: "y₁", type: "number", placeholder: "2" },
      { id: "x2", label: "x₂", type: "number", placeholder: "4" },
      { id: "y2", label: "y₂", type: "number", placeholder: "6" },
      { id: "m", label: "Ratio m", type: "number", placeholder: "1" },
      { id: "n", label: "Ratio n", type: "number", placeholder: "1" },
    ],
    calculate: (values) => {
      const x1 = parseFloat(values.x1);
      const y1 = parseFloat(values.y1);
      const x2 = parseFloat(values.x2);
      const y2 = parseFloat(values.y2);
      const m = parseFloat(values.m);
      const n = parseFloat(values.n);
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(m) || isNaN(n)) return { result: "Invalid input" };
      
      const px = (m * x2 + n * x1) / (m + n);
      const py = (m * y2 + n * y1) / (m + n);
      
      return {
        result: `(${px.toFixed(2)}, ${py.toFixed(2)})`,
        steps: [
          `Find point dividing (${x1}, ${y1}) and (${x2}, ${y2}) in ratio ${m}:${n}`,
          `Formula: P = ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n))`,
          `P_x = (${m}*${x2} + ${n}*${x1}) / (${m} + ${n}) = ${m*x2 + n*x1} / ${m+n} = ${px.toFixed(2)}`,
          `P_y = (${m}*${y2} + ${n}*${y1}) / (${m} + ${n}) = ${m*y2 + n*y1} / ${m+n} = ${py.toFixed(2)}`,
          `P = (${px.toFixed(2)}, ${py.toFixed(2)})`
        ]
      };
    },
  },
  {
    id: "area_triangle_coords",
    name: "Area of Triangle (Coordinates)",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Calculate the area of a triangle using the coordinates of its three vertices. A powerful tool in analytical geometry.",
    inputs: [
      { id: "x1", label: "x₁", type: "number", placeholder: "0" },
      { id: "y1", label: "y₁", type: "number", placeholder: "0" },
      { id: "x2", label: "x₂", type: "number", placeholder: "4" },
      { id: "y2", label: "y₂", type: "number", placeholder: "0" },
      { id: "x3", label: "x₃", type: "number", placeholder: "0" },
      { id: "y3", label: "y₃", type: "number", placeholder: "3" },
    ],
    calculate: (values) => {
      const x1 = parseFloat(values.x1);
      const y1 = parseFloat(values.y1);
      const x2 = parseFloat(values.x2);
      const y2 = parseFloat(values.y2);
      const x3 = parseFloat(values.x3);
      const y3 = parseFloat(values.y3);
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3)) return { result: "Invalid input" };
      
      const area = 0.5 * Math.abs(x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2));
      
      return {
        result: area.toString(),
        steps: [
          `Find area of triangle with vertices (${x1}, ${y1}), (${x2}, ${y2}), (${x3}, ${y3})`,
          `Formula: Area = 0.5 * |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)|`,
          `Area = 0.5 * |${x1}(${y2} - ${y3}) + ${x2}(${y3} - ${y1}) + ${x3}(${y1} - ${y2})|`,
          `Area = 0.5 * |${x1 * (y2 - y3)} + ${x2 * (y3 - y1)} + ${x3 * (y1 - y2)}|`,
          `Area = 0.5 * |${x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)}|`,
          `Area = ${area}`
        ]
      };
    },
  },
  {
    id: "centroid_triangle",
    name: "Centroid of a Triangle",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Find the centroid (center of mass) of a triangle given its vertices. Useful in physics and engineering.",
    inputs: [
      { id: "x1", label: "x₁", type: "number", placeholder: "0" },
      { id: "y1", label: "y₁", type: "number", placeholder: "0" },
      { id: "x2", label: "x₂", type: "number", placeholder: "4" },
      { id: "y2", label: "y₂", type: "number", placeholder: "0" },
      { id: "x3", label: "x₃", type: "number", placeholder: "0" },
      { id: "y3", label: "y₃", type: "number", placeholder: "3" },
    ],
    calculate: (values) => {
      const x1 = parseFloat(values.x1);
      const y1 = parseFloat(values.y1);
      const x2 = parseFloat(values.x2);
      const y2 = parseFloat(values.y2);
      const x3 = parseFloat(values.x3);
      const y3 = parseFloat(values.y3);
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3)) return { result: "Invalid input" };
      
      const cx = (x1 + x2 + x3) / 3;
      const cy = (y1 + y2 + y3) / 3;
      
      return {
        result: `(${cx.toFixed(4)}, ${cy.toFixed(4)})`,
        steps: [
          `Find centroid of triangle with vertices (${x1}, ${y1}), (${x2}, ${y2}), (${x3}, ${y3})`,
          `Formula: Centroid = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)`,
          `x-coordinate = (${x1} + ${x2} + ${x3}) / 3 = ${(x1 + x2 + x3)} / 3 = ${cx.toFixed(4)}`,
          `y-coordinate = (${y1} + ${y2} + ${y3}) / 3 = ${(y1 + y2 + y3)} / 3 = ${cy.toFixed(4)}`,
          `Centroid = (${cx.toFixed(4)}, ${cy.toFixed(4)})`
        ]
      };
    },
  },
  {
    id: "distance_point_line",
    name: "Distance from Point to Line",
    category: "Coordinate Geometry",
    classLevel: "Class 9-10",
    description: "Find the shortest (perpendicular) distance from a point to a line given by Ax + By + C = 0.",
    inputs: [
      { id: "x0", label: "Point x₀", type: "number", placeholder: "1" },
      { id: "y0", label: "Point y₀", type: "number", placeholder: "2" },
      { id: "A", label: "Coefficient A", type: "number", placeholder: "3" },
      { id: "B", label: "Coefficient B", type: "number", placeholder: "4" },
      { id: "C", label: "Constant C", type: "number", placeholder: "-5" },
    ],
    calculate: (values) => {
      const x0 = parseFloat(values.x0);
      const y0 = parseFloat(values.y0);
      const A = parseFloat(values.A);
      const B = parseFloat(values.B);
      const C = parseFloat(values.C);
      if (isNaN(x0) || isNaN(y0) || isNaN(A) || isNaN(B) || isNaN(C)) return { result: "Invalid input" };
      
      const num = Math.abs(A * x0 + B * y0 + C);
      const den = Math.sqrt(A * A + B * B);
      if (den === 0) return { result: "Invalid line equation (A and B cannot both be 0)" };
      
      const dist = num / den;
      
      return {
        result: dist.toFixed(4),
        steps: [
          `Find distance from point (${x0}, ${y0}) to line ${A}x + ${B}y + ${C} = 0`,
          `Formula: d = |Ax₀ + By₀ + C| / √(A² + B²)`,
          `Numerator = |${A}(${x0}) + ${B}(${y0}) + ${C}|`,
          `Numerator = |${A * x0} + ${B * y0} + ${C}| = |${A * x0 + B * y0 + C}| = ${num}`,
          `Denominator = √(${A}² + ${B}²)`,
          `Denominator = √(${A * A} + ${B * B}) = √(${A * A + B * B}) = ${den.toFixed(4)}`,
          `Distance = ${num} / ${den.toFixed(4)} ≈ ${dist.toFixed(4)}`
        ]
      };
    },
  }
];
