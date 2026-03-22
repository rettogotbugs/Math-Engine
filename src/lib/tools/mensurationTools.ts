import { MathTool } from "../mathTools";
import { geometrySolver } from "../solvers/geometrySolver";
import { mensurationSolver } from "../solvers/mensurationSolver";

export const mensurationTools: MathTool[] = [
  {
    id: "volume_cube",
    name: "Volume of a Cube",
    category: "Mensuration",
    description: "Calculate the volume of a cube given its side length. Essential for determining the capacity of cubic containers.",
    inputs: [
      { id: "side", label: "Side (a)", type: "number", placeholder: "4" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.side);
      if (isNaN(a)) return { result: "Invalid input" };
      return geometrySolver.volumeCube(a);
    },
  },
  {
    id: "surface_area_cube",
    name: "Surface Area of a Cube",
    category: "Mensuration",
    description: "Calculate the total surface area of a cube. Useful for finding the amount of material needed to cover or build a cubic object.",
    inputs: [
      { id: "side", label: "Side (a)", type: "number", placeholder: "4" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.side);
      if (isNaN(a)) return { result: "Invalid input" };
      return mensurationSolver.surfaceAreaCube(a);
    },
  },
  {
    id: "volume_cylinder",
    name: "Volume of a Cylinder",
    category: "Mensuration",
    description: "Calculate the volume of a cylinder given its radius and height. Perfect for finding the capacity of pipes, tanks, and cans.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "3" },
      { id: "height", label: "Height (h)", type: "number", placeholder: "10" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      const h = parseFloat(values.height);
      if (isNaN(r) || isNaN(h)) return { result: "Invalid input" };
      return geometrySolver.volumeCylinder(r, h);
    },
  },
  {
    id: "surface_area_cylinder",
    name: "Surface Area of a Cylinder",
    category: "Mensuration",
    description: "Calculate the total surface area of a cylinder, including both circular bases and the curved side.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "3" },
      { id: "height", label: "Height (h)", type: "number", placeholder: "10" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      const h = parseFloat(values.height);
      if (isNaN(r) || isNaN(h)) return { result: "Invalid input" };
      return mensurationSolver.surfaceAreaCylinder(r, h);
    },
  },
  {
    id: "volume_sphere",
    name: "Volume of a Sphere",
    category: "Mensuration",
    description: "Calculate the volume of a sphere given its radius. Useful in physics and for determining the capacity of spherical objects.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      if (isNaN(r)) return { result: "Invalid input" };
      return geometrySolver.volumeSphere(r);
    },
  },
  {
    id: "surface_area_sphere",
    name: "Surface Area of a Sphere",
    category: "Mensuration",
    description: "Calculate the total surface area of a sphere. Important for determining the material needed to cover round objects like balls or planets.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      if (isNaN(r)) return { result: "Invalid input" };
      return mensurationSolver.surfaceAreaSphere(r);
    },
  },
  {
    id: "volume_cone",
    name: "Volume of a Cone",
    category: "Mensuration",
    description: "Calculate the volume of a cone given its base radius and height. Useful for funnels, traffic cones, and architectural structures.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "3" },
      { id: "height", label: "Height (h)", type: "number", placeholder: "10" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      const h = parseFloat(values.height);
      if (isNaN(r) || isNaN(h)) return { result: "Invalid input" };
      return mensurationSolver.volumeCone(r, h);
    },
  },
  {
    id: "surface_area_cone",
    name: "Surface Area of a Cone",
    category: "Mensuration",
    description: "Calculate the total surface area of a cone, including the circular base and the lateral (curved) surface.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "3" },
      { id: "height", label: "Height (h)", type: "number", placeholder: "10" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      const h = parseFloat(values.height);
      if (isNaN(r) || isNaN(h)) return { result: "Invalid input" };
      return mensurationSolver.surfaceAreaCone(r, h);
    },
  },
  {
    id: "volume_hemisphere",
    name: "Volume of a Hemisphere",
    category: "Mensuration",
    description: "Calculate the volume of a hemisphere (half of a sphere). Useful for bowls, domes, and similar structures.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      if (isNaN(r)) return { result: "Invalid input" };
      return mensurationSolver.volumeHemisphere(r);
    },
  },
  {
    id: "surface_area_hemisphere",
    name: "Surface Area of a Hemisphere",
    category: "Mensuration",
    description: "Calculate the total surface area of a solid hemisphere, including the curved surface and the flat circular base.",
    inputs: [
      { id: "radius", label: "Radius (r)", type: "number", placeholder: "5" },
    ],
    calculate: (values) => {
      const r = parseFloat(values.radius);
      if (isNaN(r)) return { result: "Invalid input" };
      return mensurationSolver.surfaceAreaHemisphere(r);
    },
  },
  {
    id: "volume_cuboid",
    name: "Volume of a Cuboid",
    category: "Mensuration",
    description: "Calculate the volume of a cuboid (rectangular prism). Essential for finding the capacity of boxes, rooms, and rectangular tanks.",
    inputs: [
      { id: "l", label: "Length (l)", type: "number", placeholder: "5" },
      { id: "w", label: "Width (w)", type: "number", placeholder: "4" },
      { id: "h", label: "Height (h)", type: "number", placeholder: "3" },
    ],
    calculate: (values) => {
      const l = parseFloat(values.l);
      const w = parseFloat(values.w);
      const h = parseFloat(values.h);
      if (isNaN(l) || isNaN(w) || isNaN(h)) return { result: "Invalid input" };
      const v = l * w * h;
      return {
        result: v.toString(),
        steps: [
          `Find volume of cuboid with length l=${l}, width w=${w}, height h=${h}`,
          `Formula: Volume = l * w * h`,
          `Volume = ${l} * ${w} * ${h}`,
          `Volume = ${v}`
        ]
      };
    },
  },
  {
    id: "surface_area_cuboid",
    name: "Surface Area of a Cuboid",
    category: "Mensuration",
    description: "Calculate the total surface area of a cuboid. Useful for determining the amount of wrapping paper, paint, or material needed.",
    inputs: [
      { id: "l", label: "Length (l)", type: "number", placeholder: "5" },
      { id: "w", label: "Width (w)", type: "number", placeholder: "4" },
      { id: "h", label: "Height (h)", type: "number", placeholder: "3" },
    ],
    calculate: (values) => {
      const l = parseFloat(values.l);
      const w = parseFloat(values.w);
      const h = parseFloat(values.h);
      if (isNaN(l) || isNaN(w) || isNaN(h)) return { result: "Invalid input" };
      const sa = 2 * (l * w + w * h + h * l);
      return {
        result: sa.toString(),
        steps: [
          `Find surface area of cuboid with length l=${l}, width w=${w}, height h=${h}`,
          `Formula: Surface Area = 2(lw + wh + hl)`,
          `Surface Area = 2(${l}*${w} + ${w}*${h} + ${h}*${l})`,
          `Surface Area = 2(${l*w} + ${w*h} + ${h*l})`,
          `Surface Area = 2(${l*w + w*h + h*l})`,
          `Surface Area = ${sa}`
        ]
      };
    },
  },
  {
    id: "volume_pyramid",
    name: "Volume of a Square Pyramid",
    category: "Mensuration",
    description: "Calculate the volume of a square-based pyramid. Useful in architecture and geometry problems involving pyramidal structures.",
    inputs: [
      { id: "b", label: "Base edge (b)", type: "number", placeholder: "e.g., 5" },
      { id: "h", label: "Height (h)", type: "number", placeholder: "e.g., 6" },
    ],
    calculate: (values) => {
      const b = parseFloat(values.b);
      const h = parseFloat(values.h);
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) return { result: "Invalid input" };
      
      const vol = (1/3) * b * b * h;
      return {
        result: vol.toFixed(4),
        steps: [
          `Find the volume of a square pyramid with base edge b=${b} and height h=${h}`,
          `Formula: Volume = (1/3) * b² * h`,
          `Volume = (1/3) * ${b}² * ${h}`,
          `Volume = (1/3) * ${b*b} * ${h}`,
          `Volume = ${(b*b*h)/3}`,
          `Volume ≈ ${vol.toFixed(4)}`
        ]
      };
    },
  },
  {
    id: "surface_area_pyramid",
    name: "Surface Area of a Square Pyramid",
    category: "Mensuration",
    description: "Calculate the total surface area of a square-based pyramid, including the square base and four triangular faces.",
    inputs: [
      { id: "b", label: "Base edge (b)", type: "number", placeholder: "e.g., 5" },
      { id: "h", label: "Height (h)", type: "number", placeholder: "e.g., 6" },
    ],
    calculate: (values) => {
      const b = parseFloat(values.b);
      const h = parseFloat(values.h);
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) return { result: "Invalid input" };
      
      // Slant height l = sqrt(h^2 + (b/2)^2)
      const slantHeight = Math.sqrt(h*h + (b/2)*(b/2));
      const baseArea = b * b;
      const lateralArea = 2 * b * slantHeight;
      const totalArea = baseArea + lateralArea;
      
      return {
        result: totalArea.toFixed(4),
        steps: [
          `Find the surface area of a square pyramid with base edge b=${b} and height h=${h}`,
          `Step 1: Find the slant height (l)`,
          `l = √(h² + (b/2)²)`,
          `l = √(${h}² + (${b}/2)²)`,
          `l = √(${h*h} + ${b/2 * b/2})`,
          `l ≈ ${slantHeight.toFixed(4)}`,
          `Step 2: Calculate Base Area`,
          `Base Area = b² = ${b}² = ${baseArea}`,
          `Step 3: Calculate Lateral Area`,
          `Lateral Area = 2 * b * l = 2 * ${b} * ${slantHeight.toFixed(4)} ≈ ${lateralArea.toFixed(4)}`,
          `Step 4: Calculate Total Surface Area`,
          `Total Area = Base Area + Lateral Area`,
          `Total Area = ${baseArea} + ${lateralArea.toFixed(4)}`,
          `Total Area ≈ ${totalArea.toFixed(4)}`
        ]
      };
    },
  }
];
