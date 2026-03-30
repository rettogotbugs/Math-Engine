import * as math from "mathjs";

export const trigSolver = {
  evaluateTrig: (func: string, angle: number, unit: "deg" | "rad") => {
    try {
      const rad = unit === "deg" ? angle * (Math.PI / 180) : angle;
      const cleanZero = (val: number) => (Math.abs(val) < 1e-10 ? 0 : val);

      let result;
      let steps = [
        `Function: $\\${func}(${angle}${unit === "deg" ? "^\\circ" : "\\text{ rad"}})$`,
        unit === "deg"
          ? `Convert to radians: $${angle} \\times \\left(\\frac{\\pi}{180}\\right) \\approx ${rad.toFixed(4)}$`
          : "",
      ].filter(Boolean);

      switch (func) {
        case "sin":
          result = cleanZero(Math.sin(rad));
          steps.push(`$\\sin(${rad.toFixed(4)}) = ${result}$`);
          break;
        case "cos":
          result = cleanZero(Math.cos(rad));
          steps.push(`$\\cos(${rad.toFixed(4)}) = ${result}$`);
          break;
        case "tan":
          const cosVal = Math.cos(rad);
          if (Math.abs(cosVal) < 1e-10) {
            result = "Undefined";
            steps.push(`$\\cos(${rad.toFixed(4)})$ is 0, so $\\tan$ is undefined.`);
          } else {
            result = cleanZero(Math.tan(rad));
            steps.push(`$\\tan(${rad.toFixed(4)}) = ${result}$`);
          }
          break;
        case "csc":
          const sinVal = Math.sin(rad);
          if (Math.abs(sinVal) < 1e-10) {
            result = "Undefined";
            steps.push(`$\\sin(${rad.toFixed(4)})$ is 0, so $\\csc$ is undefined.`);
          } else {
            result = cleanZero(1 / sinVal);
            steps.push(`$\\csc(${rad.toFixed(4)}) = \\frac{1}{\\sin(${rad.toFixed(4)})} = ${result}$`);
          }
          break;
        case "sec":
          const cosValSec = Math.cos(rad);
          if (Math.abs(cosValSec) < 1e-10) {
            result = "Undefined";
            steps.push(`$\\cos(${rad.toFixed(4)})$ is 0, so $\\sec$ is undefined.`);
          } else {
            result = cleanZero(1 / cosValSec);
            steps.push(`$\\sec(${rad.toFixed(4)}) = \\frac{1}{\\cos(${rad.toFixed(4)})} = ${result}$`);
          }
          break;
        case "cot":
          const tanVal = Math.tan(rad);
          if (Math.abs(tanVal) < 1e-10) {
            result = "Undefined";
            steps.push(`$\\tan(${rad.toFixed(4)})$ is 0, so $\\cot$ is undefined.`);
          } else {
            result = cleanZero(1 / tanVal);
            steps.push(`$\\cot(${rad.toFixed(4)}) = \\frac{1}{\\tan(${rad.toFixed(4)})} = ${result}$`);
          }
          break;
        default:
          throw new Error("Unsupported function");
      }

      return { result: typeof result === "number" ? `$$${result}$$` : result, steps };
    } catch (e) {
      return {
        result: "Error evaluating trig function",
        steps: [(e as Error).message],
      };
    }
  },

  simplifyTrig: (expr: string) => {
    try {
      // mathjs has limited trig simplification, but we can try basic simplification
      const simplified = math.simplify(expr).toString();
      return {
        result: `$$${math.parse(simplified).toTex()}$$`,
        steps: [
          `Original expression: $${math.parse(expr).toTex()}$`,
          `Apply trigonometric identities and simplify.`,
          `Result is $${math.parse(simplified).toTex()}$`,
        ],
      };
    } catch (e) {
      return {
        result: "Error simplifying trig expression",
        steps: [(e as Error).message],
      };
    }
  },

  inverseTrig: (func: string, value: number, unit: "deg" | "rad") => {
    try {
      if ((func === "asin" || func === "acos") && (value < -1 || value > 1)) {
        return { result: "Undefined", steps: ["Value must be between -1 and 1 for asin/acos."] };
      }

      let radResult;
      let steps = [`Function: $\\text{a}${func.substring(1)}(${value})$`];

      switch (func) {
        case "asin":
          radResult = Math.asin(value);
          break;
        case "acos":
          radResult = Math.acos(value);
          break;
        case "atan":
          radResult = Math.atan(value);
          break;
        default:
          throw new Error("Unsupported function");
      }

      steps.push(`Result in radians: $${radResult.toFixed(4)}$`);

      if (unit === "deg") {
        const degResult = radResult * (180 / Math.PI);
        steps.push(`Convert to degrees: $${radResult.toFixed(4)} \\times \\left(\\frac{180}{\\pi}\\right) \\approx ${degResult.toFixed(2)}^\\circ$`);
        return { result: `$$${degResult.toFixed(2)}^\\circ$$`, steps };
      }

      return { result: `$$${radResult.toFixed(4)}\\text{ rad}$$`, steps };
    } catch (e) {
      return {
        result: "Error evaluating inverse trig function",
        steps: [(e as Error).message],
      };
    }
  },
};
