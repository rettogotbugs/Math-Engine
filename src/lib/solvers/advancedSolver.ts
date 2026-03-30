import * as math from "mathjs";

export function solveMatrixOperations(
  matrixA: string,
  matrixB: string,
  operation: string,
): { result: string; steps: string[] } {
  const steps: string[] = [];
  try {
    const A = math.evaluate(matrixA);
    const B = matrixB ? math.evaluate(matrixB) : null;
    let result;

    const toTex = (mat: any) => {
      try {
        return math.parse(math.format(mat)).toTex();
      } catch (e) {
        return math.format(mat);
      }
    };

    steps.push(`Matrix A: $$${toTex(A)}$$`);
    if (B) {
      steps.push(`Matrix B: $$${toTex(B)}$$`);
    }

    switch (operation) {
      case "add":
        result = math.add(A, B);
        steps.push(`Adding Matrix A and Matrix B:`);
        steps.push(`$$${toTex(result)}$$`);
        break;
      case "subtract":
        result = math.subtract(A, B);
        steps.push(`Subtracting Matrix B from Matrix A:`);
        steps.push(`$$${toTex(result)}$$`);
        break;
      case "multiply":
        result = math.multiply(A, B);
        steps.push(`Multiplying Matrix A and Matrix B:`);
        steps.push(`$$${toTex(result)}$$`);
        break;
      case "determinant":
        result = math.det(A);
        steps.push(`Calculating Determinant of Matrix A.`);
        steps.push(`The determinant is $|A| = ${result}$`);
        return { result: `$$${result}$$`, steps };
      case "inverse":
        result = math.inv(A);
        steps.push(`Calculating Inverse of Matrix A:`);
        steps.push(`$$${toTex(result)}$$`);
        break;
      case "transpose":
        result = math.transpose(A);
        steps.push(`Calculating Transpose of Matrix A:`);
        steps.push(`$$${toTex(result)}$$`);
        break;
      case "eigenvalues":
        const eigs = math.eigs(A);
        result = eigs.values;
        steps.push(`Calculating Eigenvalues of Matrix A:`);
        steps.push(`$$${toTex(result)}$$`);
        break;
      default:
        throw new Error("Invalid operation");
    }

    return { result: `$$${toTex(result)}$$`, steps };
  } catch (error: any) {
    return {
      result: "Error",
      steps: ["Failed to perform matrix operation.", error.message],
    };
  }
}

export function solveCombinatorics(
  n: number,
  r: number,
  operation: "nCr" | "nPr",
): { result: string; steps: string[] } {
  const steps: string[] = [];
  try {
    if (n < 0 || r < 0 || n < r) {
      throw new Error(
        "Invalid inputs: n and r must be non-negative, and n >= r.",
      );
    }

    let result;
    if (operation === "nCr") {
      steps.push(`Combinations $\\binom{${n}}{${r}}$:`);
      steps.push(`Formula is $$\\binom{n}{r} = \\frac{n!}{r!(n - r)!}$$`);
      steps.push(`Substitute values: $$\\frac{${n}!}{${r}!(${n} - ${r})!}$$`);
      result = math.combinations(n, r);
    } else {
      steps.push(`Permutations $^{${n}}P_{${r}}$:`);
      steps.push(`Formula is $$^{n}P_{r} = \\frac{n!}{(n - r)!}$$`);
      steps.push(`Substitute values: $$\\frac{${n}!}{(${n} - ${r})!}$$`);
      result = math.permutations(n, r);
    }

    steps.push(`Result is $$${result}$$`);
    return { result: `$$${result}$$`, steps };
  } catch (error: any) {
    return { result: "Error", steps: ["Failed to calculate.", error.message] };
  }
}

export function solveVectorOperations(
  vectorA: string,
  vectorB: string,
  operation: string,
): { result: string; steps: string[] } {
  const steps: string[] = [];
  try {
    const A = math.evaluate(vectorA);
    const B = vectorB ? math.evaluate(vectorB) : null;
    let result;

    const toTex = (vec: any) => {
      try {
        return math.parse(math.format(vec)).toTex();
      } catch (e) {
        return math.format(vec);
      }
    };

    steps.push(`Vector A: $$${toTex(A)}$$`);
    if (B) {
      steps.push(`Vector B: $$${toTex(B)}$$`);
    }

    switch (operation) {
      case "add":
        result = math.add(A, B);
        steps.push(`Adding Vector A and Vector B: $$${toTex(result)}$$`);
        break;
      case "subtract":
        result = math.subtract(A, B);
        steps.push(`Subtracting Vector B from Vector A: $$${toTex(result)}$$`);
        break;
      case "dot":
        result = math.dot(A, B);
        steps.push(`Dot Product is $A \\cdot B = ${result}$`);
        return { result: `$$${result}$$`, steps };
      case "cross":
        result = math.cross(A, B);
        steps.push(`Cross Product is $A \\times B = ${toTex(result)}$`);
        break;
      case "magnitude":
        result = math.norm(A);
        steps.push(`Magnitude of Vector A is $|A| = ${result}$`);
        return { result: `$$${result}$$`, steps };
      case "projection":
        const dotProd = math.dot(A, B);
        const magBSq = math.pow(math.norm(B), 2);
        const scalar = math.divide(dotProd, magBSq);
        result = math.multiply(scalar, B);
        steps.push(`Dot Product is $A \\cdot B = ${dotProd}$`);
        steps.push(`Magnitude of B squared is $|B|^2 = ${magBSq}$`);
        steps.push(`Scalar is $\\frac{A \\cdot B}{|B|^2} = ${scalar}$`);
        steps.push(`Projection of A on B: $$${toTex(result)}$$`);
        break;
      default:
        throw new Error("Invalid operation");
    }

    return { result: `$$${toTex(result)}$$`, steps };
  } catch (error: any) {
    return {
      result: "Error",
      steps: ["Failed to perform vector operation.", error.message],
    };
  }
}
