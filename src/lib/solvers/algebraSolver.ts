import * as math from "mathjs";

export const algebraSolver = {
  solveEquation: (equation: string) => {
    try {
      const parts = equation.split("=");
      if (parts.length !== 2) throw new Error("Invalid equation format");

      const left = math.simplify(parts[0]).toString();
      const right = math.simplify(parts[1]).toString();

      // Move everything to left side: left - (right) = 0
      const expr = math.simplify(`(${left}) - (${right})`);

      // Find the variable
      const variables = expr
        .filter((node: any) => node.isSymbolNode)
        .map((node: any) => node.name);
      const uniqueVars = Array.from(new Set(variables));

      if (uniqueVars.length === 0) {
        const val = expr.evaluate();
        return {
          result: val === 0 ? "Infinite solutions" : "No solution",
          steps: [
            `Equation: ${equation}`,
            `Simplified: ${expr.toString()} = 0`,
            `Result: ${val === 0 ? "True for all x" : "Contradiction"}`,
          ],
        };
      }

      if (uniqueVars.length > 1) {
        return {
          result: "Cannot solve multi-variable equations yet",
          steps: [],
        };
      }

      const v = uniqueVars[0] as string;

      // Try to determine the degree by evaluating at 3 points
      const y0 = expr.evaluate({ [v]: 0 });
      const y1 = expr.evaluate({ [v]: 1 });
      const y2 = expr.evaluate({ [v]: 2 });
      const y3 = expr.evaluate({ [v]: 3 });

      // First differences
      const d1_0 = y1 - y0;
      const d1_1 = y2 - y1;
      const d1_2 = y3 - y2;

      // Second differences
      const d2_0 = d1_1 - d1_0;
      const d2_1 = d1_2 - d1_1;

      // Third differences
      const d3_0 = d2_1 - d2_0;

      if (Math.abs(d2_0) < 1e-10 && Math.abs(d2_1) < 1e-10) {
        // It's linear: ax + b = 0
        const b = y0;
        const a = y1 - y0;

        if (Math.abs(a) < 1e-10) {
          return {
            result: Math.abs(b) < 1e-10 ? "Infinite solutions" : "No solution",
            steps: [`Equation: ${equation}`, `Simplified: ${b} = 0`],
          };
        }

        const x = -b / a;

        return {
          result: `${v} = ${x}`,
          steps: [
            `Original equation: ${equation}`,
            `Move all terms to one side: ${left} - (${right}) = 0`,
            `Simplify: ${a}${v} + ${b} = 0`,
            `Subtract ${b} from both sides: ${a}${v} = ${-b}`,
            `Divide by ${a}: ${v} = ${-b} / ${a}`,
            `Final answer: ${v} = ${x}`,
          ],
        };
      } else if (Math.abs(d3_0) < 1e-10) {
        // It's quadratic: ax^2 + bx + c = 0
        const c = y0;
        const aPlusB = y1 - y0; // a + b = y1 - y0
        const fourAPlus2B = y2 - y0; // 4a + 2b = y2 - y0
        
        // 2a = (4a + 2b) - 2(a + b)
        const twoA = fourAPlus2B - 2 * aPlusB;
        const a = twoA / 2;
        const b = aPlusB - a;

        const discriminant = b * b - 4 * a * c;
        const steps = [
          `Original equation: ${equation}`,
          `Move all terms to one side: ${left} - (${right}) = 0`,
          `Simplify to quadratic form: ${a}${v}² + ${b}${v} + ${c} = 0`,
          `Calculate discriminant (Δ) = b² - 4ac`,
          `Δ = (${b})² - 4(${a})(${c}) = ${discriminant}`,
        ];

        if (discriminant > 0) {
          const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
          const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
          steps.push(`Δ > 0, so two real roots exist.`);
          steps.push(`${v}₁ = (-(${b}) + √${discriminant}) / ${2 * a} = ${x1}`);
          steps.push(`${v}₂ = (-(${b}) - √${discriminant}) / ${2 * a} = ${x2}`);
          return { result: `${v}₁ = ${x1}, ${v}₂ = ${x2}`, steps };
        } else if (Math.abs(discriminant) < 1e-10) {
          const x = -b / (2 * a);
          steps.push(`Δ = 0, so one real root exists.`);
          steps.push(`${v} = -(${b}) / ${2 * a} = ${x}`);
          return { result: `${v} = ${x}`, steps };
        } else {
          const real = -b / (2 * a);
          const imag = Math.sqrt(-discriminant) / (2 * a);
          steps.push(`Δ < 0, so two complex roots exist.`);
          steps.push(`${v}₁ = ${real} + ${imag}i`);
          steps.push(`${v}₂ = ${real} - ${imag}i`);
          return {
            result: `${v}₁ = ${real} + ${imag}i, ${v}₂ = ${real} - ${imag}i`,
            steps,
          };
        }
      } else {
        // Higher degree equation - use Newton-Raphson method to find one real root
        const steps = [
          `Original equation: ${equation}`,
          `Move all terms to one side: f(${v}) = ${left} - (${right}) = 0`,
          `This is a higher-degree polynomial or non-linear equation.`,
          `Using Newton-Raphson numerical method to find a real root...`
        ];

        // Derivative approximation: f'(x) ≈ (f(x + h) - f(x - h)) / 2h
        const h = 1e-5;
        const f = (xVal: number) => {
          const scope = { [v]: xVal };
          return math.evaluate(`(${left}) - (${right})`, scope);
        };
        const df = (xVal: number) => {
          return (f(xVal + h) - f(xVal - h)) / (2 * h);
        };

        let x = 1; // Initial guess
        const maxIter = 100;
        const tol = 1e-7;
        let iter = 0;
        let found = false;

        for (; iter < maxIter; iter++) {
          const fx = f(x);
          if (Math.abs(fx) < tol) {
            found = true;
            break;
          }
          const dfx = df(x);
          if (Math.abs(dfx) < 1e-10) {
            // Derivative is too close to zero, try a different guess
            x += 0.5;
            continue;
          }
          x = x - fx / dfx;
        }

        if (found) {
          steps.push(`Found a root after ${iter} iterations.`);
          steps.push(`Approximate real root: ${v} ≈ ${x}`);
          return {
            result: `${v} ≈ ${x}`,
            steps,
          };
        } else {
          return {
            result: "Could not find a real root",
            steps: [
              ...steps,
              `The numerical method failed to converge to a real root within ${maxIter} iterations.`,
            ],
          };
        }
      }
    } catch (e) {
      return {
        result: "Error solving equation",
        steps: [(e as Error).message],
      };
    }
  },

  solveQuadratic: (a: number, b: number, c: number) => {
    const discriminant = b * b - 4 * a * c;
    const steps = [
      `Equation: ${a}x² + ${b}x + ${c} = 0`,
      `Formula: x = (-b ± √(b² - 4ac)) / 2a`,
      `Substitute values: a = ${a}, b = ${b}, c = ${c}`,
      `Calculate discriminant (Δ) = b² - 4ac`,
      `Δ = (${b})² - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${discriminant}`,
    ];

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      steps.push(`Δ > 0, so two real roots exist.`);
      steps.push(`x₁ = (-(${b}) + √${discriminant}) / ${2 * a} = ${x1}`);
      steps.push(`x₂ = (-(${b}) - √${discriminant}) / ${2 * a} = ${x2}`);
      return { result: `x₁ = ${x1}, x₂ = ${x2}`, steps };
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      steps.push(`Δ = 0, so one real root exists.`);
      steps.push(`x = -(${b}) / ${2 * a} = ${x}`);
      return { result: `x = ${x}`, steps };
    } else {
      const real = -b / (2 * a);
      const imag = Math.sqrt(-discriminant) / (2 * a);
      steps.push(`Δ < 0, so two complex roots exist.`);
      steps.push(`x₁ = ${real} + ${imag}i`);
      steps.push(`x₂ = ${real} - ${imag}i`);
      return {
        result: `x₁ = ${real} + ${imag}i, x₂ = ${real} - ${imag}i`,
        steps,
      };
    }
  },

  simplifyExpression: (expr: string) => {
    try {
      const simplified = math.simplify(expr).toString();
      return {
        result: simplified,
        steps: [
          `Original expression: ${expr}`,
          `Combine like terms and simplify`,
          `Result: ${simplified}`,
        ],
      };
    } catch (e) {
      return {
        result: "Error simplifying expression",
        steps: [(e as Error).message],
      };
    }
  },

  expandExpression: (expr: string) => {
    try {
      // mathjs doesn't have a direct 'expand' function that works perfectly for all polynomials
      // but we can use rationalize to expand polynomials
      const expanded = math.rationalize(expr).toString();
      return {
        result: expanded,
        steps: [
          `Original expression: ${expr}`,
          `Expand the expression by multiplying out terms`,
          `Result: ${expanded}`,
        ],
      };
    } catch (e) {
      return {
        result: "Error expanding expression",
        steps: [(e as Error).message],
      };
    }
  },

  solveSystem2x2: (a1: number, b1: number, c1: number, a2: number, b2: number, c2: number) => {
    // a1*x + b1*y = c1
    // a2*x + b2*y = c2
    const det = a1 * b2 - a2 * b1;
    const steps = [
      `System of equations:`,
      `1) ${a1}x + ${b1}y = ${c1}`,
      `2) ${a2}x + ${b2}y = ${c2}`,
      `Using Cramer's Rule:`,
      `Determinant (D) = a1*b2 - a2*b1`,
      `D = (${a1})*(${b2}) - (${a2})*(${b1}) = ${det}`
    ];

    if (det === 0) {
      // Check if infinite solutions or no solution
      const detX = c1 * b2 - c2 * b1;
      const detY = a1 * c2 - a2 * c1;
      if (detX === 0 && detY === 0) {
        steps.push(`Dx = 0 and Dy = 0. The system has infinite solutions (lines are coincident).`);
        return { result: "Infinite solutions", steps };
      } else {
        steps.push(`Dx = ${detX}, Dy = ${detY}. Since D = 0 but Dx or Dy != 0, the system has no solution (lines are parallel).`);
        return { result: "No solution", steps };
      }
    }

    const detX = c1 * b2 - c2 * b1;
    const detY = a1 * c2 - a2 * c1;
    
    steps.push(`Dx = c1*b2 - c2*b1 = (${c1})*(${b2}) - (${c2})*(${b1}) = ${detX}`);
    steps.push(`Dy = a1*c2 - a2*c1 = (${a1})*(${c2}) - (${a2})*(${c1}) = ${detY}`);
    
    const x = detX / det;
    const y = detY / det;
    
    steps.push(`x = Dx / D = ${detX} / ${det} = ${x}`);
    steps.push(`y = Dy / D = ${detY} / ${det} = ${y}`);

    return { result: `x = ${x}, y = ${y}`, steps };
  },

  solveInequality: (inequality: string) => {
    try {
      const match = inequality.match(/^(.*?)(<=|>=|<|>)(.*)$/);
      if (!match) {
        return {
          result: "Invalid inequality format",
          steps: ["Please use <, >, <=, or >=."],
        };
      }

      const left = match[1].trim();
      const operator = match[2].trim();
      const right = match[3].trim();

      const expr = math.parse(`(${left}) - (${right})`);
      const variables = expr.filter((node) => node.isSymbolNode).map((node: any) => node.name);
      const uniqueVars = Array.from(new Set(variables));

      if (uniqueVars.length !== 1) {
        return {
          result: "Error: Need exactly one variable",
          steps: ["Currently only single-variable linear inequalities are supported."],
        };
      }

      const v = uniqueVars[0];
      
      // Evaluate at x=0 and x=1 to find a and b for ax + b
      const scope0 = { [v]: 0 };
      const scope1 = { [v]: 1 };
      
      const y0 = math.evaluate(`(${left}) - (${right})`, scope0);
      const y1 = math.evaluate(`(${left}) - (${right})`, scope1);
      
      const a = y1 - y0;
      const b = y0;

      if (Math.abs(a) < 1e-10) {
        // It's a constant inequality
        let isTrue = false;
        if (operator === "<") isTrue = b < 0;
        else if (operator === ">") isTrue = b > 0;
        else if (operator === "<=") isTrue = b <= 0;
        else if (operator === ">=") isTrue = b >= 0;

        return {
          result: isTrue ? "All real numbers" : "No solution",
          steps: [
            `Original inequality: ${inequality}`,
            `Simplify: ${b} ${operator} 0`,
            isTrue ? "This is always true." : "This is never true."
          ]
        };
      }

      let newOperator = operator;
      if (a < 0) {
        // Flip operator
        if (operator === "<") newOperator = ">";
        else if (operator === ">") newOperator = "<";
        else if (operator === "<=") newOperator = ">=";
        else if (operator === ">=") newOperator = "<=";
      }

      const x = -b / a;

      return {
        result: `${v} ${newOperator} ${x}`,
        steps: [
          `Original inequality: ${inequality}`,
          `Move all terms to one side: ${left} - (${right}) ${operator} 0`,
          `Simplify: ${a}${v} + ${b} ${operator} 0`,
          `Subtract ${b} from both sides: ${a}${v} ${operator} ${-b}`,
          `Divide by ${a}${a < 0 ? " (flip inequality sign because we divide by a negative number)" : ""}: ${v} ${newOperator} ${-b} / ${a}`,
          `Final answer: ${v} ${newOperator} ${x}`
        ]
      };

    } catch (e) {
      return {
        result: "Error solving inequality",
        steps: [(e as Error).message],
      };
    }
  }
};
