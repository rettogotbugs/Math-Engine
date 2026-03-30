import * as math from "mathjs";
import nerdamer from "nerdamer";
import "nerdamer/Algebra";
import "nerdamer/Calculus";
import "nerdamer/Solve";

export const algebraSolver = {
  solveEquation: (equation: string) => {
    try {
      const parts = equation.split("=");
      if (parts.length !== 2) throw new Error("Invalid equation format");

      const left = parts[0].trim();
      const right = parts[1].trim();
      const expr = `${left}-(${right})`;

      const variables = nerdamer(expr).variables();
      if (variables.length === 0) {
        const val = math.evaluate(expr);
        return {
          result: val === 0 ? "Infinite solutions" : "No solution",
          steps: [
            `Equation: $${math.parse(left).toTex()} = ${math.parse(right).toTex()}$`,
            `Simplified: $${math.parse(expr).toTex()} = 0$`,
            `Result: ${val === 0 ? "True for all $x$" : "Contradiction"}`,
          ],
        };
      }

      const v = variables[0];
      const solutions = (nerdamer as any).solve(expr, v).toString();

      // solutions looks like "[sol1, sol2]"
      const parsedSols = solutions.replace(/^\[|\]$/g, '').split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);

      const steps = [
        `Original equation: $${math.parse(left).toTex()} = ${math.parse(right).toTex()}$`,
        `Move all terms to one side: $${math.parse(expr).toTex()} = 0$`,
        `Solve for $${v}$ using algebraic methods:`,
      ];

      if (parsedSols.length === 0) {
        return { result: "No solution", steps };
      }

      parsedSols.forEach((sol: string, idx: number) => {
        steps.push(
          `$${v}${parsedSols.length > 1 ? `_${idx + 1}` : ""} = ${math.parse(sol).toTex()}$`,
        );
      });

      return {
        result: parsedSols
          .map(
            (sol: string, idx: number) =>
              `$${v}${parsedSols.length > 1 ? `_${idx + 1}` : ""} = ${math.parse(sol).toTex()}$`,
          )
          .join(", "),
        steps,
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
      `Equation: $${a}x^2 + ${b}x + ${c} = 0$`,
      `Formula: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$`,
      `Substitute values: $a = ${a}, b = ${b}, c = ${c}$`,
      `Calculate discriminant ($\\Delta$) = $b^2 - 4ac$`,
      `$$\\Delta = (${b})^2 - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${discriminant}$$`,
    ];

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      steps.push(`$\\Delta > 0$, so two real roots exist.`);
      steps.push(`$$x_1 = \\frac{-(${b}) + \\sqrt{${discriminant}}}{${2 * a}} = ${x1}$$`);
      steps.push(`$$x_2 = \\frac{-(${b}) - \\sqrt{${discriminant}}}{${2 * a}} = ${x2}$$`);
      return { result: `$$x_1 = ${x1}, x_2 = ${x2}$$`, steps };
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      steps.push(`$\\Delta = 0$, so one real root exists.`);
      steps.push(`$$x = \\frac{-(${b})}{${2 * a}} = ${x}$$`);
      return { result: `$$x = ${x}$$`, steps };
    } else {
      const real = -b / (2 * a);
      const imag = Math.sqrt(-discriminant) / (2 * a);
      steps.push(`$\\Delta < 0$, so two complex roots exist.`);
      steps.push(`$$x_1 = ${real} + ${imag}i$$`);
      steps.push(`$$x_2 = ${real} - ${imag}i$$`);
      return {
        result: `$$x_1 = ${real} + ${imag}i, x_2 = ${real} - ${imag}i$$`,
        steps,
      };
    }
  },

  simplifyExpression: (expr: string) => {
    try {
      const simplified = nerdamer(expr).toString();
      return {
        result: `$$${math.parse(simplified).toTex()}$$`,
        steps: [
          `Original expression: $${math.parse(expr).toTex()}$`,
          `Combine like terms and simplify.`,
          `Result is $$${math.parse(simplified).toTex()}$$`,
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
      const expanded = nerdamer(`expand(${expr})`).toString();
      return {
        result: `$$${math.parse(expanded).toTex()}$$`,
        steps: [
          `Original expression: $${math.parse(expr).toTex()}$`,
          `Expand the expression by multiplying out terms.`,
          `Result is $$${math.parse(expanded).toTex()}$$`,
        ],
      };
    } catch (e) {
      return {
        result: "Error expanding expression",
        steps: [(e as Error).message],
      };
    }
  },

  solveSystem2x2: (eq1: string, eq2: string) => {
    try {
      const nerdamer = require("nerdamer");
      require("nerdamer/Algebra");
      require("nerdamer/Calculus");
      require("nerdamer/Solve");

      const sol = (nerdamer as any).solveEquations([eq1, eq2]);

      const steps = [
        `System of Equations:`,
        `1) $$${nerdamer(eq1).toTeX()}$$`,
        `2) $$${nerdamer(eq2).toTeX()}$$`,
        `Solve using algebraic substitution:`,
      ];

      if (!sol || sol.length === 0) {
        return { result: "No unique solution", steps: [...steps, "The system may be inconsistent or dependent."] };
      }

      const v1 = sol[0][0];
      const v2 = sol[1][0];
      const val1 = sol[0][1];
      const val2 = sol[1][1];

      let isolateEq = eq2;
      let subEq = eq1;
      
      const vars2 = nerdamer(eq2).variables();
      if (!vars2.includes(v1)) {
        isolateEq = eq1;
        subEq = eq2;
      }

      steps.push(`Step 1: Isolate $${v1}$ in one equation.`);
      const sol1 = nerdamer(isolateEq).solveFor(v1).toString();
      steps.push(`$$${v1} = ${nerdamer(sol1).toTeX()}$$`);

      steps.push(`Step 2: Substitute $${v1}$ into the other equation.`);
      const v1Regex = new RegExp(`\\b${v1}\\b`, 'g');
      const sub_eq_expr = subEq.replace(v1Regex, `(${sol1})`);
      steps.push(`$$${nerdamer(sub_eq_expr).toTeX()}$$`);

      steps.push(`Step 3: Solve for $${v2}$.`);
      steps.push(`$$${v2} = ${nerdamer(val2.toString()).toTeX()}$$`);

      steps.push(`Step 4: Substitute $${v2}$ back to find $${v1}$.`);
      const v2Regex = new RegExp(`\\b${v2}\\b`, 'g');
      const final_v1_expr = sol1.replace(v2Regex, `(${val2.toString()})`);
      steps.push(`$$${v1} = ${nerdamer(final_v1_expr).toTeX()} = ${nerdamer(val1.toString()).toTeX()}$$`);

      steps.push(`Final Solution:`);
      steps.push(`$$${v1} = ${nerdamer(val1.toString()).toTeX()}, \\quad ${v2} = ${nerdamer(val2.toString()).toTeX()}$$`);

      const resultStr = sol.map((s: any) => `${s[0]} = ${s[1]}`).join(", ");

      return { result: `$$${resultStr}$$`, steps };
    } catch (e) {
      return {
        result: "Error solving system",
        steps: [(e as Error).message, "Ensure the equations are valid and contain two variables (e.g., x and y)."],
      };
    }
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
      const variables = expr
        .filter((node: any) => node.isSymbolNode)
        .map((node: any) => node.name);
      const uniqueVars = Array.from(new Set(variables));

      if (uniqueVars.length !== 1) {
        return {
          result: "Error: Need exactly one variable",
          steps: [
            "Currently only single-variable linear inequalities are supported.",
          ],
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
            `Original inequality: $${math.parse(left).toTex()} ${operator} ${math.parse(right).toTex()}$`,
            `Simplify: $${b} ${operator} 0$`,
            isTrue ? "This is always true." : "This is never true.",
          ],
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
        result: `$$${v} ${newOperator.replace('<=', '\\le').replace('>=', '\\ge')} ${x}$$`,
        steps: [
          `Original inequality: $${math.parse(left).toTex()} ${operator.replace('<=', '\\le').replace('>=', '\\ge')} ${math.parse(right).toTex()}$`,
          `Move all terms to one side: $${math.parse(left).toTex()} - (${math.parse(right).toTex()}) ${operator.replace('<=', '\\le').replace('>=', '\\ge')} 0$`,
          `Simplify: $${a}${v} + ${b} ${operator.replace('<=', '\\le').replace('>=', '\\ge')} 0$`,
          `Subtract $${b}$ from both sides: $${a}${v} ${operator.replace('<=', '\\le').replace('>=', '\\ge')} ${-b}$`,
          `Divide by $${a}$${a < 0 ? " (flip inequality sign because we divide by a negative number)" : ""}: $${v} ${newOperator.replace('<=', '\\le').replace('>=', '\\ge')} \\frac{${-b}}{${a}}$`,
          `Final answer: $$${v} ${newOperator.replace('<=', '\\le').replace('>=', '\\ge')} ${x}$$`,
        ],
      };
    } catch (e) {
      return {
        result: "Error solving inequality",
        steps: [(e as Error).message],
      };
    }
  },
};
