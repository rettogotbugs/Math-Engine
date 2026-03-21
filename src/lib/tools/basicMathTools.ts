import { MathTool } from "../mathTools";
import { arithmeticSolver } from "../solvers/arithmeticSolver";

export const basicMathTools: MathTool[] = [
  {
    id: "basic_add",
    name: "Addition & Subtraction",
    category: "Basic Math",
    description: "Add or subtract two numbers with steps.",
    inputs: [
      { id: "a", label: "Number 1", type: "number", placeholder: "e.g., 15" },
      {
        id: "op",
        label: "Operation",
        type: "select",
        options: [
          { label: "+", value: "+" },
          { label: "-", value: "-" },
        ],
      },
      { id: "b", label: "Number 2", type: "number", placeholder: "e.g., 7" },
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
    description: "Multiply or divide two numbers with steps.",
    inputs: [
      { id: "a", label: "Number 1", type: "number", placeholder: "e.g., 12" },
      {
        id: "op",
        label: "Operation",
        type: "select",
        options: [
          { label: "×", value: "*" },
          { label: "÷", value: "/" },
        ],
      },
      { id: "b", label: "Number 2", type: "number", placeholder: "e.g., 4" },
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
    description: "Add two fractions step-by-step.",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", placeholder: "1" },
      { id: "d1", label: "Denominator 1", type: "number", placeholder: "2" },
      { id: "n2", label: "Numerator 2", type: "number", placeholder: "1" },
      { id: "d2", label: "Denominator 2", type: "number", placeholder: "3" },
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
    description: "Subtract two fractions step-by-step.",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", placeholder: "1" },
      { id: "d1", label: "Denominator 1", type: "number", placeholder: "2" },
      { id: "n2", label: "Numerator 2", type: "number", placeholder: "1" },
      { id: "d2", label: "Denominator 2", type: "number", placeholder: "3" },
    ],
    calculate: (values) => {
      const n1 = parseInt(values.n1);
      const d1 = parseInt(values.d1);
      const n2 = parseInt(values.n2);
      const d2 = parseInt(values.d2);
      if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0)
        return { result: "Invalid input" };
      const lcm = arithmeticSolver.lcm(d1, d2).result;
      const num1 = n1 * (Number(lcm) / d1);
      const num2 = n2 * (Number(lcm) / d2);
      const resNum = num1 - num2;
      return {
        result: `${resNum}/${lcm}`,
        steps: [
          `Find LCM of ${d1} and ${d2} = ${lcm}`,
          `Convert fractions: ${num1}/${lcm} - ${num2}/${lcm}`,
          `Subtract numerators: ${num1} - ${num2} = ${resNum}`,
          `Result: ${resNum}/${lcm}`
        ]
      };
    },
  },
  {
    id: "fraction_mult",
    name: "Fraction Multiplication",
    category: "Basic Math",
    description: "Multiply two fractions step-by-step.",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", placeholder: "1" },
      { id: "d1", label: "Denominator 1", type: "number", placeholder: "2" },
      { id: "n2", label: "Numerator 2", type: "number", placeholder: "1" },
      { id: "d2", label: "Denominator 2", type: "number", placeholder: "3" },
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
        result: `${resNum}/${resDen}`,
        steps: [
          `Multiply numerators: ${n1} × ${n2} = ${resNum}`,
          `Multiply denominators: ${d1} × ${d2} = ${resDen}`,
          `Result: ${resNum}/${resDen}`
        ]
      };
    },
  },
  {
    id: "fraction_div",
    name: "Fraction Division",
    category: "Basic Math",
    description: "Divide two fractions step-by-step.",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", placeholder: "1" },
      { id: "d1", label: "Denominator 1", type: "number", placeholder: "2" },
      { id: "n2", label: "Numerator 2", type: "number", placeholder: "1" },
      { id: "d2", label: "Denominator 2", type: "number", placeholder: "3" },
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
        result: `${resNum}/${resDen}`,
        steps: [
          `Multiply by reciprocal of second fraction: (${n1}/${d1}) × (${d2}/${n2})`,
          `Multiply numerators: ${n1} × ${d2} = ${resNum}`,
          `Multiply denominators: ${d1} × ${n2} = ${resDen}`,
          `Result: ${resNum}/${resDen}`
        ]
      };
    },
  },
  {
    id: "decimal_to_fraction",
    name: "Decimal to Fraction",
    category: "Basic Math",
    description: "Convert a decimal number to a fraction.",
    inputs: [
      { id: "dec", label: "Decimal", type: "number", placeholder: "0.75" },
    ],
    calculate: (values) => {
      const dec = parseFloat(values.dec);
      if (isNaN(dec)) return { result: "Invalid input" };
      
      const len = dec.toString().split('.')[1]?.length || 0;
      const den = Math.pow(10, len);
      const num = dec * den;
      const gcd = Number(arithmeticSolver.gcd(num, den).result);
      
      return {
        result: `${num/gcd}/${den/gcd}`,
        steps: [
          `Decimal: ${dec}`,
          `Multiply by 10^${len}: ${num}/${den}`,
          `Find GCD of ${num} and ${den} = ${gcd}`,
          `Divide numerator and denominator by ${gcd}`,
          `Result: ${num/gcd}/${den/gcd}`
        ]
      };
    },
  },
  {
    id: "fraction_to_decimal",
    name: "Fraction to Decimal",
    category: "Basic Math",
    description: "Convert a fraction to a decimal number.",
    inputs: [
      { id: "n", label: "Numerator", type: "number", placeholder: "3" },
      { id: "d", label: "Denominator", type: "number", placeholder: "4" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      const d = parseInt(values.d);
      if (isNaN(n) || isNaN(d) || d === 0) return { result: "Invalid input" };
      const res = n / d;
      return {
        result: res.toString(),
        steps: [
          `Divide numerator by denominator: ${n} ÷ ${d}`,
          `Result: ${res}`
        ]
      };
    },
  },
  {
    id: "decimal_to_percent",
    name: "Decimal to Percentage",
    category: "Basic Math",
    description: "Convert a decimal number to a percentage.",
    inputs: [
      { id: "dec", label: "Decimal", type: "number", placeholder: "0.75" },
    ],
    calculate: (values) => {
      const dec = parseFloat(values.dec);
      if (isNaN(dec)) return { result: "Invalid input" };
      const res = dec * 100;
      return {
        result: `${res}%`,
        steps: [
          `Multiply decimal by 100: ${dec} × 100`,
          `Result: ${res}%`
        ]
      };
    },
  },
  {
    id: "percent_to_decimal",
    name: "Percentage to Decimal",
    category: "Basic Math",
    description: "Convert a percentage to a decimal number.",
    inputs: [
      { id: "pct", label: "Percentage", type: "number", placeholder: "75" },
    ],
    calculate: (values) => {
      const pct = parseFloat(values.pct);
      if (isNaN(pct)) return { result: "Invalid input" };
      const res = pct / 100;
      return {
        result: res.toString(),
        steps: [
          `Divide percentage by 100: ${pct} ÷ 100`,
          `Result: ${res}`
        ]
      };
    },
  },
  {
    id: "lcm_hcf",
    name: "LCM & HCF",
    category: "Basic Math",
    description: "Find the Least Common Multiple and Highest Common Factor.",
    inputs: [
      { id: "a", label: "Number 1", type: "number", placeholder: "12" },
      { id: "b", label: "Number 2", type: "number", placeholder: "18" },
    ],
    calculate: (values) => {
      const a = parseInt(values.a);
      const b = parseInt(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid input" };
      const lcmRes = arithmeticSolver.lcm(a, b);
      const hcfRes = arithmeticSolver.gcd(a, b);
      return {
        result: `LCM = ${lcmRes.result}, HCF = ${hcfRes.result}`,
        steps: [...hcfRes.steps, ...lcmRes.steps],
      };
    },
  },
  {
    id: "percentage_calc",
    name: "Percentage Calculator",
    category: "Basic Math",
    description: "Calculate what percentage one number is of another.",
    inputs: [
      { id: "part", label: "Part", type: "number", placeholder: "25" },
      { id: "total", label: "Total", type: "number", placeholder: "100" },
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
    description: "Simplify a ratio a:b to its simplest form.",
    inputs: [
      { id: "a", label: "A", type: "number", placeholder: "12" },
      { id: "b", label: "B", type: "number", placeholder: "16" },
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
    description: "Calculate the final price after applying a discount.",
    inputs: [
      { id: "price", label: "Original Price", type: "number", placeholder: "e.g., 100" },
      { id: "discount", label: "Discount (%)", type: "number", placeholder: "e.g., 20" },
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
        result: finalPrice.toFixed(2),
        steps: [
          `Calculate final price after a ${discount}% discount on ${price}`,
          `Step 1: Calculate the discount amount`,
          `Discount = ${price} * (${discount} / 100)`,
          `Discount = ${discountAmount.toFixed(2)}`,
          `Step 2: Subtract the discount from the original price`,
          `Final Price = ${price} - ${discountAmount.toFixed(2)}`,
          `Final Price = ${finalPrice.toFixed(2)}`
        ]
      };
    },
  },
];
