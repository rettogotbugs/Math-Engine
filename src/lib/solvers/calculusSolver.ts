import * as math from "mathjs";

export const calculusSolver = {
  differentiate: (expr: string, variable: string = "x") => {
    try {
      const derivative = math.derivative(expr, variable);
      const simplified = math.simplify(derivative).toString();

      return {
        result: `$$${math.parse(simplified).toTex()}$$`,
        steps: [
          `Function: $f(${variable}) = ${math.parse(expr).toTex()}$`,
          `Apply differentiation rules with respect to $${variable}$`,
          `$$f'(${variable}) = \\frac{d}{d${variable}} (${math.parse(expr).toTex()})$$`,
          `Raw derivative: $$${math.parse(derivative.toString()).toTex()}$$`,
          `Simplified derivative: $$${math.parse(simplified).toTex()}$$`,
        ],
      };
    } catch (e) {
      return {
        result: "Error differentiating expression",
        steps: [(e as Error).message],
      };
    }
  },

  // Basic numerical integration using Simpson's rule
  integrateNumerical: (
    expr: string,
    variable: string = "x",
    a: number,
    b: number,
    n: number = 1000,
  ) => {
    try {
      const node = math.parse(expr);
      const code = node.compile();

      const f = (val: number) => code.evaluate({ [variable]: val });

      // Simpson's 1/3 rule
      const h = (b - a) / n;
      let sum = f(a) + f(b);

      for (let i = 1; i < n; i += 2) {
        sum += 4 * f(a + i * h);
      }
      for (let i = 2; i < n - 1; i += 2) {
        sum += 2 * f(a + i * h);
      }

      const result = (h / 3) * sum;

      return {
        result: `$$${result.toFixed(6)}$$`,
        steps: [
          `Function: $f(${variable}) = ${math.parse(expr).toTex()}$`,
          `Integrate from $${variable} = ${a}$ to $${b}$`,
          `Using numerical integration (Simpson's rule) with ${n} intervals`,
          `Result: $$\\int_{${a}}^{${b}} (${math.parse(expr).toTex()}) d${variable} \\approx ${result.toFixed(6)}$$`,
        ],
      };
    } catch (e) {
      return {
        result: "Error integrating expression",
        steps: [(e as Error).message],
      };
    }
  },
};
