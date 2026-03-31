import { MathTool } from "../mathTools";
import { utilitiesSolver } from "../solvers/utilitiesSolver";

export const utilityTools: MathTool[] = [
  {
    id: "expression_evaluator",
    name: "Expression Evaluator",
    category: "Utilities",
    classLevel: "General",
    description: "Evaluate any mathematical expression, including basic arithmetic, functions, and variables. A versatile tool for quick calculations.",
    inputs: [
      { id: "expr", label: "Expression", type: "text", placeholder: "2 * (3 + 4) / 5", defaultValue: "2 * (3 + 4) / 5" },
    ],
    calculate: (values) => {
      if (!values.expr) return { result: "Expression required" };
      return utilitiesSolver.evaluateExpression(values.expr);
    },
  },
  {
    id: "base_converter",
    name: "Base/Radix Converter",
    category: "Utilities",
    classLevel: "General",
    description: "Convert numbers between Binary, Octal, Decimal, and Hexadecimal bases.",
    inputs: [
      { id: "num", label: "Number", type: "text", placeholder: "1010", defaultValue: "1010" },
      { id: "fromBase", label: "From Base", type: "select", options: [
        {label: "Binary (2)", value: "2"},
        {label: "Octal (8)", value: "8"},
        {label: "Decimal (10)", value: "10"},
        {label: "Hexadecimal (16)", value: "16"}
      ], defaultValue: "2" },
      { id: "toBase", label: "To Base", type: "select", options: [
        {label: "Binary (2)", value: "2"},
        {label: "Octal (8)", value: "8"},
        {label: "Decimal (10)", value: "10"},
        {label: "Hexadecimal (16)", value: "16"}
      ], defaultValue: "10" },
    ],
    calculate: (values) => {
      try {
        const numStr = values.num.trim();
        const fromBase = parseInt(values.fromBase);
        const toBase = parseInt(values.toBase);
        
        // Parse to decimal first
        const decimalValue = parseInt(numStr, fromBase);
        if (isNaN(decimalValue)) return { result: "Invalid number for the selected base" };
        
        // Convert to target base
        const resultStr = decimalValue.toString(toBase).toUpperCase();
        
        return {
          result: `$$${resultStr}_{${toBase}}$$`,
          steps: [
            `Convert $${numStr}_{${fromBase}}$ to base $${toBase}$`,
            `Step 1: Convert to Decimal (Base 10)`,
            `$$${numStr}_{${fromBase}} = ${decimalValue}_{10}$$`,
            `Step 2: Convert Decimal to Base ${toBase}`,
            `$$${decimalValue}_{10} = ${resultStr}_{${toBase}}$$`,
            `Result: $$${resultStr}_{${toBase}}$$`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not convert base."] };
      }
    },
  },
  {
    id: "compound_interest",
    name: "Compound Interest Calculator",
    category: "Utilities",
    classLevel: "General",
    description: "Calculate compound interest and final amount.",
    inputs: [
      { id: "principal", label: "Principal (P)", type: "number", placeholder: "1000", defaultValue: "1000" },
      { id: "rate", label: "Annual Rate (r in %)", type: "number", placeholder: "5", defaultValue: "5" },
      { id: "compounds", label: "Times Compounded per Year (n)", type: "number", placeholder: "12", defaultValue: "12" },
      { id: "years", label: "Years (t)", type: "number", placeholder: "10", defaultValue: "10" },
    ],
    calculate: (values) => {
      try {
        const P = parseFloat(values.principal);
        const rPercent = parseFloat(values.rate);
        const n = parseFloat(values.compounds);
        const t = parseFloat(values.years);
        
        if (isNaN(P) || isNaN(rPercent) || isNaN(n) || isNaN(t)) return { result: "Invalid input" };
        
        const r = rPercent / 100;
        const A = P * Math.pow(1 + r / n, n * t);
        const interest = A - P;
        
        return {
          result: `$$A = ${A.toFixed(2)}$$`,
          steps: [
            `Calculate Compound Interest`,
            `Formula: $$A = P\\left(1 + \\frac{r}{n}\\right)^{nt}$$`,
            `Where:`,
            `$P = ${P}$ (Principal)`,
            `$r = ${rPercent}\\% = ${r}$ (Annual Rate)`,
            `$n = ${n}$ (Compounds per year)`,
            `$t = ${t}$ (Years)`,
            `Substitute values:`,
            `$$A = ${P}\\left(1 + \\frac{${r}}{${n}}\\right)^{${n} \\times ${t}}$$`,
            `$$A = ${P}\\left(1 + ${r/n}\\right)^{${n * t}}$$`,
            `$$A = ${A.toFixed(2)}$$`,
            `Total Interest Earned: $$A - P = ${A.toFixed(2)} - ${P} = ${interest.toFixed(2)}$$`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not calculate interest."] };
      }
    },
  },
  {
    id: "unit_converter",
    name: "Unit Converter",
    category: "Utilities",
    classLevel: "General",
    description: "Convert between various units of measurement (e.g., length, mass, volume). Essential for science, engineering, and everyday tasks.",
    inputs: [
      { id: "value", label: "Value", type: "number", placeholder: "10", defaultValue: "10" },
      { id: "fromUnit", label: "From Unit", type: "text", placeholder: "inch", defaultValue: "inch" },
      { id: "toUnit", label: "To Unit", type: "text", placeholder: "cm", defaultValue: "cm" },
    ],
    calculate: (values) => {
      const val = parseFloat(values.value);
      if (isNaN(val) || !values.fromUnit || !values.toUnit) return { result: "Invalid input" };
      return utilitiesSolver.unitConverter(val, values.fromUnit, values.toUnit);
    },
  },
  {
    id: "scientific_calculator",
    name: "Scientific Calculator",
    category: "Utilities",
    classLevel: "General",
    description: "Evaluate complex scientific expressions involving trigonometric, logarithmic, and exponential functions.",
    inputs: [
      { id: "expr", label: "Expression", type: "text", placeholder: "log(10) + sin(pi/4)", defaultValue: "log(10) + sin(pi/4)" },
    ],
    calculate: (values) => {
      if (!values.expr) return { result: "Expression required" };
      return utilitiesSolver.evaluateExpression(values.expr);
    },
  },
  {
    id: "random_number",
    name: "Random Number Generator",
    category: "Utilities",
    classLevel: "General",
    description: "Generate a random integer or decimal number within a specified range. Useful for simulations, games, and statistical sampling.",
    inputs: [
      { id: "min", label: "Minimum", type: "number", placeholder: "1", defaultValue: "1" },
      { id: "max", label: "Maximum", type: "number", placeholder: "100", defaultValue: "100" },
      { id: "type", label: "Type", type: "select", options: [{label: "Integer", value: "int"}, {label: "Decimal", value: "float"}], defaultValue: "int" }
    ],
    calculate: (values) => {
      const min = parseFloat(values.min);
      const max = parseFloat(values.max);
      if (isNaN(min) || isNaN(max) || min >= max) return { result: "Invalid range" };
      
      let result;
      if (values.type === "int") {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
      } else {
        result = Math.random() * (max - min) + min;
      }
      
      return {
        result: `$$${result}$$`,
        steps: [
          `Generate a random ${values.type === "int" ? "integer" : "decimal"} between $${min}$ and $${max}$`,
          `Result: $${result}$`
        ]
      };
    },
  },
  {
    id: "statistics_calc",
    name: "Statistics Calculator",
    category: "Utilities",
    classLevel: "General",
    description: "Calculate descriptive statistics (mean, median, mode, standard deviation, variance) for a given dataset. Crucial for data analysis.",
    inputs: [
      { id: "data", label: "Data points (comma-separated)", type: "text", placeholder: "1, 2, 3, 4, 5", defaultValue: "1, 2, 3, 4, 5" },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const dataStr = values.data.replace(/[\[\]]/g, "");
        const data = dataStr.split(",").map((x: string) => parseFloat(x.trim())).filter((x: number) => !isNaN(x));
        
        if (data.length === 0) return { result: "No valid data points" };
        
        const mean = math.mean(data);
        const median = math.median(data);
        const mode = math.mode(data);
        const std = math.std(data);
        const variance = math.variance(data);
        
        return {
          result: `$$\\mu = ${mean}$$`,
          steps: [
            `Dataset: $[${data.join(", ")}]$`,
            `Count ($n$): $${data.length}$`,
            `Mean ($\\mu$): $${mean}$`,
            `Median: $${median}$`,
            `Mode: $${Array.isArray(mode) ? mode.join(", ") : mode}$`,
            `Standard Deviation ($\\sigma$): $${std}$`,
            `Variance ($\\sigma^2$): $${variance}$`
          ]
        };
      } catch (e) {
        return { result: "Invalid data", steps: ["Could not calculate statistics."] };
      }
    },
  },
  {
    id: "password_generator",
    name: "Random Password Generator",
    category: "Utilities",
    classLevel: "General",
    description: "Generate a secure, random password with customizable length and character types (uppercase, numbers, symbols).",
    inputs: [
      { id: "length", label: "Length", type: "number", placeholder: "12", defaultValue: "12" },
      { id: "uppercase", label: "Include Uppercase", type: "select", options: [{label: "Yes", value: "yes"}, {label: "No", value: "no"}], defaultValue: "yes" },
      { id: "numbers", label: "Include Numbers", type: "select", options: [{label: "Yes", value: "yes"}, {label: "No", value: "no"}], defaultValue: "yes" },
      { id: "symbols", label: "Include Symbols", type: "select", options: [{label: "Yes", value: "yes"}, {label: "No", value: "no"}], defaultValue: "yes" }
    ],
    calculate: (values) => {
      const length = parseInt(values.length);
      if (isNaN(length) || length < 4 || length > 128) return { result: "Length must be between 4 and 128" };
      
      const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numberChars = "0123456789";
      const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
      
      let chars = lowercaseChars;
      if (values.uppercase === "yes") chars += uppercaseChars;
      if (values.numbers === "yes") chars += numberChars;
      if (values.symbols === "yes") chars += symbolChars;
      
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
      }
      
      return {
        result: password,
        steps: [
          `Generate a random password of length ${length}`,
          `Character set used: ${chars}`,
          `Result: ${password}`
        ]
      };
    },
  },
  {
    id: "roman_numeral",
    name: "Roman Numeral Converter",
    category: "Utilities",
    classLevel: "General",
    description: "Convert standard numbers to Roman numerals and vice versa. Useful for historical dates, outlines, and clock faces.",
    inputs: [
      { id: "input", label: "Number or Roman Numeral", type: "text", placeholder: "2024", defaultValue: "2024" },
    ],
    calculate: (values) => {
      const input = values.input.trim().toUpperCase();
      if (!input) return { result: "Input required" };
      
      const isNumber = /^\d+$/.test(input);
      
      if (isNumber) {
        let num = parseInt(input);
        if (num <= 0 || num > 3999) return { result: "Number must be between 1 and 3999" };
        
        const romanMap: { [key: string]: number } = {
          M: 1000, CM: 900, D: 500, CD: 400,
          C: 100, XC: 90, L: 50, XL: 40,
          X: 10, IX: 9, V: 5, IV: 4, I: 1
        };
        
        let roman = "";
        const steps = [`Convert ${num} to Roman Numeral`];
        
        for (const key in romanMap) {
          while (num >= romanMap[key]) {
            roman += key;
            num -= romanMap[key];
            steps.push(`Add ${key} (${romanMap[key]}), remaining: ${num}`);
          }
        }
        
        steps.push(`Result: ${roman}`);
        return { result: roman, steps };
      } else {
        const romanMap: { [key: string]: number } = {
          M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1
        };
        
        let num = 0;
        const steps = [`Convert Roman Numeral ${input} to Number`];
        
        for (let i = 0; i < input.length; i++) {
          const current = romanMap[input[i]];
          const next = romanMap[input[i + 1]];
          
          if (!current) return { result: "Invalid Roman Numeral" };
          
          if (next && current < next) {
            num += next - current;
            steps.push(`Subtract ${current} from ${next} = ${next - current}, total: ${num}`);
            i++;
          } else {
            num += current;
            steps.push(`Add ${current}, total: ${num}`);
          }
        }
        
        steps.push(`Result: ${num}`);
        return { result: num.toString(), steps };
      }
    },
  },
  {
    id: "bmi_calculator",
    name: "BMI Calculator",
    category: "Utilities",
    classLevel: "General",
    description: "Calculate Body Mass Index (BMI) to estimate body fat based on height and weight. Provides standard health categories.",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", placeholder: "70", defaultValue: "70" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "175", defaultValue: "175" },
    ],
    calculate: (values) => {
      const weight = parseFloat(values.weight);
      const heightCm = parseFloat(values.height);
      
      if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
        return { result: "Invalid input" };
      }
      
      const heightM = heightCm / 100;
      const bmi = weight / (heightM * heightM);
      
      let category = "";
      if (bmi < 18.5) category = "Underweight";
      else if (bmi < 25) category = "Normal weight";
      else if (bmi < 30) category = "Overweight";
      else category = "Obese";
      
      return {
        result: `$$${bmi.toFixed(1)} \\text{ (${category})}$$`,
        steps: [
          `Calculate BMI for weight = $${weight}\\text{ kg}$, height = $${heightCm}\\text{ cm}$`,
          `Convert height to meters: $${heightCm} \\div 100 = ${heightM}\\text{ m}$`,
          `Formula: $\\text{BMI} = \\frac{\\text{weight}}{\\text{height}^2}$`,
          `$\\text{BMI} = \\frac{${weight}}{${heightM}^2}$`,
          `$\\text{BMI} = \\frac{${weight}}{${(heightM * heightM).toFixed(4)}}$`,
          `$\\text{BMI} = ${bmi.toFixed(1)}$`,
          `Category: ${category}`
        ]
      };
    },
  },
  {
    id: "scientific_notation",
    name: "Scientific Notation Converter",
    category: "Utilities",
    classLevel: "General",
    description: "Convert standard numbers to scientific notation (e.g., 0.00045 -> 4.5 × 10⁻⁴) and vice versa.",
    inputs: [
      { id: "num", label: "Number or Scientific Notation (e.g., 4.5e-4)", type: "text", placeholder: "0.00045", defaultValue: "0.00045" },
    ],
    calculate: (values) => {
      if (!values.num) return { result: "Input required" };
      return utilitiesSolver.scientificNotation(values.num);
    },
  },
];
