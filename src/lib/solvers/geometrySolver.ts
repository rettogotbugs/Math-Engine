export const geometrySolver = {
  areaCircle: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const area = Math.PI * radius * radius;
    return {
      result: `$$${area.toFixed(4)}$$`,
      steps: [
        `Find area of circle with radius $r = ${radius}$`,
        `Formula: $\\text{Area} = \\pi r^2$`,
        `$\\text{Area} = \\pi (${radius})^2$`,
        `$\\text{Area} = \\pi (${radius * radius})$`,
        `$\\text{Area} \\approx ${area.toFixed(4)}$`
      ]
    };
  },
  areaTriangle: (base: number, height: number) => {
    if (base < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const area = 0.5 * base * height;
    return {
      result: `$$${area}$$`,
      steps: [
        `Find area of triangle with base $b = ${base}$ and height $h = ${height}$`,
        `Formula: $\\text{Area} = \\frac{1}{2} b h$`,
        `$\\text{Area} = \\frac{1}{2} (${base}) (${height})$`,
        `$\\text{Area} = ${area}$`
      ]
    };
  },
  areaRectangle: (length: number, width: number) => {
    if (length < 0 || width < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const area = length * width;
    return {
      result: `$$${area}$$`,
      steps: [
        `Find area of rectangle with length $l = ${length}$ and width $w = ${width}$`,
        `Formula: $\\text{Area} = l w$`,
        `$\\text{Area} = (${length}) (${width})$`,
        `$\\text{Area} = ${area}$`
      ]
    };
  },
  volumeCube: (side: number) => {
    if (side < 0) return { result: "Invalid side", steps: ["Side cannot be negative."] };
    const volume = side * side * side;
    return {
      result: `$$${volume}$$`,
      steps: [
        `Find volume of cube with side $a = ${side}$`,
        `Formula: $\\text{Volume} = a^3$`,
        `$\\text{Volume} = (${side})^3$`,
        `$\\text{Volume} = ${volume}$`
      ]
    };
  },
  volumeCylinder: (radius: number, height: number) => {
    if (radius < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const volume = Math.PI * radius * radius * height;
    return {
      result: `$$${volume.toFixed(4)}$$`,
      steps: [
        `Find volume of cylinder with radius $r = ${radius}$ and height $h = ${height}$`,
        `Formula: $\\text{Volume} = \\pi r^2 h$`,
        `$\\text{Volume} = \\pi (${radius})^2 (${height})$`,
        `$\\text{Volume} = \\pi (${radius * radius}) (${height})$`,
        `$\\text{Volume} \\approx ${volume.toFixed(4)}$`
      ]
    };
  },
  volumeSphere: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    return {
      result: `$$${volume.toFixed(4)}$$`,
      steps: [
        `Find volume of sphere with radius $r = ${radius}$`,
        `Formula: $\\text{Volume} = \\frac{4}{3} \\pi r^3$`,
        `$\\text{Volume} = \\frac{4}{3} \\pi (${radius})^3$`,
        `$\\text{Volume} = \\frac{4}{3} \\pi (${Math.pow(radius, 3)})$`,
        `$\\text{Volume} \\approx ${volume.toFixed(4)}$`
      ]
    };
  }
};
