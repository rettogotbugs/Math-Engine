import { MathTool } from "../mathTools";
import { trigSolver } from "../solvers/trigSolver";

export const trigTools: MathTool[] = [
  {
    id: "trig_basic",
    name: "Trigonometry Basics",
    category: "Trigonometry",
    classLevel: "Class 9-10",
    description: "Calculate sine, cosine, tangent, and their reciprocals for any angle. Essential for analyzing right triangles and periodic functions.",
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
        defaultValue: "sin"
      },
      { id: "angle", label: "Angle", type: "number", placeholder: "30", defaultValue: "30" },
      {
        id: "unit",
        label: "Unit",
        type: "select",
        options: [
          { label: "Degrees", value: "deg" },
          { label: "Radians", value: "rad" },
        ],
        defaultValue: "deg"
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
    classLevel: "Class 9-10",
    description: "Calculate arcsin, arccos, and arctan to find an angle given a trigonometric ratio. Crucial for solving triangles when sides are known.",
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
        defaultValue: "asin"
      },
      { id: "value", label: "Value", type: "number", placeholder: "0.5", defaultValue: "0.5" },
      {
        id: "unit",
        label: "Output Unit",
        type: "select",
        options: [
          { label: "Degrees", value: "deg" },
          { label: "Radians", value: "rad" },
        ],
        defaultValue: "deg"
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
    classLevel: "Class 9-10",
    description: "Convert angles between degrees and radians. A fundamental utility for moving between everyday geometry and advanced calculus.",
    inputs: [
      { id: "angle", label: "Angle", type: "number", placeholder: "180", defaultValue: "180" },
      {
        id: "fromUnit",
        label: "From",
        type: "select",
        options: [
          { label: "Degrees", value: "deg" },
          { label: "Radians", value: "rad" },
        ],
        defaultValue: "deg"
      },
    ],
    calculate: (values) => {
      const angle = parseFloat(values.angle);
      if (isNaN(angle)) return { result: "Invalid input" };
      
      if (values.fromUnit === "deg") {
        const rad = angle * (Math.PI / 180);
        return {
          result: `$$${rad.toFixed(4)} \\text{ rad}$$`,
          steps: [
            `Convert $${angle}^{\\circ}$ to radians`,
            `Formula: $\\text{radians} = \\text{degrees} \\times \\frac{\\pi}{180}$`,
            `$\\text{radians} = ${angle} \\times \\frac{\\pi}{180}$`,
            `$\\text{radians} \\approx ${rad.toFixed(4)}$`
          ]
        };
      } else {
        const deg = angle * (180 / Math.PI);
        return {
          result: `$$${deg.toFixed(4)}^{\\circ}$$`,
          steps: [
            `Convert $${angle} \\text{ rad}$ to degrees`,
            `Formula: $\\text{degrees} = \\text{radians} \\times \\frac{180}{\\pi}$`,
            `$\\text{degrees} = ${angle} \\times \\frac{180}{\\pi}$`,
            `$\\text{degrees} \\approx ${deg.toFixed(4)}^{\\circ}$`
          ]
        };
      }
    },
  },
  {
    id: "pythagorean_theorem",
    name: "Pythagorean Theorem",
    category: "Trigonometry",
    classLevel: "Class 9-10",
    description: "Find the missing side of a right-angled triangle using a² + b² = c². The cornerstone of distance calculation in flat spaces.",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "3", defaultValue: "3" },
      { id: "b", label: "Side b", type: "number", placeholder: "4", defaultValue: "4" },
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
          `Find hypotenuse $c$ given $a=${a}$, $b=${b}$`,
          `Formula: $c = \\sqrt{a^2 + b^2}$`,
          `$c = \\sqrt{${a}^2 + ${b}^2}$`,
          `$c = \\sqrt{${a*a} + ${b*b}}$`,
          `$c = \\sqrt{${a*a + b*b}}$`,
          `$c \\approx ${res.toFixed(4)}$`
        ];
      } else if (isNaN(a) && !isNaN(b) && !isNaN(c)) {
        if (c <= b) return { result: "Invalid: Hypotenuse must be the longest side." };
        res = Math.sqrt(c*c - b*b);
        steps = [
          `Find side $a$ given $b=${b}$, $c=${c}$`,
          `Formula: $a = \\sqrt{c^2 - b^2}$`,
          `$a = \\sqrt{${c}^2 - ${b}^2}$`,
          `$a = \\sqrt{${c*c} - ${b*b}}$`,
          `$a = \\sqrt{${c*c - b*b}}$`,
          `$a \\approx ${res.toFixed(4)}$`
        ];
      } else if (isNaN(b) && !isNaN(a) && !isNaN(c)) {
        if (c <= a) return { result: "Invalid: Hypotenuse must be the longest side." };
        res = Math.sqrt(c*c - a*a);
        steps = [
          `Find side $b$ given $a=${a}$, $c=${c}$`,
          `Formula: $b = \\sqrt{c^2 - a^2}$`,
          `$b = \\sqrt{${c}^2 - ${a}^2}$`,
          `$b = \\sqrt{${c*c} - ${a*a}}$`,
          `$b = \\sqrt{${c*c - a*a}}$`,
          `$b \\approx ${res.toFixed(4)}$`
        ];
      } else {
        return { result: "Provide exactly two sides." };
      }
      
      return { result: `$$${res.toFixed(4)}$$`, steps };
    },
  },
  {
    id: "law_of_sines",
    name: "Law of Sines",
    category: "Trigonometry",
    classLevel: "Class 9-10",
    description: "Find a missing side or angle in any triangle using the ratio of sides to the sines of their opposite angles.",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "10", defaultValue: "10" },
      { id: "A", label: "Angle A (deg)", type: "number", placeholder: "30", defaultValue: "30" },
      { id: "b", label: "Side b", type: "number", placeholder: "15", defaultValue: "15" },
      { id: "B", label: "Angle B (deg)", type: "number", placeholder: "" },
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
          result: `$$B \\approx ${B_deg.toFixed(2)}^{\\circ}$$`,
          steps: [
            `Formula: $\\sin(B) = \\frac{b \\cdot \\sin(A)}{a}$`,
            `$\\sin(B) = \\frac{${b} \\cdot \\sin(${A}^{\\circ})}{${a}}$`,
            `$\\sin(B) = \\frac{${b} \\cdot ${Math.sin(toRad(A)).toFixed(4)}}{${a}}$`,
            `$\\sin(B) = ${sinB.toFixed(4)}$`,
            `$B = \\arcsin(${sinB.toFixed(4)}) \\approx ${B_deg.toFixed(2)}^{\\circ}$`
          ]
        };
      } else if (isNaN(b) && !isNaN(a) && !isNaN(A) && !isNaN(B)) {
        // Solve for b
        const b_val = (a * Math.sin(toRad(B))) / Math.sin(toRad(A));
        return {
          result: `$$b \\approx ${b_val.toFixed(2)}$$`,
          steps: [
            `Formula: $b = \\frac{a \\cdot \\sin(B)}{\\sin(A)}$`,
            `$b = \\frac{${a} \\cdot \\sin(${B}^{\\circ})}{\\sin(${A}^{\\circ})}$`,
            `$b = \\frac{${a} \\cdot ${Math.sin(toRad(B)).toFixed(4)}}{${Math.sin(toRad(A)).toFixed(4)}}$`,
            `$b \\approx ${b_val.toFixed(2)}$`
          ]
        };
      } else if (isNaN(a) && !isNaN(b) && !isNaN(A) && !isNaN(B)) {
        // Solve for a
        const a_val = (b * Math.sin(toRad(A))) / Math.sin(toRad(B));
        return {
          result: `$$a \\approx ${a_val.toFixed(2)}$$`,
          steps: [
            `Formula: $a = \\frac{b \\cdot \\sin(A)}{\\sin(B)}$`,
            `$a = \\frac{${b} \\cdot \\sin(${A}^{\\circ})}{\\sin(${B}^{\\circ})}$`,
            `$a = \\frac{${b} \\cdot ${Math.sin(toRad(A)).toFixed(4)}}{${Math.sin(toRad(B)).toFixed(4)}}$`,
            `$a \\approx ${a_val.toFixed(2)}$`
          ]
        };
      } else if (isNaN(A) && !isNaN(a) && !isNaN(b) && !isNaN(B)) {
        // Solve for A
        const sinA = (a * Math.sin(toRad(B))) / b;
        if (sinA > 1 || sinA < -1) return { result: "No solution (sin > 1)" };
        const A_rad = Math.asin(sinA);
        const A_deg = toDeg(A_rad);
        return {
          result: `$$A \\approx ${A_deg.toFixed(2)}^{\\circ}$$`,
          steps: [
            `Formula: $\\sin(A) = \\frac{a \\cdot \\sin(B)}{b}$`,
            `$\\sin(A) = \\frac{${a} \\cdot \\sin(${B}^{\\circ})}{${b}}$`,
            `$\\sin(A) = \\frac{${a} \\cdot ${Math.sin(toRad(B)).toFixed(4)}}{${b}}$`,
            `$\\sin(A) = ${sinA.toFixed(4)}$`,
            `$A = \\arcsin(${sinA.toFixed(4)}) \\approx ${A_deg.toFixed(2)}^{\\circ}$`
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
    classLevel: "Class 9-10",
    description: "Find a missing side or angle in any triangle using a generalized form of the Pythagorean theorem.",
    inputs: [
      { id: "a", label: "Side a", type: "number", placeholder: "5", defaultValue: "5" },
      { id: "b", label: "Side b", type: "number", placeholder: "7", defaultValue: "7" },
      { id: "C", label: "Angle C (deg)", type: "number", placeholder: "45", defaultValue: "45" },
      { id: "c", label: "Side c", type: "number", placeholder: "" },
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
          result: `$$c \\approx ${c_val.toFixed(2)}$$`,
          steps: [
            `Formula: $c^2 = a^2 + b^2 - 2ab \\cos(C)$`,
            `$c^2 = ${a}^2 + ${b}^2 - 2(${a})(${b}) \\cos(${C}^{\\circ})$`,
            `$c^2 = ${a*a} + ${b*b} - ${2*a*b} \\times ${Math.cos(toRad(C)).toFixed(4)}$`,
            `$c^2 = ${c2.toFixed(4)}$`,
            `$c = \\sqrt{${c2.toFixed(4)}} \\approx ${c_val.toFixed(2)}$`
          ]
        };
      } else if (isNaN(C) && !isNaN(a) && !isNaN(b) && !isNaN(c)) {
        // Solve for C
        const cosC = (a*a + b*b - c*c) / (2*a*b);
        if (cosC > 1 || cosC < -1) return { result: "No solution (cos > 1 or < -1)" };
        const C_rad = Math.acos(cosC);
        const C_deg = toDeg(C_rad);
        return {
          result: `$$C \\approx ${C_deg.toFixed(2)}^{\\circ}$$`,
          steps: [
            `Formula: $\\cos(C) = \\frac{a^2 + b^2 - c^2}{2ab}$`,
            `$\\cos(C) = \\frac{${a}^2 + ${b}^2 - ${c}^2}{2(${a})(${b})}$`,
            `$\\cos(C) = \\frac{${a*a} + ${b*b} - ${c*c}}{${2*a*b}}$`,
            `$\\cos(C) = ${cosC.toFixed(4)}$`,
            `$C = \\arccos(${cosC.toFixed(4)}) \\approx ${C_deg.toFixed(2)}^{\\circ}$`
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
    classLevel: "Class 9-10",
    description: "Calculate trigonometric values for double angles (2θ). Useful for simplifying complex trigonometric expressions.",
    inputs: [
      { id: "angle", label: "Angle θ (deg)", type: "number", placeholder: "30", defaultValue: "30" },
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
        result: `$$\\sin(2\\theta) \\approx ${sin2.toFixed(4)}, \\cos(2\\theta) \\approx ${cos2.toFixed(4)}, \\tan(2\\theta) \\approx ${tan2.toFixed(4)}$$`,
        steps: [
          `Given $\\theta = ${angle}^{\\circ}$`,
          `$2\\theta = ${2 * angle}^{\\circ}$`,
          `$\\sin(2\\theta) = \\sin(${2 * angle}^{\\circ}) \\approx ${sin2.toFixed(4)}$`,
          `$\\cos(2\\theta) = \\cos(${2 * angle}^{\\circ}) \\approx ${cos2.toFixed(4)}$`,
          `$\\tan(2\\theta) = \\tan(${2 * angle}^{\\circ}) \\approx ${tan2.toFixed(4)}$`
        ]
      };
    },
  },
  {
    id: "half_angle",
    name: "Half Angle Formulas",
    category: "Trigonometry",
    classLevel: "Class 9-10",
    description: "Calculate trigonometric values for half angles (θ/2). Frequently used in integration and solving trigonometric equations.",
    inputs: [
      { id: "angle", label: "Angle θ (deg)", type: "number", placeholder: "60", defaultValue: "60" },
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
        result: `$$\\sin(\\theta/2) \\approx ${sinHalf.toFixed(4)}, \\cos(\\theta/2) \\approx ${cosHalf.toFixed(4)}, \\tan(\\theta/2) \\approx ${tanHalf.toFixed(4)}$$`,
        steps: [
          `Given $\\theta = ${angle}^{\\circ}$`,
          `$\\theta/2 = ${angle / 2}^{\\circ}$`,
          `$\\sin(\\theta/2) = \\sin(${angle / 2}^{\\circ}) \\approx ${sinHalf.toFixed(4)}$`,
          `$\\cos(\\theta/2) = \\cos(${angle / 2}^{\\circ}) \\approx ${cosHalf.toFixed(4)}$`,
          `$\\tan(\\theta/2) = \\tan(${angle / 2}^{\\circ}) \\approx ${tanHalf.toFixed(4)}$`
        ]
      };
    },
  },
  {
    id: "sum_to_product",
    name: "Sum to Product Formulas",
    category: "Trigonometry",
    classLevel: "Class 9-10",
    description: "Convert sums or differences of sines and cosines into products. Essential for solving equations and analyzing wave interference.",
    inputs: [
      { id: "func", label: "Expression", type: "select", options: [
        { label: "sin(A) + sin(B)", value: "sin_plus_sin" },
        { label: "sin(A) - sin(B)", value: "sin_minus_sin" },
        { label: "cos(A) + cos(B)", value: "cos_plus_cos" },
        { label: "cos(A) - cos(B)", value: "cos_minus_cos" },
      ], defaultValue: "sin_plus_sin" },
      { id: "A", label: "Angle A (deg)", type: "number", placeholder: "60", defaultValue: "60" },
      { id: "B", label: "Angle B (deg)", type: "number", placeholder: "30", defaultValue: "30" },
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
        formula = "\\sin(A) + \\sin(B) = 2 \\sin\\left(\\frac{A+B}{2}\\right) \\cos\\left(\\frac{A-B}{2}\\right)";
        applied = `2 \\sin(${sum}^{\\circ}) \\cos(${diff}^{\\circ})`;
        result = `$$2 \\sin(${sum}^{\\circ}) \\cos(${diff}^{\\circ})$$`;
      } else if (values.func === "sin_minus_sin") {
        formula = "\\sin(A) - \\sin(B) = 2 \\cos\\left(\\frac{A+B}{2}\\right) \\sin\\left(\\frac{A-B}{2}\\right)";
        applied = `2 \\cos(${sum}^{\\circ}) \\sin(${diff}^{\\circ})`;
        result = `$$2 \\cos(${sum}^{\\circ}) \\sin(${diff}^{\\circ})$$`;
      } else if (values.func === "cos_plus_cos") {
        formula = "\\cos(A) + \\cos(B) = 2 \\cos\\left(\\frac{A+B}{2}\\right) \\cos\\left(\\frac{A-B}{2}\\right)";
        applied = `2 \\cos(${sum}^{\\circ}) \\cos(${diff}^{\\circ})`;
        result = `$$2 \\cos(${sum}^{\\circ}) \\cos(${diff}^{\\circ})$$`;
      } else if (values.func === "cos_minus_cos") {
        formula = "\\cos(A) - \\cos(B) = -2 \\sin\\left(\\frac{A+B}{2}\\right) \\sin\\left(\\frac{A-B}{2}\\right)";
        applied = `-2 \\sin(${sum}^{\\circ}) \\sin(${diff}^{\\circ})`;
        result = `$$-2 \\sin(${sum}^{\\circ}) \\sin(${diff}^{\\circ})$$`;
      }
      
      return {
        result: result,
        steps: [
          `Given $A = ${A}^{\\circ}$, $B = ${B}^{\\circ}$`,
          `Formula: $${formula}$`,
          `$\\frac{A+B}{2} = \\frac{${A} + ${B}}{2} = ${sum}^{\\circ}$`,
          `$\\frac{A-B}{2} = \\frac{${A} - ${B}}{2} = ${diff}^{\\circ}$`,
          `Result: $${applied}$`
        ]
      };
    },
  }
];
