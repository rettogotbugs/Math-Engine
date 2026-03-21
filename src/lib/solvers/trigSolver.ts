import * as math from "mathjs";

export const trigSolver = {
  evaluateTrig: (func: string, angle: number, unit: "deg" | "rad") => {
    try {
      const rad = unit === "deg" ? angle * (Math.PI / 180) : angle;
      const cleanZero = (val: number) => (Math.abs(val) < 1e-10 ? 0 : val);

      let result;
      let steps = [
        `Function: ${func}(${angle}${unit === "deg" ? "°" : " rad"})`,
        unit === "deg"
          ? `Convert to radians: ${angle} * (π/180) ≈ ${rad.toFixed(4)}`
          : "",
      ].filter(Boolean);

      switch (func) {
        case "sin":
          result = cleanZero(Math.sin(rad));
          steps.push(`sin(${rad.toFixed(4)}) = ${result}`);
          break;
        case "cos":
          result = cleanZero(Math.cos(rad));
          steps.push(`cos(${rad.toFixed(4)}) = ${result}`);
          break;
        case "tan":
          const cosVal = Math.cos(rad);
          if (Math.abs(cosVal) < 1e-10) {
            result = "Undefined";
            steps.push(`cos(${rad.toFixed(4)}) is 0, so tan is undefined.`);
          } else {
            result = cleanZero(Math.tan(rad));
            steps.push(`tan(${rad.toFixed(4)}) = ${result}`);
          }
          break;
        default:
          throw new Error("Unsupported function");
      }

      return { result, steps };
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
        result: simplified,
        steps: [
          `Original expression: ${expr}`,
          `Apply trigonometric identities and simplify`,
          `Result: ${simplified}`,
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
      let steps = [`Function: ${func}(${value})`];

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

      steps.push(`Result in radians: ${radResult.toFixed(4)}`);

      if (unit === "deg") {
        const degResult = radResult * (180 / Math.PI);
        steps.push(`Convert to degrees: ${radResult.toFixed(4)} * (180/π) ≈ ${degResult.toFixed(2)}°`);
        return { result: `${degResult.toFixed(2)}°`, steps };
      }

      return { result: `${radResult.toFixed(4)} rad`, steps };
    } catch (e) {
      return {
        result: "Error evaluating inverse trig function",
        steps: [(e as Error).message],
      };
    }
  },
};
