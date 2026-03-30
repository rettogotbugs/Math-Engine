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
    classLevel: "Class 11-12",
    description:
      "Perform operations on matrices like addition, subtraction, multiplication, determinant, inverse, and transpose. Essential for linear algebra.",
    inputs: [
      {
        id: "matrixA",
        label: "Matrix A",
        type: "text",
        placeholder: "[[1, 2], [3, 4]]",
        defaultValue: "[[1, 2], [3, 4]]"
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
        defaultValue: "multiply"
      },
      {
        id: "matrixB",
        label: "Matrix B (if needed)",
        type: "text",
        placeholder: "[[5, 6], [7, 8]]",
        defaultValue: "[[5, 6], [7, 8]]"
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
    classLevel: "Class 11-12",
    description:
      "Perform operations on vectors including dot product, cross product, magnitude, and projection. Crucial for physics and 3D geometry.",
    inputs: [
      {
        id: "vectorA",
        label: "Vector A",
        type: "text",
        placeholder: "[1, -2, 3]",
        defaultValue: "[1, -2, 3]"
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
        defaultValue: "cross"
      },
      {
        id: "vectorB",
        label: "Vector B (if needed)",
        type: "text",
        placeholder: "[4, 5, -6]",
        defaultValue: "[4, 5, -6]"
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
    classLevel: "Class 11-12",
    description: "Evaluate expressions involving complex numbers (using 'i'). Useful for electrical engineering and advanced algebra.",
    inputs: [
      {
        id: "expr",
        label: "Expression",
        type: "text",
        placeholder: "(2+3i)/(4-i)",
        defaultValue: "(2+3i)/(4-i)"
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const result = math.evaluate(values.expr);
        return {
          result: `$$${math.parse(result.toString()).toTex()}$$`,
          steps: [
            `Evaluate complex expression: $${math.parse(values.expr).toTex()}$`,
            `Result: $$${math.parse(result.toString()).toTex()}$$`,
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
    classLevel: "Class 11-12",
    description: "Differentiate complex functions involving chain rule, product rule, and quotient rule. Essential for calculus problems.",
    inputs: [
      {
        id: "expr",
        label: "Function f(x)",
        type: "text",
        placeholder: "sin(x^2)*exp(x)",
        defaultValue: "sin(x^2)*exp(x)"
      },
    ],
    calculate: (values) => calculusSolver.differentiate(values.expr, "x"),
  },
  {
    id: "matrix_trace",
    name: "Matrix Trace",
    category: "Advanced Math (JEE Level)",
    classLevel: "Class 11-12",
    description: "Calculate the trace (sum of diagonal elements) of a square matrix. Used in linear algebra and tensor analysis.",
    inputs: [
      {
        id: "matrix",
        label: "Matrix (JSON format)",
        type: "text",
        placeholder: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        defaultValue: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]"
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const mat = math.evaluate(values.matrix);
        const size = mat.size();
        if (size.length !== 2 || size[0] !== size[1]) {
          return { result: "Matrix must be square" };
        }
        
        let trace = 0;
        const steps = [`Calculate the trace of the matrix:`, `$\\text{Trace} = \\text{sum of diagonal elements}$`];
        let sumStr = "";
        
        for (let i = 0; i < size[0]; i++) {
          const val = mat.get([i, i]);
          trace += val;
          sumStr += (i === 0 ? "" : " + ") + val;
        }
        
        steps.push(`$\\text{Trace} = ${sumStr} = ${trace}$`);
        
        return {
          result: `$$${trace}$$`,
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
    classLevel: "Class 11-12",
    description: "Calculate the determinant of a square matrix. Crucial for finding matrix inverses and solving systems of linear equations.",
    inputs: [
      {
        id: "matrix",
        label: "Matrix (JSON format)",
        type: "text",
        placeholder: "[[1, 2, 3], [0, 1, 4], [5, 6, 0]]",
        defaultValue: "[[1, 2, 3], [0, 1, 4], [5, 6, 0]]"
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const mat = math.evaluate(values.matrix);
        const det = math.det(mat);
        return {
          result: `$$${det}$$`,
          steps: [`Calculate the determinant of the matrix.`, `The determinant is $|A| = ${det}$`],
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
    classLevel: "Class 11-12",
    description: "Calculate the inverse of a square matrix. Used to solve matrix equations of the form AX = B.",
    inputs: [
      {
        id: "matrix",
        label: "Matrix (JSON format)",
        type: "text",
        placeholder: "[[4, 7], [2, 6]]",
        defaultValue: "[[4, 7], [2, 6]]"
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const mat = math.evaluate(values.matrix);
        const inv = math.inv(mat);
        return {
          result: `$$${math.parse(JSON.stringify(inv.toArray())).toTex()}$$`,
          steps: [`Calculate the inverse of the matrix.`, `The inverse is $$A^{-1} = ${math.parse(JSON.stringify(inv.toArray())).toTex()}$$`],
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
    classLevel: "Class 11-12",
    description: "Calculate the eigenvalues of a square matrix. Important in differential equations, stability analysis, and quantum mechanics.",
    inputs: [
      {
        id: "matrix",
        label: "Matrix (JSON format)",
        type: "text",
        placeholder: "[[2, 1], [1, 2]]",
        defaultValue: "[[2, 1], [1, 2]]"
      },
    ],
    calculate: (values) => {
      try {
        const math = require("mathjs");
        const mat = math.evaluate(values.matrix);
        const eigs = math.eigs(mat);
        return {
          result: `$$${math.parse(JSON.stringify(eigs.values.toArray())).toTex()}$$`,
          steps: [`Calculate the eigenvalues of the matrix.`, `The eigenvalues are $$\\lambda = ${math.parse(JSON.stringify(eigs.values.toArray())).toTex()}$$`],
        };
      } catch (e) {
        return { result: "Invalid matrix format" };
      }
    },
  }
];
