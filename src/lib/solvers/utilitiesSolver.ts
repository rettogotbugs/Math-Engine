import * as math from "mathjs";

export const utilitiesSolver = {
  evaluateExpression: (expr: string) => {
    try {
      const result = math.evaluate(expr);
      return {
        result: `$$${result.toString()}$$`,
        steps: [
          `Evaluate expression: $${expr}$`,
          `Result: $${result.toString()}$`
        ]
      };
    } catch (e) {
      return { result: "Invalid expression", steps: ["Could not evaluate the expression."] };
    }
  },
  unitConverter: (value: number, fromUnit: string, toUnit: string) => {
    try {
      const unit = math.unit(value, fromUnit);
      const result = unit.toNumber(toUnit);
      
      // Calculate the conversion factor
      const factor = math.unit(1, fromUnit).toNumber(toUnit);
      
      return {
        result: `$$${math.format(result, { precision: 6 })} \\text{ ${toUnit}}$$`,
        steps: [
          `Convert $${value} \\text{ ${fromUnit}}$ to $\\text{${toUnit}}$`,
          `Conversion factor: $1 \\text{ ${fromUnit}} = ${math.format(factor, { precision: 6 })} \\text{ ${toUnit}}$`,
          `Calculation: $${value} \\times ${math.format(factor, { precision: 6 })} = ${math.format(result, { precision: 6 })}$`,
          `Result: $${math.format(result, { precision: 6 })} \\text{ ${toUnit}}$`
        ]
      };
    } catch (e) {
      return { result: "Invalid conversion", steps: ["Check if units are compatible."] };
    }
  },
  scientificNotation: (numStr: string) => {
    try {
      const num = parseFloat(numStr);
      if (isNaN(num)) throw new Error("Invalid number");
      
      const isScientific = numStr.toLowerCase().includes('e');
      
      if (isScientific) {
        // Convert from scientific to standard
        const standard = math.format(num, { notation: 'fixed' });
        const [coef, exp] = numStr.toLowerCase().split('e');
        return {
          result: `$$${standard}$$`,
          steps: [
            `Convert scientific notation to standard form:`,
            `Given: $$${coef} \\times 10^{${exp}}$$`,
            `Result: $$${standard}$$`
          ]
        };
      } else {
        // Convert from standard to scientific
        const scientific = math.format(num, { notation: 'exponential' });
        const [coef, exp] = scientific.toLowerCase().split('e');
        const formattedExp = exp.startsWith('+') ? exp.slice(1) : exp;
        return {
          result: `$$${coef} \\times 10^{${formattedExp}}$$`,
          steps: [
            `Convert standard number to scientific notation:`,
            `Given: $$${numStr}$$`,
            `Result: $$${coef} \\times 10^{${formattedExp}}$$`
          ]
        };
      }
    } catch (e) {
      return { result: "Invalid input", steps: ["Please enter a valid number."] };
    }
  }
};
