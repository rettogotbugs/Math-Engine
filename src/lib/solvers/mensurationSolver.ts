export const mensurationSolver = {
  surfaceAreaCube: (side: number) => {
    if (side < 0) return { result: "Invalid side", steps: ["Side cannot be negative."] };
    const area = 6 * side * side;
    return {
      result: `$$${area}$$`,
      steps: [
        `Find total surface area of cube with side $a = ${side}$`,
        `Formula: $\\text{Surface Area} = 6a^2$`,
        `$\\text{Surface Area} = 6(${side})^2$`,
        `$\\text{Surface Area} = 6(${side * side})$`,
        `$\\text{Surface Area} = ${area}$`
      ]
    };
  },
  surfaceAreaCylinder: (radius: number, height: number) => {
    if (radius < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const lateralArea = 2 * Math.PI * radius * height;
    const totalArea = lateralArea + 2 * Math.PI * radius * radius;
    return {
      result: `$$${totalArea.toFixed(4)}$$`,
      steps: [
        `Find total surface area of cylinder with radius $r = ${radius}$ and height $h = ${height}$`,
        `Formula: $\\text{Total Surface Area} = 2\\pi rh + 2\\pi r^2$`,
        `$\\text{Lateral Area} = 2\\pi(${radius})(${height}) \\approx ${lateralArea.toFixed(4)}$`,
        `$\\text{Base Area (x2)} = 2\\pi(${radius})^2 \\approx ${(2 * Math.PI * radius * radius).toFixed(4)}$`,
        `$\\text{Total Surface Area} \\approx ${totalArea.toFixed(4)}$`
      ]
    };
  },
  volumeCone: (radius: number, height: number) => {
    if (radius < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const volume = (1 / 3) * Math.PI * radius * radius * height;
    return {
      result: `$$${volume.toFixed(4)}$$`,
      steps: [
        `Find volume of cone with radius $r = ${radius}$ and height $h = ${height}$`,
        `Formula: $\\text{Volume} = \\frac{1}{3}\\pi r^2 h$`,
        `$\\text{Volume} = \\frac{1}{3}\\pi(${radius})^2(${height})$`,
        `$\\text{Volume} = \\frac{1}{3}\\pi(${radius * radius})(${height})$`,
        `$\\text{Volume} \\approx ${volume.toFixed(4)}$`
      ]
    };
  },
  surfaceAreaCone: (radius: number, height: number) => {
    if (radius < 0 || height < 0) return { result: "Invalid dimensions", steps: ["Dimensions cannot be negative."] };
    const slantHeight = Math.sqrt(radius * radius + height * height);
    const lateralArea = Math.PI * radius * slantHeight;
    const totalArea = lateralArea + Math.PI * radius * radius;
    return {
      result: `$$${totalArea.toFixed(4)}$$`,
      steps: [
        `Find total surface area of cone with radius $r = ${radius}$ and height $h = ${height}$`,
        `First, find slant height ($l$): $l = \\sqrt{r^2 + h^2} = \\sqrt{${radius}^2 + ${height}^2} = \\sqrt{${radius * radius + height * height}} \\approx ${slantHeight.toFixed(4)}$`,
        `Formula: $\\text{Total Surface Area} = \\pi rl + \\pi r^2$`,
        `$\\text{Lateral Area} = \\pi(${radius})(${slantHeight.toFixed(4)}) \\approx ${lateralArea.toFixed(4)}$`,
        `$\\text{Base Area} = \\pi(${radius})^2 \\approx ${(Math.PI * radius * radius).toFixed(4)}$`,
        `$\\text{Total Surface Area} \\approx ${totalArea.toFixed(4)}$`
      ]
    };
  },
  surfaceAreaSphere: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const area = 4 * Math.PI * radius * radius;
    return {
      result: `$$${area.toFixed(4)}$$`,
      steps: [
        `Find surface area of sphere with radius $r = ${radius}$`,
        `Formula: $\\text{Surface Area} = 4\\pi r^2$`,
        `$\\text{Surface Area} = 4\\pi(${radius})^2$`,
        `$\\text{Surface Area} = 4\\pi(${radius * radius})$`,
        `$\\text{Surface Area} \\approx ${area.toFixed(4)}$`
      ]
    };
  },
  volumeHemisphere: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const volume = (2 / 3) * Math.PI * Math.pow(radius, 3);
    return {
      result: `$$${volume.toFixed(4)}$$`,
      steps: [
        `Find volume of hemisphere with radius $r = ${radius}$`,
        `Formula: $\\text{Volume} = \\frac{2}{3}\\pi r^3$`,
        `$\\text{Volume} = \\frac{2}{3}\\pi(${radius})^3$`,
        `$\\text{Volume} \\approx ${volume.toFixed(4)}$`
      ]
    };
  },
  surfaceAreaHemisphere: (radius: number) => {
    if (radius < 0) return { result: "Invalid radius", steps: ["Radius cannot be negative."] };
    const area = 3 * Math.PI * radius * radius;
    return {
      result: `$$${area.toFixed(4)}$$`,
      steps: [
        `Find total surface area of hemisphere with radius $r = ${radius}$`,
        `Formula: $\\text{Total Surface Area} = 3\\pi r^2$`,
        `$\\text{Surface Area} = 3\\pi(${radius})^2$`,
        `$\\text{Surface Area} \\approx ${area.toFixed(4)}$`
      ]
    };
  }
};
