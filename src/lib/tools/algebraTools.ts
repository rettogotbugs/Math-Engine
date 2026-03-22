import { MathTool } from "../mathTools";
import { algebraSolver } from "../solvers/algebraSolver";

export const algebraTools: MathTool[] = [
  {
    id: "linear_eq",
    name: "Linear Equation Solver",
    category: "Algebra",
    description: "Solve linear equations step-by-step and understand how variables are isolated. Essential for finding unknown values in proportional relationships.",
    inputs: [
      {
        id: "eq",
        label: "Equation",
        type: "text",
        placeholder: "e.g., 2x + 3 = 7",
      },
    ],
    calculate: (values) => algebraSolver.solveLinear(values.eq),
  },
  {
    id: "quadratic_eq",
    name: "Quadratic Equation Solver",
    category: "Algebra",
    description: "Find roots of quadratic equations using the discriminant method with detailed steps. Crucial for physics, engineering, and optimization problems.",
    inputs: [
      { id: "a", label: "a", type: "number", placeholder: "1" },
      { id: "b", label: "b", type: "number", placeholder: "-3" },
      { id: "c", label: "c", type: "number", placeholder: "2" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const c = parseFloat(values.c);
      if (isNaN(a) || isNaN(b) || isNaN(c)) return { result: "Invalid input" };
      return algebraSolver.solveQuadratic(a, b, c);
    },
  },
  {
    id: "expand_expr",
    name: "Expression Expansion",
    category: "Algebra",
    description: "Expand complex algebraic expressions into their standard polynomial form. Useful for simplifying equations before solving or graphing.",
    inputs: [
      { id: "expr", label: "Expression", type: "text", placeholder: "(x+2)^2" },
    ],
    calculate: (values) => algebraSolver.expandExpression(values.expr),
  },
  {
    id: "system_2x2",
    name: "System of Linear Equations (2x2)",
    category: "Algebra",
    description: "Solve a system of two linear equations simultaneously. Perfect for finding intersection points of lines and solving multi-variable word problems.",
    inputs: [
      { id: "a1", label: "a1", type: "number", placeholder: "2" },
      { id: "b1", label: "b1", type: "number", placeholder: "3" },
      { id: "c1", label: "c1", type: "number", placeholder: "7" },
      { id: "a2", label: "a2", type: "number", placeholder: "1" },
      { id: "b2", label: "b2", type: "number", placeholder: "-1" },
      { id: "c2", label: "c2", type: "number", placeholder: "1" },
    ],
    calculate: (values) => {
      const a1 = parseFloat(values.a1);
      const b1 = parseFloat(values.b1);
      const c1 = parseFloat(values.c1);
      const a2 = parseFloat(values.a2);
      const b2 = parseFloat(values.b2);
      const c2 = parseFloat(values.c2);
      if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(a2) || isNaN(b2) || isNaN(c2)) return { result: "Invalid input" };
      return algebraSolver.solveSystem2x2(a1, b1, c1, a2, b2, c2);
    },
  },
  {
    id: "polynomial_eval",
    name: "Polynomial Evaluator",
    category: "Algebra",
    description: "Evaluate a polynomial function for a specific value of x. Helps in plotting graphs and finding function outputs quickly.",
    inputs: [
      { id: "poly", label: "Polynomial P(x)", type: "text", placeholder: "x^2 + 2x + 1" },
      { id: "xVal", label: "Value of x", type: "number", placeholder: "3" },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const x = parseFloat(values.xVal);
        const expr = math.parse(values.poly);
        const result = expr.evaluate({ x });
        return {
          result: result.toString(),
          steps: [
            `Evaluate P(x) = ${values.poly} at x = ${x}`,
            `Substitute x = ${x}: P(${x}) = ${values.poly.replace(/x/g, `(${x})`)}`,
            `Result: ${result}`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not evaluate polynomial."] };
      }
    },
  },
  {
    id: "algebraic_identities",
    name: "Algebraic Identities",
    category: "Algebra",
    description: "Calculate standard algebraic identities like (a+b)² or a²-b². A great reference tool for factoring and expanding expressions.",
    inputs: [
      { id: "a", label: "a", type: "number", placeholder: "3" },
      { id: "b", label: "b", type: "number", placeholder: "4" },
      {
        id: "identity",
        label: "Identity",
        type: "select",
        options: [
          { label: "(a+b)²", value: "aplusb2" },
          { label: "(a-b)²", value: "aminusb2" },
          { label: "a²-b²", value: "a2minusb2" },
          { label: "(a+b)³", value: "aplusb3" },
          { label: "(a-b)³", value: "aminusb3" },
        ],
      },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b)) return { result: "Invalid input" };
      
      let res = 0;
      let steps = [];
      switch (values.identity) {
        case "aplusb2":
          res = Math.pow(a + b, 2);
          steps = [
            `Identity: (a+b)² = a² + 2ab + b²`,
            `(${a}+${b})² = ${a}² + 2(${a})(${b}) + ${b}²`,
            `= ${a*a} + ${2*a*b} + ${b*b}`,
            `= ${res}`
          ];
          break;
        case "aminusb2":
          res = Math.pow(a - b, 2);
          steps = [
            `Identity: (a-b)² = a² - 2ab + b²`,
            `(${a}-${b})² = ${a}² - 2(${a})(${b}) + ${b}²`,
            `= ${a*a} - ${2*a*b} + ${b*b}`,
            `= ${res}`
          ];
          break;
        case "a2minusb2":
          res = Math.pow(a, 2) - Math.pow(b, 2);
          steps = [
            `Identity: a² - b² = (a+b)(a-b)`,
            `${a}² - ${b}² = (${a}+${b})(${a}-${b})`,
            `= (${a+b})(${a-b})`,
            `= ${res}`
          ];
          break;
        case "aplusb3":
          res = Math.pow(a + b, 3);
          steps = [
            `Identity: (a+b)³ = a³ + 3a²b + 3ab² + b³`,
            `(${a}+${b})³ = ${a}³ + 3(${a})²(${b}) + 3(${a})(${b})² + ${b}³`,
            `= ${Math.pow(a,3)} + ${3*Math.pow(a,2)*b} + ${3*a*Math.pow(b,2)} + ${Math.pow(b,3)}`,
            `= ${res}`
          ];
          break;
        case "aminusb3":
          res = Math.pow(a - b, 3);
          steps = [
            `Identity: (a-b)³ = a³ - 3a²b + 3ab² - b³`,
            `(${a}-${b})³ = ${a}³ - 3(${a})²(${b}) + 3(${a})(${b})² - ${b}³`,
            `= ${Math.pow(a,3)} - ${3*Math.pow(a,2)*b} + ${3*a*Math.pow(b,2)} - ${Math.pow(b,3)}`,
            `= ${res}`
          ];
          break;
      }
      return { result: res.toString(), steps };
    },
  },
  {
    id: "binomial_theorem",
    name: "Binomial Theorem Expansion",
    category: "Algebra",
    description: "Expand expressions of the form (x + y)^n using binomial coefficients. Essential for advanced algebra, probability, and calculus.",
    inputs: [
      { id: "n", label: "Power (n)", type: "number", placeholder: "e.g., 3" },
    ],
    calculate: (values) => {
      const n = parseInt(values.n);
      if (isNaN(n) || n < 0 || n > 10) return { result: "Invalid input (0 <= n <= 10)" };
      
      const factorial = (num: number): number => {
        if (num === 0 || num === 1) return 1;
        let result = 1;
        for (let i = 2; i <= num; i++) result *= i;
        return result;
      };
      
      const nCr = (n: number, r: number): number => {
        return factorial(n) / (factorial(r) * factorial(n - r));
      };
      
      let expansion = "";
      const steps = [
        `Expand (x + y)^${n} using the Binomial Theorem`,
        `Formula: (x + y)^n = Σ (nCr * x^(n-r) * y^r) from r=0 to n`
      ];
      
      for (let r = 0; r <= n; r++) {
        const coeff = nCr(n, r);
        const xPower = n - r;
        const yPower = r;
        
        let term = "";
        if (coeff !== 1) term += coeff;
        
        if (xPower > 0) {
          term += "x";
          if (xPower > 1) term += `^${xPower}`;
        }
        
        if (yPower > 0) {
          term += "y";
          if (yPower > 1) term += `^${yPower}`;
        }
        
        if (term === "") term = "1";
        
        expansion += (r === 0 ? "" : " + ") + term;
        steps.push(`Term ${r + 1} (r=${r}): ${coeff} * x^${xPower} * y^${yPower} = ${term}`);
      }
      
      steps.push(`Final Expansion: ${expansion}`);
      
      return {
        result: expansion,
        steps
      };
    },
  },
  {
    id: "polynomial_add_sub",
    name: "Polynomial Addition/Subtraction",
    category: "Algebra",
    description: "Add or subtract two polynomials by combining like terms. A fundamental operation for simplifying complex algebraic expressions.",
    inputs: [
      { id: "p1", label: "Polynomial 1", type: "text", placeholder: "e.g., 2x^2 + 3x + 1" },
      {
        id: "op",
        label: "Operation",
        type: "select",
        options: [
          { label: "+", value: "+" },
          { label: "-", value: "-" },
        ],
      },
      { id: "p2", label: "Polynomial 2", type: "text", placeholder: "e.g., x^2 - 2x + 5" },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const exprStr = `(${values.p1}) ${values.op} (${values.p2})`;
        const simplified = math.simplify(exprStr).toString();
        return {
          result: simplified,
          steps: [
            `Expression: ${exprStr}`,
            `Simplify by combining like terms.`,
            `Result: ${simplified}`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not parse polynomials."] };
      }
    },
  },
  {
    id: "polynomial_mult",
    name: "Polynomial Multiplication",
    category: "Algebra",
    description: "Multiply two polynomials using the distributive property. Useful for finding areas in geometry and expanding algebraic models.",
    inputs: [
      { id: "p1", label: "Polynomial 1", type: "text", placeholder: "e.g., x + 2" },
      { id: "p2", label: "Polynomial 2", type: "text", placeholder: "e.g., x - 3" },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const exprStr = `(${values.p1}) * (${values.p2})`;
        // math.simplify doesn't always expand, so we can use rationalization or expand
        const expanded = math.rationalize(exprStr).toString();
        return {
          result: expanded,
          steps: [
            `Expression: ${exprStr}`,
            `Expand by multiplying each term.`,
            `Result: ${expanded}`
          ]
        };
      } catch (e) {
        return { result: "Invalid input", steps: ["Could not parse polynomials."] };
      }
    },
  },
  {
    id: "arithmetic_progression",
    name: "Arithmetic Progression (AP)",
    category: "Algebra",
    description: "Find the nth term and sum of an arithmetic sequence. Essential for calculating linear growth, depreciation, and simple interest.",
    inputs: [
      { id: "a", label: "First term (a)", type: "number", placeholder: "e.g., 2" },
      { id: "d", label: "Common difference (d)", type: "number", placeholder: "e.g., 3" },
      { id: "n", label: "Number of terms (n)", type: "number", placeholder: "e.g., 10" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const d = parseFloat(values.d);
      const n = parseInt(values.n);
      if (isNaN(a) || isNaN(d) || isNaN(n) || n <= 0) return { result: "Invalid input" };
      
      const nthTerm = a + (n - 1) * d;
      const sum = (n / 2) * (2 * a + (n - 1) * d);
      
      return {
        result: `nth term = ${nthTerm}, Sum = ${sum}`,
        steps: [
          `nth term formula: a_n = a + (n-1)d`,
          `a_${n} = ${a} + (${n}-1)(${d}) = ${nthTerm}`,
          `Sum formula: S_n = (n/2)[2a + (n-1)d]`,
          `S_${n} = (${n}/2)[2(${a}) + (${n}-1)(${d})] = ${sum}`
        ]
      };
    },
  },
  {
    id: "geometric_progression",
    name: "Geometric Progression (GP)",
    category: "Algebra",
    description: "Find the nth term and sum of a geometric sequence. Crucial for modeling exponential growth, compound interest, and population dynamics.",
    inputs: [
      { id: "a", label: "First term (a)", type: "number", placeholder: "e.g., 2" },
      { id: "r", label: "Common ratio (r)", type: "number", placeholder: "e.g., 3" },
      { id: "n", label: "Number of terms (n)", type: "number", placeholder: "e.g., 5" },
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const r = parseFloat(values.r);
      const n = parseInt(values.n);
      if (isNaN(a) || isNaN(r) || isNaN(n) || n <= 0) return { result: "Invalid input" };
      
      const nthTerm = a * Math.pow(r, n - 1);
      let sum = 0;
      let sumStep = "";
      if (r === 1) {
        sum = n * a;
        sumStep = `S_${n} = n * a = ${n} * ${a} = ${sum}`;
      } else {
        sum = a * (Math.pow(r, n) - 1) / (r - 1);
        sumStep = `S_${n} = a(r^n - 1)/(r - 1) = ${a}(${r}^${n} - 1)/(${r} - 1) = ${sum}`;
      }
      
      return {
        result: `nth term = ${nthTerm}, Sum = ${sum}`,
        steps: [
          `nth term formula: a_n = a * r^(n-1)`,
          `a_${n} = ${a} * ${r}^(${n}-1) = ${nthTerm}`,
          `Sum formula: S_n = a(r^n - 1)/(r - 1) (for r ≠ 1)`,
          sumStep
        ]
      };
    },
  }
];
