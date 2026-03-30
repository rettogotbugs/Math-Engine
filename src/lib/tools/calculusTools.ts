import { MathTool } from "../mathTools";
import { calculusSolver } from "../solvers/calculusSolver";

export const calculusTools: MathTool[] = [
  {
    id: "derivative",
    name: "Derivative Calculator",
    category: "Calculus",
    classLevel: "Class 11-12",
    description: "Find the derivative of a function f(x) to determine its rate of change. Essential for finding slopes, velocities, and optimizing functions.",
    inputs: [
      {
        id: "expr",
        label: "Function f(x)",
        type: "text",
        placeholder: "x^3 - 4x^2 + 2x - 5",
        defaultValue: "x^3 - 4x^2 + 2x - 5"
      },
    ],
    calculate: (values) => calculusSolver.differentiate(values.expr, "x"),
  },
  {
    id: "integral_num",
    name: "Definite Integral",
    category: "Calculus",
    classLevel: "Class 11-12",
    description: "Calculate the definite integral of a function over a specific interval. Useful for finding the area under a curve, total distance, or accumulated growth.",
    inputs: [
      {
        id: "expr",
        label: "Function f(x)",
        type: "text",
        placeholder: "3x^2 + 2x",
        defaultValue: "3x^2 + 2x"
      },
      { id: "a", label: "Lower bound (a)", type: "number", placeholder: "1", defaultValue: "1" },
      { id: "b", label: "Upper bound (b)", type: "number", placeholder: "4", defaultValue: "4" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid bounds" };
      return calculusSolver.integrateNumerical(values.expr, "x", a, b);
    },
  },
  {
    id: "limit_eval",
    name: "Limit Evaluator",
    category: "Calculus",
    classLevel: "Class 11-12",
    description: "Evaluate the limit of a function as x approaches a specific value. Crucial for understanding function behavior near undefined points and asymptotes.",
    inputs: [
      {
        id: "expr",
        label: "Function f(x)",
        type: "text",
        placeholder: "(x^2 - 9)/(x - 3)",
        defaultValue: "(x^2 - 9)/(x - 3)"
      },
      { id: "val", label: "Approaches (a)", type: "number", placeholder: "3", defaultValue: "3" },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const a = parseFloat(values.val);
        const expr = math.parse(values.expr);
        
        // Try direct substitution
        try {
          const direct = expr.evaluate({ x: a });
          if (isFinite(direct) && !isNaN(direct)) {
            return {
              result: `$${direct}$`,
              steps: [
                `Evaluate limit of $${expr.toTex()}$ as $x \\to ${a}$`,
                `Direct substitution: $f(${a}) = ${direct}$`,
                `$\\text{Limit} = ${direct}$`
              ]
            };
          }
        } catch (e) {}

        // If direct substitution fails (e.g. 0/0), use L'Hopital's approximation or numerical approach
        const delta = 0.000001;
        const left = expr.evaluate({ x: a - delta });
        const right = expr.evaluate({ x: a + delta });
        
        if (Math.abs(left - right) < 0.01) {
          const approx = ((left + right) / 2).toFixed(4);
          return {
            result: `$\\approx ${approx}$`,
            steps: [
              `Evaluate limit of $${expr.toTex()}$ as $x \\to ${a}$`,
              `Direct substitution results in an indeterminate form.`,
              `Approaching from left ($x = ${a - delta}$): $f(x) \\approx ${left.toFixed(4)}$`,
              `Approaching from right ($x = ${a + delta}$): $f(x) \\approx ${right.toFixed(4)}$`,
              `$\\text{Limit} \\approx ${approx}$`
            ]
          };
        } else {
          return {
            result: "Limit may not exist",
            steps: [
              `Evaluate limit of $${expr.toTex()}$ as $x \\to ${a}$`,
              `Approaching from left ($x = ${a - delta}$): $f(x) \\approx ${left.toFixed(4)}$`,
              `Approaching from right ($x = ${a + delta}$): $f(x) \\approx ${right.toFixed(4)}$`,
              `Left and right limits do not match. Limit may not exist.`
            ]
          };
        }
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not evaluate limit."] };
      }
    },
  },
  {
    id: "second_derivative",
    name: "Second Derivative Calculator",
    category: "Calculus",
    classLevel: "Class 11-12",
    description: "Find the second derivative of a function. Vital for determining concavity, inflection points, and acceleration in physics.",
    inputs: [
      {
        id: "expr",
        label: "Function f(x)",
        type: "text",
        placeholder: "x^4 - 6x^3 + 12x^2 - 8x + 3",
        defaultValue: "x^4 - 6x^3 + 12x^2 - 8x + 3"
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const firstDeriv = math.derivative(values.expr, "x");
        const secondDeriv = math.derivative(firstDeriv, "x");
        return {
          result: `$$f''(x) = ${secondDeriv.toTex()}$$`,
          steps: [
            `Find the second derivative of $f(x) = ${math.parse(values.expr).toTex()}$`,
            `Step 1: Find the first derivative $f'(x)$`,
            `$$f'(x) = \\frac{d}{dx} \\left(${math.parse(values.expr).toTex()}\\right) = ${firstDeriv.toTex()}$$`,
            `Step 2: Find the derivative of $f'(x)$`,
            `$$f''(x) = \\frac{d}{dx} \\left(${firstDeriv.toTex()}\\right) = ${secondDeriv.toTex()}$$`,
            `Result: $$f''(x) = ${secondDeriv.toTex()}$$`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not calculate second derivative."] };
      }
    },
  },
  {
    id: "partial_derivative",
    name: "Partial Derivative Calculator",
    category: "Calculus",
    classLevel: "Class 11-12",
    description: "Find the partial derivative of a multivariable function. Essential for multivariable calculus, thermodynamics, and machine learning.",
    inputs: [
      {
        id: "expr",
        label: "Function f(x, y, ...)",
        type: "text",
        placeholder: "x^2 * y^3 + sin(x*y)",
        defaultValue: "x^2 * y^3 + sin(x*y)"
      },
      {
        id: "var",
        label: "Variable to differentiate with respect to",
        type: "text",
        placeholder: "x",
        defaultValue: "x"
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const variable = values.var.trim() || "x";
        const deriv = math.derivative(values.expr, variable);
        return {
          result: `$$\\frac{\\partial f}{\\partial ${variable}} = ${deriv.toTex()}$$`,
          steps: [
            `Find the partial derivative of $f = ${math.parse(values.expr).toTex()}$ with respect to $${variable}$`,
            `Treat all other variables as constants.`,
            `$$\\frac{\\partial f}{\\partial ${variable}} = ${deriv.toTex()}$$`,
            `Result: $$${deriv.toTex()}$$`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not calculate partial derivative."] };
      }
    },
  },
  {
    id: "limit_infinity",
    name: "Limit at Infinity",
    category: "Calculus",
    classLevel: "Class 11-12",
    description: "Evaluate the limit of a function as x approaches positive or negative infinity. Helps in finding horizontal asymptotes and end behavior.",
    inputs: [
      {
        id: "expr",
        label: "Function f(x)",
        type: "text",
        placeholder: "(3x^2 - 5x + 2)/(7x^2 + 4x - 1)",
        defaultValue: "(3x^2 - 5x + 2)/(7x^2 + 4x - 1)"
      },
      {
        id: "sign",
        label: "Direction (+ or -)",
        type: "select",
        options: [
          { value: "+", label: "+∞ (Positive Infinity)" },
          { value: "-", label: "-∞ (Negative Infinity)" },
        ],
        defaultValue: "+",
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const expr = math.parse(values.expr);
        const sign = values.sign === "-" ? -1 : 1;
        
        // Evaluate at increasingly large numbers
        const val1 = expr.evaluate({ x: sign * 10000 });
        const val2 = expr.evaluate({ x: sign * 100000 });
        const val3 = expr.evaluate({ x: sign * 1000000 });
        
        let resultStr = "";
        let steps = [
          `Evaluate limit of $${expr.toTex()}$ as $x \\to ${sign > 0 ? '+' : '-'}\\infty$`,
          `We approximate by substituting very large values for x:`
        ];
        
        if (Math.abs(val3 - val2) < 0.001) {
          resultStr = `$$${val3.toFixed(4)}$$`;
          steps.push(`$f(${sign * 10000}) \\approx ${val1.toFixed(4)}$`);
          steps.push(`$f(${sign * 100000}) \\approx ${val2.toFixed(4)}$`);
          steps.push(`$f(${sign * 1000000}) \\approx ${val3.toFixed(4)}$`);
          steps.push(`The values are converging to $${val3.toFixed(4)}$.`);
          steps.push(`Limit $\\approx ${val3.toFixed(4)}$`);
        } else if (Math.abs(val3) > 100000) {
          resultStr = sign > 0 ? "$$+\\infty$$" : "$$-\\infty$$";
          steps.push(`$f(${sign * 10000}) \\approx ${val1.toExponential(2)}$`);
          steps.push(`$f(${sign * 100000}) \\approx ${val2.toExponential(2)}$`);
          steps.push(`$f(${sign * 1000000}) \\approx ${val3.toExponential(2)}$`);
          steps.push(`The values are growing without bound.`);
          steps.push(`Limit = ${resultStr}`);
        } else {
          resultStr = "Does not converge";
          steps.push(`$f(${sign * 10000}) \\approx ${val1}$`);
          steps.push(`$f(${sign * 100000}) \\approx ${val2}$`);
          steps.push(`$f(${sign * 1000000}) \\approx ${val3}$`);
          steps.push(`The values do not appear to converge or diverge to infinity.`);
        }
        
        return {
          result: resultStr,
          steps: steps
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not evaluate limit at infinity."] };
      }
    },
  },
  {
    id: "tangent_line",
    name: "Tangent Line Equation",
    category: "Calculus",
    classLevel: "Class 11-12",
    description: "Find the equation of the tangent line to a curve at a given point. Useful for linear approximations of complex functions.",
    inputs: [
      {
        id: "expr",
        label: "Function f(x)",
        type: "text",
        placeholder: "x^3 - 2x + 4",
        defaultValue: "x^3 - 2x + 4"
      },
      {
        id: "x_val",
        label: "At x =",
        type: "number",
        placeholder: "2",
        defaultValue: "2"
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const x0 = parseFloat(values.x_val);
        if (isNaN(x0)) return { result: "Invalid x value" };
        
        const expr = math.parse(values.expr);
        const y0 = expr.evaluate({ x: x0 });
        
        const deriv = math.derivative(values.expr, "x");
        const m = deriv.evaluate({ x: x0 });
        
        // y - y0 = m(x - x0)
        // y = mx - mx0 + y0
        const b = y0 - m * x0;
        
        let eq = `y = ${m}x`;
        if (b > 0) eq += ` + ${b}`;
        else if (b < 0) eq += ` - ${Math.abs(b)}`;
        
        return {
          result: `$$${eq}$$`,
          steps: [
            `Find the tangent line to $f(x) = ${expr.toTex()}$ at $x = ${x0}$`,
            `Step 1: Find the y-coordinate at $x = ${x0}$`,
            `$f(${x0}) = ${y0}$`,
            `Point: $(${x0}, ${y0})$`,
            `Step 2: Find the derivative $f'(x)$`,
            `$f'(x) = ${deriv.toTex()}$`,
            `Step 3: Evaluate the derivative at $x = ${x0}$ to find the slope ($m$)`,
            `$m = f'(${x0}) = ${m}$`,
            `Step 4: Use the point-slope form: $y - y_1 = m(x - x_1)$`,
            `$y - ${y0} = ${m}(x - ${x0})$`,
            `$y = ${m}x - ${m * x0} + ${y0}$`,
            `$y = ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}$`,
            `Result: $$${eq}$$`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not calculate tangent line."] };
      }
    },
  },
  {
    id: "area_between_curves",
    name: "Area Between Curves",
    category: "Calculus",
    classLevel: "Class 11-12",
    description: "Calculate the area enclosed between two functions over a specific interval. A classic application of definite integrals.",
    inputs: [
      { id: "f", label: "Upper Function f(x)", type: "text", placeholder: "x^2 + 2", defaultValue: "x^2 + 2" },
      { id: "g", label: "Lower Function g(x)", type: "text", placeholder: "x", defaultValue: "x" },
      { id: "a", label: "Lower bound (a)", type: "number", placeholder: "0", defaultValue: "0" },
      { id: "b", label: "Upper bound (b)", type: "number", placeholder: "2", defaultValue: "2" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid bounds" };
      const expr = `abs((${values.f}) - (${values.g}))`;
      return calculusSolver.integrateNumerical(expr, "x", a, b);
    },
  },
  {
    id: "critical_points",
    name: "Critical Points",
    category: "Calculus",
    classLevel: "Class 11-12",
    description: "Find the critical points of a function by setting its derivative to zero. Essential for finding local maxima and minima.",
    inputs: [
      { id: "expr", label: "Function f(x)", type: "text", placeholder: "x^3 - 3x^2 - 9x + 5", defaultValue: "x^3 - 3x^2 - 9x + 5" },
    ],
    calculate: (values) => {
      try {
        const deriv = calculusSolver.differentiate(values.expr, "x");
        if (deriv.result.startsWith("Error")) return deriv;
        return {
          result: `Set $${deriv.result.replace(/\$\$/g, '').replace(/\$/g, '')} = 0$ and solve for $x$`,
          steps: [
            `Function: $f(x) = ${values.expr}$`,
            `Step 1: Find the derivative $f'(x)$`,
            `$f'(x) = ${deriv.result.replace(/\$\$/g, '').replace(/\$/g, '')}$`,
            `Step 2: Set $f'(x) = 0$ to find critical points`,
            `$$${deriv.result.replace(/\$\$/g, '').replace(/\$/g, '')} = 0$$`,
            `Solve this equation to find the critical points.`
          ]
        };
      } catch (e) {
        return { result: "Invalid function" };
      }
    },
  },
];
