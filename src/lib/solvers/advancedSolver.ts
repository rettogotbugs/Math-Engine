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

    steps.push(`**Matrix A:**\n\`\`\`\n${math.format(A)}\n\`\`\``);
    if (B) {
      steps.push(`**Matrix B:**\n\`\`\`\n${math.format(B)}\n\`\`\``);
    }

    switch (operation) {
      case "add":
        result = math.add(A, B);
        steps.push(
          `**Adding Matrix A and Matrix B:**\n\`\`\`\n${math.format(result)}\n\`\`\``,
        );
        break;
      case "subtract":
        result = math.subtract(A, B);
        steps.push(
          `**Subtracting Matrix B from Matrix A:**\n\`\`\`\n${math.format(result)}\n\`\`\``,
        );
        break;
      case "multiply":
        result = math.multiply(A, B);
        steps.push(
          `**Multiplying Matrix A and Matrix B:**\n\`\`\`\n${math.format(result)}\n\`\`\``,
        );
        break;
      case "determinant":
        result = math.det(A);
        steps.push(`**Calculating Determinant of Matrix A:**\n|A| = ${result}`);
        break;
      case "inverse":
        result = math.inv(A);
        steps.push(
          `**Calculating Inverse of Matrix A:**\n\`\`\`\n${math.format(result)}\n\`\`\``,
        );
        break;
      case "transpose":
        result = math.transpose(A);
        steps.push(
          `**Calculating Transpose of Matrix A:**\n\`\`\`\n${math.format(result)}\n\`\`\``,
        );
        break;
      case "eigenvalues":
        const eigs = math.eigs(A);
        result = eigs.values;
        steps.push(
          `**Calculating Eigenvalues of Matrix A:**\n\`\`\`\n${math.format(result)}\n\`\`\``,
        );
        break;
      default:
        throw new Error("Invalid operation");
    }

    return { result: math.format(result), steps };
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
      steps.push(`**Combinations (${n}C${r}):**`);
      steps.push(`Formula: nCr = n! / (r! * (n - r)!)`);
      steps.push(`Substitute values: ${n}! / (${r}! * (${n} - ${r})!)`);
      result = math.combinations(n, r);
    } else {
      steps.push(`**Permutations (${n}P${r}):**`);
      steps.push(`Formula: nPr = n! / (n - r)!`);
      steps.push(`Substitute values: ${n}! / (${n} - ${r})!`);
      result = math.permutations(n, r);
    }

    steps.push(`**Result:** ${result}`);
    return { result: result.toString(), steps };
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

    steps.push(`**Vector A:** ${math.format(A)}`);
    if (B) {
      steps.push(`**Vector B:** ${math.format(B)}`);
    }

    switch (operation) {
      case "add":
        result = math.add(A, B);
        steps.push(`**Adding Vector A and Vector B:** ${math.format(result)}`);
        break;
      case "subtract":
        result = math.subtract(A, B);
        steps.push(
          `**Subtracting Vector B from Vector A:** ${math.format(result)}`,
        );
        break;
      case "dot":
        result = math.dot(A, B);
        steps.push(`**Dot Product (A · B):** ${result}`);
        break;
      case "cross":
        result = math.cross(A, B);
        steps.push(`**Cross Product (A × B):** ${math.format(result)}`);
        break;
      case "magnitude":
        result = math.norm(A);
        steps.push(`**Magnitude of Vector A (|A|):** ${result}`);
        break;
      case "projection":
        const dotProd = math.dot(A, B);
        const magBSq = math.pow(math.norm(B), 2);
        const scalar = math.divide(dotProd, magBSq);
        result = math.multiply(scalar, B);
        steps.push(`**Dot Product (A · B):** ${dotProd}`);
        steps.push(`**Magnitude of B squared (|B|²):** ${magBSq}`);
        steps.push(`**Scalar (A·B / |B|²):** ${scalar}`);
        steps.push(`**Projection of A on B:** ${math.format(result)}`);
        break;
      default:
        throw new Error("Invalid operation");
    }

    return { result: math.format(result), steps };
  } catch (error: any) {
    return {
      result: "Error",
      steps: ["Failed to perform vector operation.", error.message],
    };
  }
}
