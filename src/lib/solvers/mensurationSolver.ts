export const mensurationSolver = {
  surfaceAreaCube: (side: number) => {
    if (side < 0) return { result: "Invalid side", steps: ["Side cannot be negative."] };
    const area = 6 * side * side;
    return {
      result: area.toString(),
      steps: [
        `Find total surface area of cube with side a = ${side}`,
        `Formula: Surface Area = 6 * a²`,
        `Surface Area = 6 * (${side})²`,
        `Surface Area = 6 * ${side * side}`,
        `Surface Area = ${area}`
      ]
    };
  },
  surfaceAreaCylinder: (radius: number, height: number) => {
    if (radius < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const lateralArea = 2 * Math.PI * radius * height;
    const totalArea = lateralArea + 2 * Math.PI * radius * radius;
    return {
      result: totalArea.toFixed(4),
      steps: [
        `Find total surface area of cylinder with radius r = ${radius} and height h = ${height}`,
        `Formula: Total Surface Area = 2πrh + 2πr²`,
        `Lateral Area = 2 * π * ${radius} * ${height} ≈ ${lateralArea.toFixed(4)}`,
        `Base Area (x2) = 2 * π * (${radius})² ≈ ${(2 * Math.PI * radius * radius).toFixed(4)}`,
        `Total Surface Area ≈ ${totalArea.toFixed(4)}`
      ]
    };
  },
  volumeCone: (radius: number, height: number) => {
    if (radius < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const volume = (1 / 3) * Math.PI * radius * radius * height;
    return {
      result: volume.toFixed(4),
      steps: [
        `Find volume of cone with radius r = ${radius} and height h = ${height}`,
        `Formula: Volume = 1/3 * π * r² * h`,
        `Volume = 1/3 * π * (${radius})² * ${height}`,
        `Volume = 1/3 * π * ${radius * radius} * ${height}`,
        `Volume ≈ ${volume.toFixed(4)}`
      ]
    };
  },
  surfaceAreaCone: (radius: number, height: number) => {
    if (radius < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const slantHeight = Math.sqrt(radius * radius + height * height);
    const lateralArea = Math.PI * radius * slantHeight;
    const totalArea = lateralArea + Math.PI * radius * radius;
    return {
      result: totalArea.toFixed(4),
      steps: [
        `Find total surface area of cone with radius r = ${radius} and height h = ${height}`,
        `First, find slant height (l): l = √(r² + h²) = √(${radius}² + ${height}²) = √(${radius * radius + height * height}) ≈ ${slantHeight.toFixed(4)}`,
        `Formula: Total Surface Area = πrl + πr²`,
        `Lateral Area = π * ${radius} * ${slantHeight.toFixed(4)} ≈ ${lateralArea.toFixed(4)}`,
        `Base Area = π * (${radius})² ≈ ${(Math.PI * radius * radius).toFixed(4)}`,
        `Total Surface Area ≈ ${totalArea.toFixed(4)}`
      ]
    };
  },
  surfaceAreaSphere: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const area = 4 * Math.PI * radius * radius;
    return {
      result: area.toFixed(4),
      steps: [
        `Find surface area of sphere with radius r = ${radius}`,
        `Formula: Surface Area = 4 * π * r²`,
        `Surface Area = 4 * π * (${radius})²`,
        `Surface Area = 4 * π * ${radius * radius}`,
        `Surface Area ≈ ${area.toFixed(4)}`
      ]
    };
  },
  volumeHemisphere: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const volume = (2 / 3) * Math.PI * Math.pow(radius, 3);
    return {
      result: volume.toFixed(4),
      steps: [
        `Find volume of hemisphere with radius r = ${radius}`,
        `Formula: Volume = 2/3 * π * r³`,
        `Volume = 2/3 * π * (${radius})³`,
        `Volume ≈ ${volume.toFixed(4)}`
      ]
    };
  },
  surfaceAreaHemisphere: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const area = 3 * Math.PI * radius * radius;
    return {
      result: area.toFixed(4),
      steps: [
        `Find total surface area of hemisphere with radius r = ${radius}`,
        `Formula: Total Surface Area = 3 * π * r²`,
        `Surface Area = 3 * π * (${radius})²`,
        `Surface Area ≈ ${area.toFixed(4)}`
      ]
    };
  }
};
