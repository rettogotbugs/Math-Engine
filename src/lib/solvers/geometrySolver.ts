export const geometrySolver = {
  areaCircle: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const area = Math.PI * radius * radius;
    return {
      result: area.toFixed(4),
      steps: [
        `Find area of circle with radius r = ${radius}`,
        `Formula: Area = π * r²`,
        `Area = π * (${radius})²`,
        `Area = π * ${radius * radius}`,
        `Area ≈ ${area.toFixed(4)}`
      ]
    };
  },
  areaTriangle: (base: number, height: number) => {
    if (base < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const area = 0.5 * base * height;
    return {
      result: area.toString(),
      steps: [
        `Find area of triangle with base b = ${base} and height h = ${height}`,
        `Formula: Area = 1/2 * b * h`,
        `Area = 1/2 * ${base} * ${height}`,
        `Area = ${area}`
      ]
    };
  },
  areaRectangle: (length: number, width: number) => {
    if (length < 0 || width < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const area = length * width;
    return {
      result: area.toString(),
      steps: [
        `Find area of rectangle with length l = ${length} and width w = ${width}`,
        `Formula: Area = l * w`,
        `Area = ${length} * ${width}`,
        `Area = ${area}`
      ]
    };
  },
  volumeCube: (side: number) => {
    if (side < 0) return { result: "Invalid side", steps: ["Side cannot be negative."] };
    const volume = side * side * side;
    return {
      result: volume.toString(),
      steps: [
        `Find volume of cube with side a = ${side}`,
        `Formula: Volume = a³`,
        `Volume = (${side})³`,
        `Volume = ${volume}`
      ]
    };
  },
  volumeCylinder: (radius: number, height: number) => {
    if (radius < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const volume = Math.PI * radius * radius * height;
    return {
      result: volume.toFixed(4),
      steps: [
        `Find volume of cylinder with radius r = ${radius} and height h = ${height}`,
        `Formula: Volume = π * r² * h`,
        `Volume = π * (${radius})² * ${height}`,
        `Volume = π * ${radius * radius} * ${height}`,
        `Volume ≈ ${volume.toFixed(4)}`
      ]
    };
  },
  volumeSphere: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    return {
      result: volume.toFixed(4),
      steps: [
        `Find volume of sphere with radius r = ${radius}`,
        `Formula: Volume = 4/3 * π * r³`,
        `Volume = 4/3 * π * (${radius})³`,
        `Volume = 4/3 * π * ${Math.pow(radius, 3)}`,
        `Volume ≈ ${volume.toFixed(4)}`
      ]
    };
  }
};
