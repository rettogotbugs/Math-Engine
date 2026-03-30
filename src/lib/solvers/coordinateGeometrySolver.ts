export const coordinateGeometrySolver = {
  distance: (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);
    return {
      result: `$$${dist.toFixed(4)}$$`,
      steps: [
        `Find distance between points $(${x1}, ${y1})$ and $(${x2}, ${y2})$`,
        `Distance Formula: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$`,
        `$d = \\sqrt{(${x2} - ${x1})^2 + (${y2} - ${y1})^2}$`,
        `$d = \\sqrt{(${dx})^2 + (${dy})^2}$`,
        `$d = \\sqrt{${dx * dx} + ${dy * dy}}$`,
        `$d = \\sqrt{${distSq}}$`,
        `$d \\approx ${dist.toFixed(4)}$`
      ]
    };
  },
  midpoint: (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    return {
      result: `$$(${mx}, ${my})$$`,
      steps: [
        `Find midpoint of segment between $(${x1}, ${y1})$ and $(${x2}, ${y2})$`,
        `Midpoint Formula: $M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$`,
        `$M = \\left(\\frac{${x1} + ${x2}}{2}, \\frac{${y1} + ${y2}}{2}\\right)$`,
        `$M = \\left(\\frac{${x1 + x2}}{2}, \\frac{${y1 + y2}}{2}\\right)$`,
        `$M = (${mx}, ${my})$`
      ]
    };
  },
  slope: (x1: number, y1: number, x2: number, y2: number) => {
    if (x1 === x2) return { result: "Undefined (Vertical Line)", steps: [`$x_1 = x_2$, so the denominator is 0. Slope is undefined.`] };
    const m = (y2 - y1) / (x2 - x1);
    return {
      result: `$$${m}$$`,
      steps: [
        `Find slope of line through $(${x1}, ${y1})$ and $(${x2}, ${y2})$`,
        `Slope Formula: $m = \\frac{y_2 - y_1}{x_2 - x_1}$`,
        `$m = \\frac{${y2} - ${y1}}{${x2} - ${x1}}$`,
        `$m = \\frac{${y2 - y1}}{${x2 - x1}}$`,
        `$m = ${m}$`
      ]
    };
  },
  lineEquation: (x1: number, y1: number, x2: number, y2: number) => {
    if (x1 === x2) {
      return {
        result: `$$x = ${x1}$$`,
        steps: [
          `Find equation of line through $(${x1}, ${y1})$ and $(${x2}, ${y2})$`,
          `Since $x_1 = x_2 = ${x1}$, the line is vertical.`,
          `Equation: $x = ${x1}$`
        ]
      };
    }
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    return {
      result: `$$y = ${m}x ${bStr}$$`,
      steps: [
        `Find equation of line through $(${x1}, ${y1})$ and $(${x2}, ${y2})$`,
        `First, find the slope ($m$): $m = \\frac{y_2 - y_1}{x_2 - x_1}$`,
        `$m = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = ${m}$`,
        `Use point-slope form: $y - y_1 = m(x - x_1)$, using point $(${x1}, ${y1})$`,
        `$y - ${y1} = ${m}(x - ${x1})$`,
        `$y = ${m}x - ${m * x1} + ${y1}$`,
        `$y = ${m}x ${bStr}$`
      ]
    };
  }
};
