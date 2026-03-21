import { MathTool } from "../mathTools";
import { trigSolver } from "../solvers/trigSolver";

export const trigTools: MathTool[] = [
  {
    id: "trig_basic",
    name: "Trigonometry Basics",
    category: "Trigonometry",
    description: "Calculate sin, cos, tan of an angle.",
    inputs: [
      {
        id: "func",
        label: "Function",
        type: "select",
        options: [
          { label: "sin", value: "sin" },
          { label: "cos", value: "cos" },
          { label: "tan", value: "tan" },
          { label: "csc", value: "csc" },
          { label: "sec", value: "sec" },
          { label: "cot", value: "cot" },
        ],
      },
      { id: "angle", label: "Angle", type: "number", placeholder: "45" },
      {
        id: "unit",
        label: "Unit",
        type: "select",
        options: [
          { label: "Degrees", value: "deg" },
          { label: "Radians", value: "rad" },
        ],
      },
    ],
    calculate: (values) => {
      const angle = parseFloat(values.angle);
      if (isNaN(angle)) return { result: "Invalid input" };
      return trigSolver.evaluateTrig(
        values.func,
        angle,
        values.unit as "deg" | "rad",
      );
    },
  },
  {
    id: "inverse_trig",
    name: "Inverse Trigonometry",
    category: "Trigonometry",
    description: "Calculate arcsin, arccos, arctan of a value.",
    inputs: [
      {
        id: "func",
        label: "Function",
        type: "select",
        options: [
          { label: "arcsin", value: "asin" },
          { label: "arccos", value: "acos" },
          { label: "arctan", value: "atan" },
        ],
      },
      { id: "value", label: "Value", type: "number", placeholder: "0.5" },
      {
        id: "unit",
        label: "Output Unit",
        type: "select",
        options: [
          { label: "Degrees", value: "deg" },
          { label: "Radians", value: "rad" },
        ],
      },
    ],
    calculate: (values) => {
      const val = parseFloat(values.value);
      if (isNaN(val)) return { result: "Invalid input" };
      return trigSolver.inverseTrig(
        values.func,
        val,
        values.unit as "deg" | "rad",
      );
    },
  },
  {
    id: "angle_conversion",
    name: "Angle Conversion",
    category: "Trigonometry",
    description: "Convert angles between degrees and radians.",
    inputs: [
      { id: "angle", label: "Angle", type: "number", placeholder: "180" },
      {
        id: "fromUnit",
        label: "From",
        type: "select",
        options: [
          { label: "Degrees", value: "deg" },
          { label: "Radians", value: "rad" },
        ],
      },
    ],
    calculate: (values) => {
      const angle = parseFloat(values.angle);
      if (isNaN(angle)) return { result: "Invalid input" };
      
      if (values.fromUnit === "deg") {
        const rad = angle * (Math.PI / 180);
        return {
          result: `${rad.toFixed(4)} rad`,
          steps: [
            `Convert ${angle}° to radians`,
            `Formula: radians = degrees × (π / 180)`,
            `radians = ${angle} × (π / 180)`,
            `radians ≈ ${rad.toFixed(4)}`
          ]
        };
      } else {
        const deg = angle * (180 / Math.PI);
        return {
          result: `${deg.toFixed(4)}°`,
          steps: [
            `Convert ${angle} rad to degrees`,
            `Formula: degrees = radians × (180 / π)`,
            `degrees = ${angle} × (180 / π)`,
            `degrees ≈ ${deg.toFixed(4)}°`
          ]
        };
      }
    },
  },
  {
    id: "pythagorean_theorem",
    name: "Pythagorean Theorem",
    category: "Trigonometry",
    description: "Find the missing side of a right-angled triangle (a² + b² = c²).",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "3" },
      { id: "b", label: "Side b", type: "number", placeholder: "4" },
      { id: "c", label: "Hypotenuse c", type: "number", placeholder: "" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const c = parseFloat(values.c);
      
      let res = 0;
      let steps = [];
      
      if (isNaN(c) && !isNaN(a) && !isNaN(b)) {
        res = Math.sqrt(a*a + b*b);
        steps = [
          `Find hypotenuse c given a=${a}, b=${b}`,
          `Formula: c = √(a² + b²)`,
          `c = √(${a}² + ${b}²)`,
          `c = √(${a*a} + ${b*b})`,
          `c = √(${a*a + b*b})`,
          `c ≈ ${res.toFixed(4)}`
        ];
      } else if (isNaN(a) && !isNaN(b) && !isNaN(c)) {
        if (c <= b) return { result: "Invalid: Hypotenuse must be the longest side." };
        res = Math.sqrt(c*c - b*b);
        steps = [
          `Find side a given b=${b}, c=${c}`,
          `Formula: a = √(c² - b²)`,
          `a = √(${c}² - ${b}²)`,
          `a = √(${c*c} - ${b*b})`,
          `a = √(${c*c - b*b})`,
          `a ≈ ${res.toFixed(4)}`
        ];
      } else if (isNaN(b) && !isNaN(a) && !isNaN(c)) {
        if (c <= a) return { result: "Invalid: Hypotenuse must be the longest side." };
        res = Math.sqrt(c*c - a*a);
        steps = [
          `Find side b given a=${a}, c=${c}`,
          `Formula: b = √(c² - a²)`,
          `b = √(${c}² - ${a}²)`,
          `b = √(${c*c} - ${a*a})`,
          `b = √(${c*c - a*a})`,
          `b ≈ ${res.toFixed(4)}`
        ];
      } else {
        return { result: "Provide exactly two sides." };
      }
      
      return { result: res.toFixed(4), steps };
    },
  },
  {
    id: "law_of_sines",
    name: "Law of Sines",
    category: "Trigonometry",
    description: "Find a missing side or angle using a/sin(A) = b/sin(B).",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "e.g., 5" },
      { id: "A", label: "Angle A (deg)", type: "number", placeholder: "e.g., 30" },
      { id: "b", label: "Side b", type: "number", placeholder: "e.g., 7" },
      { id: "B", label: "Angle B (deg)", type: "number", placeholder: "Leave empty to solve" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const A = parseFloat(values.A);
      const b = parseFloat(values.b);
      const B = parseFloat(values.B);
      
      const toRad = (deg: number) => deg * Math.PI / 180;
      const toDeg = (rad: number) => rad * 180 / Math.PI;
      
      if (isNaN(B) && !isNaN(a) && !isNaN(A) && !isNaN(b)) {
        // Solve for B
        const sinB = (b * Math.sin(toRad(A))) / a;
        if (sinB > 1 || sinB < -1) return { result: "No solution (sin > 1)" };
        const B_rad = Math.asin(sinB);
        const B_deg = toDeg(B_rad);
        return {
          result: `B ≈ ${B_deg.toFixed(2)}°`,
          steps: [
            `Formula: sin(B) = (b * sin(A)) / a`,
            `sin(B) = (${b} * sin(${A}°)) / ${a}`,
            `sin(B) = (${b} * ${Math.sin(toRad(A)).toFixed(4)}) / ${a}`,
            `sin(B) = ${sinB.toFixed(4)}`,
            `B = arcsin(${sinB.toFixed(4)}) ≈ ${B_deg.toFixed(2)}°`
          ]
        };
      } else if (isNaN(b) && !isNaN(a) && !isNaN(A) && !isNaN(B)) {
        // Solve for b
        const b_val = (a * Math.sin(toRad(B))) / Math.sin(toRad(A));
        return {
          result: `b ≈ ${b_val.toFixed(2)}`,
          steps: [
            `Formula: b = (a * sin(B)) / sin(A)`,
            `b = (${a} * sin(${B}°)) / sin(${A}°)`,
            `b = (${a} * ${Math.sin(toRad(B)).toFixed(4)}) / ${Math.sin(toRad(A)).toFixed(4)}`,
            `b ≈ ${b_val.toFixed(2)}`
          ]
        };
      } else if (isNaN(a) && !isNaN(b) && !isNaN(A) && !isNaN(B)) {
        // Solve for a
        const a_val = (b * Math.sin(toRad(A))) / Math.sin(toRad(B));
        return {
          result: `a ≈ ${a_val.toFixed(2)}`,
          steps: [
            `Formula: a = (b * sin(A)) / sin(B)`,
            `a = (${b} * sin(${A}°)) / sin(${B}°)`,
            `a = (${b} * ${Math.sin(toRad(A)).toFixed(4)}) / ${Math.sin(toRad(B)).toFixed(4)}`,
            `a ≈ ${a_val.toFixed(2)}`
          ]
        };
      } else if (isNaN(A) && !isNaN(a) && !isNaN(b) && !isNaN(B)) {
        // Solve for A
        const sinA = (a * Math.sin(toRad(B))) / b;
        if (sinA > 1 || sinA < -1) return { result: "No solution (sin > 1)" };
        const A_rad = Math.asin(sinA);
        const A_deg = toDeg(A_rad);
        return {
          result: `A ≈ ${A_deg.toFixed(2)}°`,
          steps: [
            `Formula: sin(A) = (a * sin(B)) / b`,
            `sin(A) = (${a} * sin(${B}°)) / ${b}`,
            `sin(A) = (${a} * ${Math.sin(toRad(B)).toFixed(4)}) / ${b}`,
            `sin(A) = ${sinA.toFixed(4)}`,
            `A = arcsin(${sinA.toFixed(4)}) ≈ ${A_deg.toFixed(2)}°`
          ]
        };
      }
      return { result: "Leave exactly one field empty to solve." };
    },
  },
  {
    id: "law_of_cosines",
    name: "Law of Cosines",
    category: "Trigonometry",
    description: "Find a missing side or angle using c² = a² + b² - 2ab*cos(C).",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "e.g., 5" },
      { id: "b", label: "Side b", type: "number", placeholder: "e.g., 7" },
      { id: "C", label: "Angle C (deg)", type: "number", placeholder: "e.g., 45" },
      { id: "c", label: "Side c", type: "number", placeholder: "Leave empty to solve" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const C = parseFloat(values.C);
      const c = parseFloat(values.c);
      
      const toRad = (deg: number) => deg * Math.PI / 180;
      const toDeg = (rad: number) => rad * 180 / Math.PI;
      
      if (isNaN(c) && !isNaN(a) && !isNaN(b) && !isNaN(C)) {
        // Solve for c
        const c2 = a*a + b*b - 2*a*b*Math.cos(toRad(C));
        const c_val = Math.sqrt(c2);
        return {
          result: `c ≈ ${c_val.toFixed(2)}`,
          steps: [
            `Formula: c² = a² + b² - 2ab*cos(C)`,
            `c² = ${a}² + ${b}² - 2(${a})(${b})*cos(${C}°)`,
            `c² = ${a*a} + ${b*b} - ${2*a*b}*${Math.cos(toRad(C)).toFixed(4)}`,
            `c² = ${c2.toFixed(4)}`,
            `c = √${c2.toFixed(4)} ≈ ${c_val.toFixed(2)}`
          ]
        };
      } else if (isNaN(C) && !isNaN(a) && !isNaN(b) && !isNaN(c)) {
        // Solve for C
        const cosC = (a*a + b*b - c*c) / (2*a*b);
        if (cosC > 1 || cosC < -1) return { result: "No solution (cos > 1 or < -1)" };
        const C_rad = Math.acos(cosC);
        const C_deg = toDeg(C_rad);
        return {
          result: `C ≈ ${C_deg.toFixed(2)}°`,
          steps: [
            `Formula: cos(C) = (a² + b² - c²) / (2ab)`,
            `cos(C) = (${a}² + ${b}² - ${c}²) / (2*${a}*${b})`,
            `cos(C) = (${a*a} + ${b*b} - ${c*c}) / ${2*a*b}`,
            `cos(C) = ${cosC.toFixed(4)}`,
            `C = arccos(${cosC.toFixed(4)}) ≈ ${C_deg.toFixed(2)}°`
          ]
        };
      }
      return { result: "Leave either 'Side c' or 'Angle C' empty to solve." };
    },
  },
  {
    id: "double_angle",
    name: "Double Angle Formulas",
    category: "Trigonometry",
    description: "Calculate sin(2θ), cos(2θ), tan(2θ) given θ.",
    inputs: [
      { id: "angle", label: "Angle θ (deg)", type: "number", placeholder: "e.g., 30" },
    ],
    calculate: (values) => {
      const angle = parseFloat(values.angle);
      if (isNaN(angle)) return { result: "Invalid input" };
      
      const toRad = (deg: number) => deg * Math.PI / 180;
      const rad = toRad(angle);
      
      const sin2 = Math.sin(2 * rad);
      const cos2 = Math.cos(2 * rad);
      const tan2 = Math.tan(2 * rad);
      
      return {
        result: `sin(2θ) ≈ ${sin2.toFixed(4)}, cos(2θ) ≈ ${cos2.toFixed(4)}, tan(2θ) ≈ ${tan2.toFixed(4)}`,
        steps: [
          `Given θ = ${angle}°`,
          `2θ = ${2 * angle}°`,
          `sin(2θ) = sin(${2 * angle}°) ≈ ${sin2.toFixed(4)}`,
          `cos(2θ) = cos(${2 * angle}°) ≈ ${cos2.toFixed(4)}`,
          `tan(2θ) = tan(${2 * angle}°) ≈ ${tan2.toFixed(4)}`
        ]
      };
    },
  },
  {
    id: "half_angle",
    name: "Half Angle Formulas",
    category: "Trigonometry",
    description: "Calculate sin(θ/2), cos(θ/2), tan(θ/2) given θ.",
    inputs: [
      { id: "angle", label: "Angle θ (deg)", type: "number", placeholder: "e.g., 60" },
    ],
    calculate: (values) => {
      const angle = parseFloat(values.angle);
      if (isNaN(angle)) return { result: "Invalid input" };
      
      const toRad = (deg: number) => deg * Math.PI / 180;
      const rad = toRad(angle);
      
      const sinHalf = Math.sin(rad / 2);
      const cosHalf = Math.cos(rad / 2);
      const tanHalf = Math.tan(rad / 2);
      
      return {
        result: `sin(θ/2) ≈ ${sinHalf.toFixed(4)}, cos(θ/2) ≈ ${cosHalf.toFixed(4)}, tan(θ/2) ≈ ${tanHalf.toFixed(4)}`,
        steps: [
          `Given θ = ${angle}°`,
          `θ/2 = ${angle / 2}°`,
          `sin(θ/2) = sin(${angle / 2}°) ≈ ${sinHalf.toFixed(4)}`,
          `cos(θ/2) = cos(${angle / 2}°) ≈ ${cosHalf.toFixed(4)}`,
          `tan(θ/2) = tan(${angle / 2}°) ≈ ${tanHalf.toFixed(4)}`
        ]
      };
    },
  },
  {
    id: "sum_to_product",
    name: "Sum to Product Formulas",
    category: "Trigonometry",
    description: "Convert sin(A) ± sin(B) or cos(A) ± cos(B) to products.",
    inputs: [
      { id: "func", label: "Expression", type: "select", options: [
        { label: "sin(A) + sin(B)", value: "sin_plus_sin" },
        { label: "sin(A) - sin(B)", value: "sin_minus_sin" },
        { label: "cos(A) + cos(B)", value: "cos_plus_cos" },
        { label: "cos(A) - cos(B)", value: "cos_minus_cos" },
      ]},
      { id: "A", label: "Angle A (deg)", type: "number", placeholder: "e.g., 60" },
      { id: "B", label: "Angle B (deg)", type: "number", placeholder: "e.g., 30" },
    ],
    calculate: (values) => {
      const A = parseFloat(values.A);
      const B = parseFloat(values.B);
      if (isNaN(A) || isNaN(B)) return { result: "Invalid input" };
      
      const sum = (A + B) / 2;
      const diff = (A - B) / 2;
      
      let result = "";
      let formula = "";
      let applied = "";
      
      if (values.func === "sin_plus_sin") {
        formula = "sin(A) + sin(B) = 2 * sin((A+B)/2) * cos((A-B)/2)";
        applied = `2 * sin(${sum}°) * cos(${diff}°)`;
        result = `2 * sin(${sum}°) * cos(${diff}°)`;
      } else if (values.func === "sin_minus_sin") {
        formula = "sin(A) - sin(B) = 2 * cos((A+B)/2) * sin((A-B)/2)";
        applied = `2 * cos(${sum}°) * sin(${diff}°)`;
        result = `2 * cos(${sum}°) * sin(${diff}°)`;
      } else if (values.func === "cos_plus_cos") {
        formula = "cos(A) + cos(B) = 2 * cos((A+B)/2) * cos((A-B)/2)";
        applied = `2 * cos(${sum}°) * cos(${diff}°)`;
        result = `2 * cos(${sum}°) * cos(${diff}°)`;
      } else if (values.func === "cos_minus_cos") {
        formula = "cos(A) - cos(B) = -2 * sin((A+B)/2) * sin((A-B)/2)";
        applied = `-2 * sin(${sum}°) * sin(${diff}°)`;
        result = `-2 * sin(${sum}°) * sin(${diff}°)`;
      }
      
      return {
        result: result,
        steps: [
          `Given A = ${A}°, B = ${B}°`,
          `Formula: ${formula}`,
          `(A+B)/2 = (${A} + ${B}) / 2 = ${sum}°`,
          `(A-B)/2 = (${A} - ${B}) / 2 = ${diff}°`,
          `Result: ${applied}`
        ]
      };
    },
  }
];
