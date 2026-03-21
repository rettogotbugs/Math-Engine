import * as math from "mathjs";

export const algebraSolver = {
  solveLinear: (equation: string) => {
    try {
      // Very basic linear equation solver for "ax + b = c" or similar
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
          result: "Cannot solve multi-variable linear equations yet",
          steps: [],
        };
      }

      const v = uniqueVars[0];

      // expr is of form a*x + b
      // We can evaluate expr at x=0 to get b, and at x=1 to get a+b
      const b = expr.evaluate({ [v]: 0 });
      const aPlusB = expr.evaluate({ [v]: 1 });
      const a = aPlusB - b;

      if (a === 0) {
        return {
          result: b === 0 ? "Infinite solutions" : "No solution",
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
  }
};
