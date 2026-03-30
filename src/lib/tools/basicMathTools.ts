import { MathTool } from "../mathTools";
import { arithmeticSolver } from "../solvers/arithmeticSolver";

export const basicMathTools: MathTool[] = [
  {
    id: "basic_add",
    name: "Addition & Subtraction",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Perform basic addition and subtraction operations with detailed step-by-step breakdowns. Useful for verifying manual calculations and understanding fundamental arithmetic.",
    inputs: [
      { id: "a", label: "Number 1", type: "number", placeholder: "15", defaultValue: "15" },
      {
        id: "op",
        label: "Operation",
        type: "select",
        options: [
          { label: "+", value: "+" },
          { label: "-", value: "-" },
        ],
        defaultValue: "+"
      },
      { id: "b", label: "Number 2", type: "number", placeholder: "7", defaultValue: "7" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid input" };
      return values.op === "+"
        ? arithmeticSolver.add(a, b)
        : arithmeticSolver.subtract(a, b);
    },
  },
  {
    id: "basic_mult_div",
    name: "Multiplication & Division",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Multiply or divide two numbers and see the exact process. Great for learning long multiplication or division techniques and checking your work.",
    inputs: [
      { id: "a", label: "Number 1", type: "number", placeholder: "12", defaultValue: "12" },
      {
        id: "op",
        label: "Operation",
        type: "select",
        options: [
          { label: "×", value: "*" },
          { label: "÷", value: "/" },
        ],
        defaultValue: "*"
      },
      { id: "b", label: "Number 2", type: "number", placeholder: "4", defaultValue: "4" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid input" };
      return values.op === "*"
        ? arithmeticSolver.multiply(a, b)
        : arithmeticSolver.divide(a, b);
    },
  },
  {
    id: "fraction_add",
    name: "Fraction Addition",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Add two fractions by finding the least common denominator. Essential for understanding how to combine parts of a whole.",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", placeholder: "1", defaultValue: "1" },
      { id: "d1", label: "Denominator 1", type: "number", placeholder: "2", defaultValue: "2" },
      { id: "n2", label: "Numerator 2", type: "number", placeholder: "1", defaultValue: "1" },
      { id: "d2", label: "Denominator 2", type: "number", placeholder: "3", defaultValue: "3" },
    ],
    calculate: (values) => {
      const n1 = parseInt(values.n1);
      const d1 = parseInt(values.d1);
      const n2 = parseInt(values.n2);
      const d2 = parseInt(values.d2);
      if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0)
        return { result: "Invalid input" };
      return arithmeticSolver.fractionAdd(n1, d1, n2, d2);
    },
  },
  {
    id: "fraction_sub",
    name: "Fraction Subtraction",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Subtract two fractions step-by-step by finding a common denominator. Helps in solving problems involving differences of fractional quantities.",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", placeholder: "3", defaultValue: "3" },
      { id: "d1", label: "Denominator 1", type: "number", placeholder: "4", defaultValue: "4" },
      { id: "n2", label: "Numerator 2", type: "number", placeholder: "1", defaultValue: "1" },
      { id: "d2", label: "Denominator 2", type: "number", placeholder: "6", defaultValue: "6" },
    ],
    calculate: (values) => {
      const n1 = parseInt(values.n1);
      const d1 = parseInt(values.d1);
      const n2 = parseInt(values.n2);
      const d2 = parseInt(values.d2);
      if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0)
        return { result: "Invalid input" };
      const lcmResult = arithmeticSolver.lcm(d1, d2).result;
      const lcm = typeof lcmResult === 'string' ? parseInt(lcmResult.replace(/[^0-9-]/g, '')) : lcmResult;
      const num1 = n1 * (Number(lcm) / d1);
      const num2 = n2 * (Number(lcm) / d2);
      const resNum = num1 - num2;
      return {
        result: `$$\\frac{${resNum}}{${lcm}}$$`,
        steps: [
          `Find LCM of $${d1}$ and $${d2} = ${lcm}$`,
          `Convert fractions: $$\\frac{${num1}}{${lcm}} - \\frac{${num2}}{${lcm}}$$`,
          `Subtract numerators: $${num1} - ${num2} = ${resNum}$`,
          `Result: $$\\frac{${resNum}}{${lcm}}$$`
        ]
      };
    },
  },
  {
    id: "fraction_mult",
    name: "Fraction Multiplication",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Multiply two fractions by multiplying numerators and denominators. Useful for scaling quantities and finding fractions of fractions.",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", placeholder: "2", defaultValue: "2" },
      { id: "d1", label: "Denominator 1", type: "number", placeholder: "3", defaultValue: "3" },
      { id: "n2", label: "Numerator 2", type: "number", placeholder: "4", defaultValue: "4" },
      { id: "d2", label: "Denominator 2", type: "number", placeholder: "5", defaultValue: "5" },
    ],
    calculate: (values) => {
      const n1 = parseInt(values.n1);
      const d1 = parseInt(values.d1);
      const n2 = parseInt(values.n2);
      const d2 = parseInt(values.d2);
      if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0)
        return { result: "Invalid input" };
      
      const resNum = n1 * n2;
      const resDen = d1 * d2;
      return {
        result: `$$\\frac{${resNum}}{${resDen}}$$`,
        steps: [
          `Multiply numerators: $${n1} \\times ${n2} = ${resNum}$`,
          `Multiply denominators: $${d1} \\times ${d2} = ${resDen}$`,
          `Result: $$\\frac{${resNum}}{${resDen}}$$`
        ]
      };
    },
  },
  {
    id: "fraction_div",
    name: "Fraction Division",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Divide two fractions using the reciprocal method (keep-change-flip). Crucial for solving algebraic equations involving rational numbers.",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", placeholder: "3", defaultValue: "3" },
      { id: "d1", label: "Denominator 1", type: "number", placeholder: "4", defaultValue: "4" },
      { id: "n2", label: "Numerator 2", type: "number", placeholder: "1", defaultValue: "1" },
      { id: "d2", label: "Denominator 2", type: "number", placeholder: "2", defaultValue: "2" },
    ],
    calculate: (values) => {
      const n1 = parseInt(values.n1);
      const d1 = parseInt(values.d1);
      const n2 = parseInt(values.n2);
      const d2 = parseInt(values.d2);
      if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0 || n2 === 0)
        return { result: "Invalid input" };
      
      const resNum = n1 * d2;
      const resDen = d1 * n2;
      return {
        result: `$$\\frac{${resNum}}{${resDen}}$$`,
        steps: [
          `Multiply by reciprocal of second fraction: $$\\frac{${n1}}{${d1}} \\times \\frac{${d2}}{${n2}}$$`,
          `Multiply numerators: $${n1} \\times ${d2} = ${resNum}$`,
          `Multiply denominators: $${d1} \\times ${n2} = ${resDen}$`,
          `Result: $$\\frac{${resNum}}{${resDen}}$$`
        ]
      };
    },
  },
  {
    id: "decimal_to_fraction",
    name: "Decimal to Fraction",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Convert a decimal number to its simplest fractional form. Helps in standardizing numbers for exact algebraic calculations.",
    inputs: [
      { id: "dec", label: "Decimal", type: "number", placeholder: "0.375", defaultValue: "0.375" },
    ],
    calculate: (values) => {
      const dec = parseFloat(values.dec);
      if (isNaN(dec)) return { result: "Invalid input" };
      
      const len = dec.toString().split('.')[1]?.length || 0;
      const den = Math.pow(10, len);
      const num = dec * den;
      const gcd = Number(arithmeticSolver.gcd(num, den).result);
      
      return {
        result: `$$\\frac{${num/gcd}}{${den/gcd}}$$`,
        steps: [
          `Decimal: $${dec}$`,
          `Multiply by $10^{${len}}$: $$\\frac{${num}}{${den}}$$`,
          `Find GCD of $${num}$ and $${den} = ${gcd}$`,
          `Divide numerator and denominator by $${gcd}$`,
          `Result: $$\\frac{${num/gcd}}{${den/gcd}}$$`
        ]
      };
    },
  },
  {
    id: "fraction_to_decimal",
    name: "Fraction to Decimal",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Convert a fraction to a decimal number. Useful for practical applications like measurement and financial calculations.",
    inputs: [
      { id: "n", label: "Numerator", type: "number", placeholder: "5", defaultValue: "5" },
      { id: "d", label: "Denominator", type: "number", placeholder: "8", defaultValue: "8" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      const d = parseInt(values.d);
      if (isNaN(n) || isNaN(d) || d === 0) return { result: "Invalid input" };
      const res = n / d;
      return {
        result: `$$${res}$$`,
        steps: [
          `Divide numerator by denominator: $${n} \\div ${d}$`,
          `Result: $${res}$`
        ]
      };
    },
  },
  {
    id: "decimal_to_percent",
    name: "Decimal to Percentage",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Convert a decimal number to a percentage. Essential for understanding rates, probabilities, and statistical data.",
    inputs: [
      { id: "dec", label: "Decimal", type: "number", placeholder: "0.625", defaultValue: "0.625" },
    ],
    calculate: (values) => {
      const dec = parseFloat(values.dec);
      if (isNaN(dec)) return { result: "Invalid input" };
      const res = dec * 100;
      return {
        result: `$$${res}\\%$$`,
        steps: [
          `Multiply decimal by $100$: $${dec} \\times 100$`,
          `Result: $${res}\\%$`
        ]
      };
    },
  },
  {
    id: "percent_to_decimal",
    name: "Percentage to Decimal",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Convert a percentage to a decimal number. A necessary step before using percentages in mathematical formulas.",
    inputs: [
      { id: "pct", label: "Percentage", type: "number", placeholder: "87.5", defaultValue: "87.5" },
    ],
    calculate: (values) => {
      const pct = parseFloat(values.pct);
      if (isNaN(pct)) return { result: "Invalid input" };
      const res = pct / 100;
      return {
        result: `$$${res}$$`,
        steps: [
          `Divide percentage by $100$: $${pct} \\div 100$`,
          `Result: $${res}$`
        ]
      };
    },
  },
  {
    id: "lcm_hcf",
    name: "LCM & HCF",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Calculate Least Common Multiple and Highest Common Factor using efficient methods. Vital for simplifying fractions and solving time-cycle problems.",
    inputs: [
      { id: "a", label: "Number 1", type: "number", placeholder: "24", defaultValue: "24" },
      { id: "b", label: "Number 2", type: "number", placeholder: "36", defaultValue: "36" },
    ],
    calculate: (values) => {
      const a = parseInt(values.a);
      const b = parseInt(values.b);
      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return { result: "Invalid input (must be positive integers)" };
      
      const steps: string[] = [`Find LCM and HCF of $${a}$ and $${b}$ using the Ladder Method:`];
      const ladderSteps: { div: number | string, valA: number, valB: number }[] = [];
      
      let currentA = a;
      let currentB = b;
      let hcf = 1;
      
      let divisor = 2;
      while (divisor <= currentA && divisor <= currentB) {
        if (currentA % divisor === 0 && currentB % divisor === 0) {
          ladderSteps.push({ div: divisor, valA: currentA, valB: currentB });
          currentA /= divisor;
          currentB /= divisor;
          hcf *= divisor;
        } else {
          divisor++;
        }
      }
      ladderSteps.push({ div: " ", valA: currentA, valB: currentB });
      
      const lcm = hcf * currentA * currentB;
      
      let latexStr = "$$\\begin{array}{r|ll}\n";
      for (let i = 0; i < ladderSteps.length; i++) {
        const step = ladderSteps[i];
        if (i < ladderSteps.length - 1) {
          latexStr += `${step.div} & ${step.valA} & ${step.valB} \\\\ \\hline\n`;
        } else {
          latexStr += `  & ${step.valA} & ${step.valB}\n`;
        }
      }
      latexStr += "\\end{array}$$";
      steps.push(latexStr);
      
      steps.push(`HCF (Highest Common Factor) = Product of common divisors (left side)`);
      const hcfFactors = ladderSteps.slice(0, -1).map(s => s.div).join(" \\times ");
      steps.push(`$\\text{HCF} = ${hcfFactors || "1"} = ${hcf}$`);
      
      steps.push(`LCM (Least Common Multiple) = HCF $\\times$ remaining factors (bottom row)`);
      steps.push(`$\\text{LCM} = ${hcf} \\times ${currentA} \\times ${currentB} = ${lcm}$`);
      
      return {
        result: `$$\\text{LCM} = ${lcm}, \\text{HCF} = ${hcf}$$`,
        steps,
      };
    },
  },
  {
    id: "percentage_calc",
    name: "Percentage Calculator",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Calculate what percentage one number is of another. Perfect for finding test scores, profit margins, and growth rates.",
    inputs: [
      { id: "part", label: "Part", type: "number", placeholder: "45", defaultValue: "45" },
      { id: "total", label: "Total", type: "number", placeholder: "60", defaultValue: "60" },
    ],
    calculate: (values) => {
      const part = parseFloat(values.part);
      const total = parseFloat(values.total);
      if (isNaN(part) || isNaN(total)) return { result: "Invalid input" };
      return arithmeticSolver.percentage(part, total);
    },
  },
  {
    id: "ratio_simp",
    name: "Ratio Simplifier",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Simplify a ratio a:b to its simplest form by dividing by the greatest common divisor. Useful for comparing quantities and scaling recipes.",
    inputs: [
      { id: "a", label: "A", type: "number", placeholder: "15", defaultValue: "15" },
      { id: "b", label: "B", type: "number", placeholder: "25", defaultValue: "25" },
    ],
    calculate: (values) => {
      const a = parseInt(values.a);
      const b = parseInt(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid input" };
      return arithmeticSolver.ratio(a, b);
    },
  },
  {
    id: "discount_calculator",
    name: "Discount Calculator",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Calculate the final price after applying a percentage discount. A handy tool for shopping, sales analysis, and financial planning.",
    inputs: [
      { id: "price", label: "Original Price", type: "number", placeholder: "150", defaultValue: "150" },
      { id: "discount", label: "Discount (%)", type: "number", placeholder: "15", defaultValue: "15" },
    ],
    calculate: (values) => {
      const price = parseFloat(values.price);
      const discount = parseFloat(values.discount);
      
      if (isNaN(price) || isNaN(discount) || price < 0 || discount < 0 || discount > 100) {
        return { result: "Invalid input" };
      }
      
      const discountAmount = price * (discount / 100);
      const finalPrice = price - discountAmount;
      
      return {
        result: `$$${finalPrice.toFixed(2)}$$`,
        steps: [
          `Calculate final price after a $${discount}\\%$ discount on $${price}$`,
          `Step 1: Calculate the discount amount`,
          `$\\text{Discount} = ${price} \\times \\left(\\frac{${discount}}{100}\\right)$`,
          `$\\text{Discount} = ${discountAmount.toFixed(2)}$`,
          `Step 2: Subtract the discount from the original price`,
          `$\\text{Final Price} = ${price} - ${discountAmount.toFixed(2)}$`,
          `$\\text{Final Price} = ${finalPrice.toFixed(2)}$`
        ]
      };
    },
  },
  {
    id: "fraction_simplifier",
    name: "Fraction Simplifier & Mixed Number",
    category: "Basic Math",
    classLevel: "Class 8",
    description: "Simplify a fraction to its lowest terms and convert improper fractions to mixed numbers.",
    inputs: [
      { id: "n", label: "Numerator", type: "number", placeholder: "45", defaultValue: "45" },
      { id: "d", label: "Denominator", type: "number", placeholder: "10", defaultValue: "10" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      const d = parseInt(values.d);
      if (isNaN(n) || isNaN(d) || d === 0) return { result: "Invalid input" };
      
      const gcdRes = arithmeticSolver.gcd(Math.abs(n), Math.abs(d));
      const gcd = gcdRes.result;
      
      const simpN = n / gcd;
      const simpD = d / gcd;
      
      const steps = [
        `Simplify fraction: $$\\frac{${n}}{${d}}$$`,
        `Find GCD of $${Math.abs(n)}$ and $${Math.abs(d)} = ${gcd}$`,
        `Divide numerator and denominator by $${gcd}$`,
        `Simplified fraction: $$\\frac{${simpN}}{${simpD}}$$`
      ];
      
      let resultStr = `$$\\frac{${simpN}}{${simpD}}$$`;
      
      // Mixed number conversion if improper
      if (Math.abs(simpN) >= Math.abs(simpD) && Math.abs(simpD) !== 1) {
        const whole = Math.trunc(simpN / simpD);
        const remainder = Math.abs(simpN % simpD);
        const mixedStr = `${whole} \\frac{${remainder}}{${Math.abs(simpD)}}`;
        steps.push(`Convert improper fraction to mixed number:`);
        steps.push(`$${simpN} \\div ${simpD} = ${whole}$ with remainder $${remainder}$`);
        steps.push(`Mixed number: $$${mixedStr}$$`);
        resultStr += ` \\text{ or } $$${mixedStr}$$`;
      } else if (Math.abs(simpD) === 1) {
        resultStr = `$$${simpN / simpD}$$`;
        steps.push(`Since denominator is 1, the result is an integer: $${simpN / simpD}$`);
      }
      
      return {
        result: resultStr,
        steps
      };
    },
  },
];
