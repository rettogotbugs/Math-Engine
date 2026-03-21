export const numberSystemSolver = {
  isPrime: (n: number) => {
    if (!Number.isInteger(n)) return { result: "Not an integer", steps: ["Prime numbers must be integers."] };
    if (n <= 1) return { result: "Not Prime", steps: [`${n} is less than or equal to 1, so it is not prime.`] };
    if (n === 2) return { result: "Prime", steps: ["2 is the only even prime number."] };
    if (n % 2 === 0) return { result: "Not Prime", steps: [`${n} is divisible by 2.`] };

    const limit = Math.sqrt(n);
    const steps = [`Check if ${n} is prime.`, `Check divisibility up to √${n} ≈ ${limit.toFixed(2)}`];
    
    for (let i = 3; i <= limit; i += 2) {
      if (n % i === 0) {
        steps.push(`${n} is divisible by ${i} (${i} * ${n / i} = ${n}).`);
        return { result: "Not Prime", steps };
      }
    }
    steps.push(`No divisors found up to √${n}.`);
    return { result: "Prime", steps };
  },
  factorial: (n: number) => {
    if (!Number.isInteger(n) || n < 0) return { result: "Invalid input", steps: ["Factorial is defined for non-negative integers."] };
    if (n === 0 || n === 1) return { result: "1", steps: [`${n}! = 1`] };
    
    let result = 1;
    const steps = [`Calculate ${n}!`, `Formula: n! = n * (n-1) * ... * 1`];
    
    // For very large numbers, we shouldn't list all steps
    if (n > 20) {
      for (let i = 2; i <= n; i++) result *= i;
      steps.push(`... calculation omitted for brevity ...`);
      steps.push(`Result: ${n}! = ${result}`);
      return { result: result.toString(), steps };
    }

    let calcStr = "1";
    for (let i = 2; i <= n; i++) {
      result *= i;
      calcStr += ` * ${i}`;
    }
    steps.push(`${n}! = ${calcStr}`);
    steps.push(`Result: ${result}`);
    return { result: result.toString(), steps };
  },
  baseConverter: (numStr: string, fromBase: number, toBase: number) => {
    try {
      if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
        return { result: "Invalid base", steps: ["Bases must be between 2 and 36."] };
      }
      
      const decimalValue = parseInt(numStr, fromBase);
      if (isNaN(decimalValue)) {
        return { result: "Invalid number", steps: [`'${numStr}' is not a valid number in base ${fromBase}.`] };
      }

      const result = decimalValue.toString(toBase).toUpperCase();
      
      const steps = [
        `Convert ${numStr} from base ${fromBase} to base ${toBase}`,
      ];
      
      if (fromBase !== 10) {
        steps.push(`Step 1: Convert ${numStr} (base ${fromBase}) to decimal (base 10)`);
        steps.push(`Decimal value = ${decimalValue}`);
      }
      
      if (toBase !== 10) {
        steps.push(`Step 2: Convert ${decimalValue} (base 10) to base ${toBase}`);
        steps.push(`Result = ${result}`);
      }

      return { result, steps };
    } catch (e) {
      return { result: "Error", steps: [(e as Error).message] };
    }
  }
};
