import { MathTool } from "../mathTools";
import {
  solveMatrixOperations,
  solveVectorOperations,
} from "../solvers/advancedSolver";
import { calculusSolver } from "../solvers/calculusSolver";

export const advancedMathTools: MathTool[] = [
  {
    id: "matrix_ops",
    name: "Matrix Operations",
    category: "Advanced Math (JEE Level)",
    description:
      "Perform operations on matrices like addition, subtraction, multiplication, determinant, inverse, and transpose. Essential for linear algebra.",
    inputs: [
      {
        id: "matrixA",
        label: "Matrix A",
        type: "text",
        placeholder: "[[1, 2], [3, 4]]",
      },
      {
        id: "op",
        label: "Operation",
        type: "select",
        options: [
          { label: "A + B", value: "add" },
          { label: "A - B", value: "subtract" },
          { label: "A × B", value: "multiply" },
          { label: "Determinant |A|", value: "determinant" },
          { label: "Inverse A⁻¹", value: "inverse" },
          { label: "Transpose Aᵀ", value: "transpose" },
          { label: "Eigenvalues", value: "eigenvalues" },
        ],
      },
      {
        id: "matrixB",
        label: "Matrix B (if needed)",
        type: "text",
        placeholder: "[[5, 6], [7, 8]]",
      },
    ],
    calculate: (values) => {
      if (!values.matrixA) return { result: "Matrix A is required" };
      return solveMatrixOperations(values.matrixA, values.matrixB, values.op);
    },
  },
  {
    id: "vector_ops",
    name: "Vector Operations",
    category: "Advanced Math (JEE Level)",
    description:
      "Perform operations on vectors including dot product, cross product, magnitude, and projection. Crucial for physics and 3D geometry.",
    inputs: [
      {
        id: "vectorA",
        label: "Vector A",
        type: "text",
        placeholder: "[1, 2, 3]",
      },
      {
        id: "op",
        label: "Operation",
        type: "select",
        options: [
          { label: "A + B", value: "add" },
          { label: "A - B", value: "subtract" },
          { label: "Dot Product A·B", value: "dot" },
          { label: "Cross Product A×B", value: "cross" },
          { label: "Magnitude |A|", value: "magnitude" },
          { label: "Projection of A on B", value: "projection" },
        ],
      },
      {
        id: "vectorB",
        label: "Vector B (if needed)",
        type: "text",
        placeholder: "[4, 5, 6]",
      },
    ],
    calculate: (values) => {
      if (!values.vectorA) return { result: "Vector A is required" };
      return solveVectorOperations(values.vectorA, values.vectorB, values.op);
    },
  },
  {
    id: "complex_arithmetic",
    name: "Complex Numbers",
    category: "Advanced Math (JEE Level)",
    description: "Evaluate expressions involving complex numbers (using 'i'). Useful for electrical engineering and advanced algebra.",
    inputs: [
      {
        id: "expr",
        label: "Expression",
        type: "text",
        placeholder: "e.g., (2+3i)*(4-i)",
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const result = math.evaluate(values.expr);
        return {
          result: result.toString(),
          steps: [
            `Evaluate complex expression: ${values.expr}`,
            `Result: ${result.toString()}`,
          ],
        };
      } catch (e) {
        return { result: "Error evaluating complex expression" };
      }
    },
  },
  {
    id: "advanced_derivative",
    name: "Advanced Differentiation",
    category: "Advanced Math (JEE Level)",
    description: "Differentiate complex functions involving chain rule, product rule, and quotient rule. Essential for calculus problems.",
    inputs: [
      {
        id: "expr",
        label: "Function f(x)",
        type: "text",
        placeholder: "e.g., sin(x^2)*exp(x)",
      },
    ],
    calculate: (values) => calculusSolver.differentiate(values.expr, "x"),
  },
  {
    id: "matrix_trace",
    name: "Matrix Trace",
    category: "Advanced Math (JEE Level)",
    description: "Calculate the trace (sum of diagonal elements) of a square matrix. Used in linear algebra and tensor analysis.",
    inputs: [
      {
        id: "matrix",
        label: "Matrix (JSON format)",
        type: "text",
        placeholder: "[[1, 2], [3, 4]]",
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const mat = math.matrix(JSON.parse(values.matrix));
        const size = mat.size();
        if (size.length !== 2 || size[0] !== size[1]) {
          return { result: "Matrix must be square" };
        }
        
        let trace = 0;
        const steps = [`Calculate the trace of the matrix:`, `Trace = sum of diagonal elements`];
        let sumStr = "";
        
        for (let i = 0; i < size[0]; i++) {
          const val = mat.get([i, i]);
          trace += val;
          sumStr += (i === 0 ? "" : " + ") + val;
        }
        
        steps.push(`Trace = ${sumStr} = ${trace}`);
        
        return {
          result: trace.toString(),
          steps
        };
      } catch (e) {
        return { result: "Invalid matrix format" };
      }
    },
  },
  {
    id: "matrix_determinant",
    name: "Matrix Determinant",
    category: "Advanced Math (JEE Level)",
    description: "Calculate the determinant of a square matrix. Crucial for finding matrix inverses and solving systems of linear equations.",
    inputs: [
      {
        id: "matrix",
        label: "Matrix (JSON format)",
        type: "text",
        placeholder: "[[1, 2], [3, 4]]",
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const mat = math.matrix(JSON.parse(values.matrix));
        const det = math.det(mat);
        return {
          result: det.toString(),
          steps: [`Calculate the determinant of the matrix`, `|A| = ${det}`],
        };
      } catch (e) {
        return { result: "Invalid matrix format" };
      }
    },
  },
  {
    id: "matrix_inverse",
    name: "Matrix Inverse",
    category: "Advanced Math (JEE Level)",
    description: "Calculate the inverse of a square matrix. Used to solve matrix equations of the form AX = B.",
    inputs: [
      {
        id: "matrix",
        label: "Matrix (JSON format)",
        type: "text",
        placeholder: "[[1, 2], [3, 4]]",
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const mat = math.matrix(JSON.parse(values.matrix));
        const inv = math.inv(mat);
        return {
          result: JSON.stringify(inv.toArray()),
          steps: [`Calculate the inverse of the matrix`, `A⁻¹ = ${JSON.stringify(inv.toArray())}`],
        };
      } catch (e) {
        return { result: "Invalid matrix format or singular matrix" };
      }
    },
  },
  {
    id: "matrix_eigenvalues",
    name: "Matrix Eigenvalues",
    category: "Advanced Math (JEE Level)",
    description: "Calculate the eigenvalues of a square matrix. Important in differential equations, stability analysis, and quantum mechanics.",
    inputs: [
      {
        id: "matrix",
        label: "Matrix (JSON format)",
        type: "text",
        placeholder: "[[1, 2], [3, 4]]",
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const mat = math.matrix(JSON.parse(values.matrix));
        const eigs = math.eigs(mat);
        return {
          result: JSON.stringify(eigs.values.toArray()),
          steps: [`Calculate the eigenvalues of the matrix`, `λ = ${JSON.stringify(eigs.values.toArray())}`],
        };
      } catch (e) {
        return { result: "Invalid matrix format" };
      }
    },
  },
];
