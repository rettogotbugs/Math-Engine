import { MathTool } from "../mathTools";
import { utilitiesSolver } from "../solvers/utilitiesSolver";

export const utilityTools: MathTool[] = [
  {
    id: "expression_evaluator",
    name: "Expression Evaluator",
    category: "Utilities",
    description: "Evaluate any mathematical expression, including basic arithmetic, functions, and variables. A versatile tool for quick calculations.",
    inputs: [
      { id: "expr", label: "Expression", type: "text", placeholder: "2 * (3 + 4) / 5" },
    ],
    calculate: (values) => {
      if (!values.expr) return { result: "Expression required" };
      return utilitiesSolver.evaluateExpression(values.expr);
    },
  },
  {
    id: "unit_converter",
    name: "Unit Converter",
    category: "Utilities",
    description: "Convert between various units of measurement (e.g., length, mass, volume). Essential for science, engineering, and everyday tasks.",
    inputs: [
      { id: "value", label: "Value", type: "number", placeholder: "10" },
      { id: "fromUnit", label: "From Unit", type: "text", placeholder: "inch" },
      { id: "toUnit", label: "To Unit", type: "text", placeholder: "cm" },
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
    description: "Evaluate complex scientific expressions involving trigonometric, logarithmic, and exponential functions.",
    inputs: [
      { id: "expr", label: "Expression", type: "text", placeholder: "log(10) + sin(pi/4)" },
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
    description: "Generate a random integer or decimal number within a specified range. Useful for simulations, games, and statistical sampling.",
    inputs: [
      { id: "min", label: "Minimum", type: "number", placeholder: "1" },
      { id: "max", label: "Maximum", type: "number", placeholder: "100" },
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
        result: result.toString(),
        steps: [
          `Generate a random ${values.type === "int" ? "integer" : "decimal"} between ${min} and ${max}`,
          `Result: ${result}`
        ]
      };
    },
  },
  {
    id: "statistics_calc",
    name: "Statistics Calculator",
    category: "Utilities",
    description: "Calculate descriptive statistics (mean, median, mode, standard deviation, variance) for a given dataset. Crucial for data analysis.",
    inputs: [
      { id: "data", label: "Data points (comma-separated)", type: "text", placeholder: "1, 2, 3, 4, 5" },
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
          result: `Mean: ${mean}`,
          steps: [
            `Dataset: [${data.join(", ")}]`,
            `Count (n): ${data.length}`,
            `Mean (μ): ${mean}`,
            `Median: ${median}`,
            `Mode: ${Array.isArray(mode) ? mode.join(", ") : mode}`,
            `Standard Deviation (σ): ${std}`,
            `Variance (σ²): ${variance}`
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
    description: "Generate a secure, random password with customizable length and character types (uppercase, numbers, symbols).",
    inputs: [
      { id: "length", label: "Length", type: "number", placeholder: "12" },
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
    description: "Convert standard numbers to Roman numerals and vice versa. Useful for historical dates, outlines, and clock faces.",
    inputs: [
      { id: "input", label: "Number or Roman Numeral", type: "text", placeholder: "e.g., 2024 or MMXXIV" },
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
    description: "Calculate Body Mass Index (BMI) to estimate body fat based on height and weight. Provides standard health categories.",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", placeholder: "e.g., 70" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "e.g., 175" },
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
        result: `${bmi.toFixed(1)} (${category})`,
        steps: [
          `Calculate BMI for weight = ${weight} kg, height = ${heightCm} cm`,
          `Convert height to meters: ${heightCm} / 100 = ${heightM} m`,
          `Formula: BMI = weight / height²`,
          `BMI = ${weight} / (${heightM})²`,
          `BMI = ${weight} / ${(heightM * heightM).toFixed(4)}`,
          `BMI = ${bmi.toFixed(1)}`,
          `Category: ${category}`
        ]
      };
    },
  },
];
