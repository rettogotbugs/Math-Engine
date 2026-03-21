import * as math from "mathjs";

export const utilitiesSolver = {
  evaluateExpression: (expr: string) => {
    try {
      const result = math.evaluate(expr);
      return {
        result: result.toString(),
        steps: [
          `Evaluate expression: ${expr}`,
          `Result: ${result.toString()}`
        ]
      };
    } catch (e) {
      return { result: "Invalid expression", steps: ["Could not evaluate the expression."] };
    }
  },
  unitConverter: (value: number, fromUnit: string, toUnit: string) => {
    try {
      const result = math.unit(value, fromUnit).toNumber(toUnit);
      return {
        result: `${result} ${toUnit}`,
        steps: [
          `Convert ${value} ${fromUnit} to ${toUnit}`,
          `Result: ${result} ${toUnit}`
        ]
      };
    } catch (e) {
      return { result: "Invalid conversion", steps: ["Check if units are compatible."] };
    }
  }
};
