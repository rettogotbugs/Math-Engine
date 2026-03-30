export const arithmeticSolver = {
  add: (a: number, b: number) => ({
    result: `$$${a + b}$$`,
    steps: [
      `Given values: $${a}, ${b}$`,
      `Operation: Addition`,
      `Result: $${a} + ${b} = ${a + b}$`,
    ],
  }),
  subtract: (a: number, b: number) => ({
    result: `$$${a - b}$$`,
    steps: [
      `Given values: $${a}, ${b}$`,
      `Operation: Subtraction`,
      `Result: $${a} - ${b} = ${a - b}$`,
    ],
  }),
  multiply: (a: number, b: number) => ({
    result: `$$${a * b}$$`,
    steps: [
      `Given values: $${a}, ${b}$`,
      `Operation: Multiplication`,
      `Result: $${a} \\times ${b} = ${a * b}$`,
    ],
  }),
  divide: (a: number, b: number) => {
    if (b === 0)
      return { result: "Undefined", steps: ["Division by zero is undefined."] };
    return {
      result: `$$${a / b}$$`,
      steps: [
        `Given values: $${a}, ${b}$`,
        `Operation: Division`,
        `Result: $${a} \\div ${b} = ${a / b}$`,
      ],
    };
  },
  gcd: (a: number, b: number): { result: number; steps: string[] } => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    const steps = [`Find GCD of $${x}$ and $${y}$`];
    while (y) {
      const temp = y;
      steps.push(`$${x} = ${Math.floor(x / y)} \\times ${y} + ${x % y}$`);
      y = x % y;
      x = temp;
    }
    steps.push(`GCD is $${x}$`);
    return { result: x, steps };
  },
  lcm: (a: number, b: number) => {
    const gcdResult = arithmeticSolver.gcd(a, b);
    const result = Math.abs(a * b) / gcdResult.result;
    return {
      result: `$$${result}$$`,
      steps: [
        `Find LCM of $${a}$ and $${b}$`,
        `Formula: $\\text{LCM}(a, b) = \\frac{|a \\times b|}{\\text{GCD}(a, b)}$`,
        ...gcdResult.steps,
        `$\\text{LCM} = \\frac{|${a} \\times ${b}|}{${gcdResult.result}} = ${result}$`,
      ],
    };
  },
  fractionAdd: (n1: number, d1: number, n2: number, d2: number) => {
    const lcmResult = arithmeticSolver.lcm(d1, d2);
    const commonDenom = typeof lcmResult.result === 'string' ? parseInt(lcmResult.result.replace(/[^0-9-]/g, '')) : lcmResult.result;
    const newN1 = n1 * (commonDenom / d1);
    const newN2 = n2 * (commonDenom / d2);
    const sumN = newN1 + newN2;
    const gcdResult = arithmeticSolver.gcd(sumN, commonDenom);
    const finalN = sumN / gcdResult.result;
    const finalD = commonDenom / gcdResult.result;

    return {
      result: `$$\\frac{${finalN}}{${finalD}}$$`,
      steps: [
        `Add fractions: $$\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}$$`,
        `Find LCM of denominators $${d1}$ and $${d2}$: $${commonDenom}$`,
        `Convert fractions: $$\\frac{${n1} \\times ${commonDenom / d1}}{${commonDenom}} + \\frac{${n2} \\times ${commonDenom / d2}}{${commonDenom}}$$`,
        `$$= \\frac{${newN1}}{${commonDenom}} + \\frac{${newN2}}{${commonDenom}}$$`,
        `Add numerators: $$\\frac{${newN1} + ${newN2}}{${commonDenom}} = \\frac{${sumN}}{${commonDenom}}$$`,
        `Simplify fraction by dividing by $\\text{GCD}(${sumN}, ${commonDenom})$ which is $${gcdResult.result}$`,
        `Final result: $$\\frac{${finalN}}{${finalD}}$$`,
      ],
    };
  },
  percentage: (part: number, total: number) => {
    if (total === 0) return { result: "Undefined", steps: ["Total cannot be zero."] };
    const result = (part / total) * 100;
    return {
      result: `$$${result}\\%$$`,
      steps: [
        `Find what percentage $${part}$ is of $${total}$`,
        `Formula: $$\\left(\\frac{\\text{Part}}{\\text{Total}}\\right) \\times 100$$`,
        `Substitute values: $$\\left(\\frac{${part}}{${total}}\\right) \\times 100$$`,
        `Calculate: $$\\left(${part / total}\\right) \\times 100 = ${result}\\%$$`
      ]
    };
  },
  ratio: (a: number, b: number) => {
    if (b === 0) return { result: "Undefined", steps: ["Ratio denominator cannot be zero."] };
    const gcdRes = arithmeticSolver.gcd(a, b);
    const gcd = gcdRes.result;
    const simpA = a / gcd;
    const simpB = b / gcd;
    return {
      result: `$$${simpA}:${simpB}$$`,
      steps: [
        `Simplify ratio $${a}:${b}$`,
        `Find GCD of $${a}$ and $${b}$`,
        ...gcdRes.steps,
        `Divide both sides by GCD ($${gcd}$)`,
        `$${a} \\div ${gcd} = ${simpA}$`,
        `$${b} \\div ${gcd} = ${simpB}$`,
        `Simplified ratio: $${simpA}:${simpB}$`
      ]
    };
  }
};
