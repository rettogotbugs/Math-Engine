export interface Formula {
  id: string;
  name: string;
  category: string;
  formula: string;
}

export const formulas: Formula[] = [
  // Algebra
  {
    id: "alg-1",
    name: "Quadratic Formula",
    category: "Algebra",
    formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
  },
  {
    id: "alg-2",
    name: "Difference of Squares",
    category: "Algebra",
    formula: "a^2 - b^2 = (a - b)(a + b)"
  },
  {
    id: "alg-3",
    name: "Sum of Cubes",
    category: "Algebra",
    formula: "a^3 + b^3 = (a + b)(a^2 - ab + b^2)"
  },
  {
    id: "alg-4",
    name: "Difference of Cubes",
    category: "Algebra",
    formula: "a^3 - b^3 = (a - b)(a^2 + ab + b^2)"
  },
  {
    id: "alg-5",
    name: "Exponent Rule: Multiplication",
    category: "Algebra",
    formula: "a^m \\cdot a^n = a^{m+n}"
  },
  {
    id: "alg-6",
    name: "Exponent Rule: Division",
    category: "Algebra",
    formula: "\\frac{a^m}{a^n} = a^{m-n}"
  },
  {
    id: "alg-7",
    name: "Exponent Rule: Power of a Power",
    category: "Algebra",
    formula: "(a^m)^n = a^{m \\cdot n}"
  },
  {
    id: "alg-8",
    name: "Exponent Rule: Negative Exponent",
    category: "Algebra",
    formula: "a^{-n} = \\frac{1}{a^n}"
  },
  {
    id: "alg-9",
    name: "Exponent Rule: Zero Exponent",
    category: "Algebra",
    formula: "a^0 = 1 \\quad (a \\neq 0)"
  },
  {
    id: "alg-10",
    name: "Logarithm Rule: Product",
    category: "Algebra",
    formula: "\\log_b(xy) = \\log_b(x) + \\log_b(y)"
  },
  {
    id: "alg-11",
    name: "Logarithm Rule: Quotient",
    category: "Algebra",
    formula: "\\log_b\\left(\\frac{x}{y}\\right) = \\log_b(x) - \\log_b(y)"
  },
  {
    id: "alg-12",
    name: "Logarithm Rule: Power",
    category: "Algebra",
    formula: "\\log_b(x^k) = k \\log_b(x)"
  },
  {
    id: "alg-13",
    name: "Logarithm Rule: Change of Base",
    category: "Algebra",
    formula: "\\log_b(x) = \\frac{\\log_c(x)}{\\log_c(b)}"
  },
  {
    id: "alg-14",
    name: "Arithmetic Sequence: nth Term",
    category: "Algebra",
    formula: "a_n = a_1 + (n - 1)d"
  },
  {
    id: "alg-15",
    name: "Arithmetic Sequence: Sum",
    category: "Algebra",
    formula: "S_n = \\frac{n}{2}(a_1 + a_n)"
  },
  {
    id: "alg-16",
    name: "Geometric Sequence: nth Term",
    category: "Algebra",
    formula: "a_n = a_1 r^{n-1}"
  },
  {
    id: "alg-17",
    name: "Geometric Sequence: Sum",
    category: "Algebra",
    formula: "S_n = \\frac{a_1(1 - r^n)}{1 - r} \\quad (r \\neq 1)"
  },
  {
    id: "alg-18",
    name: "Geometric Sequence: Infinite Sum",
    category: "Algebra",
    formula: "S_\\infty = \\frac{a_1}{1 - r} \\quad (|r| < 1)"
  },
  {
    id: "alg-19",
    name: "Binomial Theorem",
    category: "Algebra",
    formula: "(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k"
  },
  {
    id: "alg-20",
    name: "Vertex Form of a Parabola",
    category: "Algebra",
    formula: "y = a(x - h)^2 + k"
  },

  // Geometry
  {
    id: "geo-1",
    name: "Area of a Square",
    category: "Geometry",
    formula: "A = s^2"
  },
  {
    id: "geo-2",
    name: "Perimeter of a Square",
    category: "Geometry",
    formula: "P = 4s"
  },
  {
    id: "geo-3",
    name: "Area of a Rectangle",
    category: "Geometry",
    formula: "A = l \\times w"
  },
  {
    id: "geo-4",
    name: "Perimeter of a Rectangle",
    category: "Geometry",
    formula: "P = 2l + 2w"
  },
  {
    id: "geo-5",
    name: "Area of a Triangle",
    category: "Geometry",
    formula: "A = \\frac{1}{2}bh"
  },
  {
    id: "geo-6",
    name: "Area of a Circle",
    category: "Geometry",
    formula: "A = \\pi r^2"
  },
  {
    id: "geo-7",
    name: "Circumference of a Circle",
    category: "Geometry",
    formula: "C = 2\\pi r"
  },
  {
    id: "geo-8",
    name: "Area of a Parallelogram",
    category: "Geometry",
    formula: "A = bh"
  },
  {
    id: "geo-9",
    name: "Area of a Trapezoid",
    category: "Geometry",
    formula: "A = \\frac{1}{2}(a + b)h"
  },
  {
    id: "geo-10",
    name: "Area of a Rhombus",
    category: "Geometry",
    formula: "A = \\frac{1}{2}d_1 d_2"
  },
  {
    id: "geo-11",
    name: "Volume of a Cube",
    category: "Geometry",
    formula: "V = s^3"
  },
  {
    id: "geo-12",
    name: "Surface Area of a Cube",
    category: "Geometry",
    formula: "SA = 6s^2"
  },
  {
    id: "geo-13",
    name: "Volume of a Rectangular Prism",
    category: "Geometry",
    formula: "V = lwh"
  },
  {
    id: "geo-14",
    name: "Surface Area of a Rectangular Prism",
    category: "Geometry",
    formula: "SA = 2lw + 2lh + 2wh"
  },
  {
    id: "geo-15",
    name: "Volume of a Sphere",
    category: "Geometry",
    formula: "V = \\frac{4}{3}\\pi r^3"
  },
  {
    id: "geo-16",
    name: "Surface Area of a Sphere",
    category: "Geometry",
    formula: "SA = 4\\pi r^2"
  },
  {
    id: "geo-17",
    name: "Volume of a Cylinder",
    category: "Geometry",
    formula: "V = \\pi r^2 h"
  },
  {
    id: "geo-18",
    name: "Surface Area of a Cylinder",
    category: "Geometry",
    formula: "SA = 2\\pi r^2 + 2\\pi rh"
  },
  {
    id: "geo-19",
    name: "Volume of a Cone",
    category: "Geometry",
    formula: "V = \\frac{1}{3}\\pi r^2 h"
  },
  {
    id: "geo-20",
    name: "Surface Area of a Cone",
    category: "Geometry",
    formula: "SA = \\pi r(r + \\sqrt{h^2 + r^2})"
  },
  {
    id: "geo-21",
    name: "Volume of a Pyramid",
    category: "Geometry",
    formula: "V = \\frac{1}{3}Bh"
  },
  {
    id: "geo-22",
    name: "Euler's Formula",
    category: "Geometry",
    formula: "V - E + F = 2"
  },
  {
    id: "geo-23",
    name: "Distance Formula",
    category: "Geometry",
    formula: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}"
  },
  {
    id: "geo-24",
    name: "Midpoint Formula",
    category: "Geometry",
    formula: "M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)"
  },

  // Trigonometry
  {
    id: "trig-1",
    name: "Sine Definition (SOH)",
    category: "Trigonometry",
    formula: "\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}"
  },
  {
    id: "trig-2",
    name: "Cosine Definition (CAH)",
    category: "Trigonometry",
    formula: "\\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}"
  },
  {
    id: "trig-3",
    name: "Tangent Definition (TOA)",
    category: "Trigonometry",
    formula: "\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}"
  },
  {
    id: "trig-4",
    name: "Pythagorean Identity 1",
    category: "Trigonometry",
    formula: "\\sin^2(\\theta) + \\cos^2(\\theta) = 1"
  },
  {
    id: "trig-5",
    name: "Pythagorean Identity 2",
    category: "Trigonometry",
    formula: "1 + \\tan^2(\\theta) = \\sec^2(\\theta)"
  },
  {
    id: "trig-6",
    name: "Pythagorean Identity 3",
    category: "Trigonometry",
    formula: "1 + \\cot^2(\\theta) = \\csc^2(\\theta)"
  },
  {
    id: "trig-7",
    name: "Reciprocal Identity: Cosecant",
    category: "Trigonometry",
    formula: "\\csc(\\theta) = \\frac{1}{\\sin(\\theta)}"
  },
  {
    id: "trig-8",
    name: "Reciprocal Identity: Secant",
    category: "Trigonometry",
    formula: "\\sec(\\theta) = \\frac{1}{\\cos(\\theta)}"
  },
  {
    id: "trig-9",
    name: "Reciprocal Identity: Cotangent",
    category: "Trigonometry",
    formula: "\\cot(\\theta) = \\frac{1}{\\tan(\\theta)}"
  },
  {
    id: "trig-10",
    name: "Quotient Identity: Tangent",
    category: "Trigonometry",
    formula: "\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}"
  },
  {
    id: "trig-11",
    name: "Quotient Identity: Cotangent",
    category: "Trigonometry",
    formula: "\\cot(\\theta) = \\frac{\\cos(\\theta)}{\\sin(\\theta)}"
  },
  {
    id: "trig-12",
    name: "Even/Odd Identity: Sine",
    category: "Trigonometry",
    formula: "\\sin(-\\theta) = -\\sin(\\theta)"
  },
  {
    id: "trig-13",
    name: "Even/Odd Identity: Cosine",
    category: "Trigonometry",
    formula: "\\cos(-\\theta) = \\cos(\\theta)"
  },
  {
    id: "trig-14",
    name: "Even/Odd Identity: Tangent",
    category: "Trigonometry",
    formula: "\\tan(-\\theta) = -\\tan(\\theta)"
  },
  {
    id: "trig-15",
    name: "Sum Formula: Sine",
    category: "Trigonometry",
    formula: "\\sin(A + B) = \\sin(A)\\cos(B) + \\cos(A)\\sin(B)"
  },
  {
    id: "trig-16",
    name: "Difference Formula: Sine",
    category: "Trigonometry",
    formula: "\\sin(A - B) = \\sin(A)\\cos(B) - \\cos(A)\\sin(B)"
  },
  {
    id: "trig-17",
    name: "Sum Formula: Cosine",
    category: "Trigonometry",
    formula: "\\cos(A + B) = \\cos(A)\\cos(B) - \\sin(A)\\sin(B)"
  },
  {
    id: "trig-18",
    name: "Difference Formula: Cosine",
    category: "Trigonometry",
    formula: "\\cos(A - B) = \\cos(A)\\cos(B) + \\sin(A)\\sin(B)"
  },
  {
    id: "trig-19",
    name: "Sum Formula: Tangent",
    category: "Trigonometry",
    formula: "\\tan(A + B) = \\frac{\\tan(A) + \\tan(B)}{1 - \\tan(A)\\tan(B)}"
  },
  {
    id: "trig-20",
    name: "Difference Formula: Tangent",
    category: "Trigonometry",
    formula: "\\tan(A - B) = \\frac{\\tan(A) - \\tan(B)}{1 + \\tan(A)\\tan(B)}"
  },
  {
    id: "trig-21",
    name: "Double Angle: Sine",
    category: "Trigonometry",
    formula: "\\sin(2\\theta) = 2\\sin(\\theta)\\cos(\\theta)"
  },
  {
    id: "trig-22",
    name: "Double Angle: Cosine",
    category: "Trigonometry",
    formula: "\\cos(2\\theta) = \\cos^2(\\theta) - \\sin^2(\\theta)"
  },
  {
    id: "trig-23",
    name: "Double Angle: Tangent",
    category: "Trigonometry",
    formula: "\\tan(2\\theta) = \\frac{2\\tan(\\theta)}{1 - \\tan^2(\\theta)}"
  },
  {
    id: "trig-24",
    name: "Half Angle: Sine",
    category: "Trigonometry",
    formula: "\\sin\\left(\\frac{\\theta}{2}\\right) = \\pm\\sqrt{\\frac{1 - \\cos(\\theta)}{2}}"
  },
  {
    id: "trig-25",
    name: "Half Angle: Cosine",
    category: "Trigonometry",
    formula: "\\cos\\left(\\frac{\\theta}{2}\\right) = \\pm\\sqrt{\\frac{1 + \\cos(\\theta)}{2}}"
  },
  {
    id: "trig-26",
    name: "Half Angle: Tangent",
    category: "Trigonometry",
    formula: "\\tan\\left(\\frac{\\theta}{2}\\right) = \\pm\\sqrt{\\frac{1 - \\cos(\\theta)}{1 + \\cos(\\theta)}}"
  },
  {
    id: "trig-27",
    name: "Product-to-Sum: Sine Cosine",
    category: "Trigonometry",
    formula: "\\sin(A)\\cos(B) = \\frac{1}{2}[\\sin(A+B) + \\sin(A-B)]"
  },
  {
    id: "trig-28",
    name: "Product-to-Sum: Cosine Cosine",
    category: "Trigonometry",
    formula: "\\cos(A)\\cos(B) = \\frac{1}{2}[\\cos(A+B) + \\cos(A-B)]"
  },
  {
    id: "trig-29",
    name: "Product-to-Sum: Sine Sine",
    category: "Trigonometry",
    formula: "\\sin(A)\\sin(B) = \\frac{1}{2}[\\cos(A-B) - \\cos(A+B)]"
  },
  {
    id: "trig-30",
    name: "Sum-to-Product: Sine + Sine",
    category: "Trigonometry",
    formula: "\\sin(A) + \\sin(B) = 2\\sin\\left(\\frac{A+B}{2}\\right)\\cos\\left(\\frac{A-B}{2}\\right)"
  },
  {
    id: "trig-31",
    name: "Law of Sines",
    category: "Trigonometry",
    formula: "\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)}"
  },
  {
    id: "trig-32",
    name: "Law of Cosines",
    category: "Trigonometry",
    formula: "c^2 = a^2 + b^2 - 2ab\\cos(C)"
  },
  {
    id: "trig-33",
    name: "Area of Triangle using Sine",
    category: "Trigonometry",
    formula: "A = \\frac{1}{2}ab\\sin(C)"
  },

  // Calculus - Derivatives
  {
    id: "calc-d-1",
    name: "Limit Definition of Derivative",
    category: "Calculus - Derivatives",
    formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}"
  },
  {
    id: "calc-d-2",
    name: "Power Rule",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(x^n) = nx^{n-1}"
  },
  {
    id: "calc-d-3",
    name: "Product Rule",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)"
  },
  {
    id: "calc-d-4",
    name: "Quotient Rule",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}"
  },
  {
    id: "calc-d-5",
    name: "Chain Rule",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}[f(g(x))] = f'(g(x))g'(x)"
  },
  {
    id: "calc-d-6",
    name: "Derivative of Sine",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\sin x) = \\cos x"
  },
  {
    id: "calc-d-7",
    name: "Derivative of Cosine",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\cos x) = -\\sin x"
  },
  {
    id: "calc-d-8",
    name: "Derivative of Tangent",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\tan x) = \\sec^2 x"
  },
  {
    id: "calc-d-9",
    name: "Derivative of Cosecant",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\csc x) = -\\csc x \\cot x"
  },
  {
    id: "calc-d-10",
    name: "Derivative of Secant",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\sec x) = \\sec x \\tan x"
  },
  {
    id: "calc-d-11",
    name: "Derivative of Cotangent",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\cot x) = -\\csc^2 x"
  },
  {
    id: "calc-d-12",
    name: "Derivative of Inverse Sine",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\arcsin x) = \\frac{1}{\\sqrt{1 - x^2}}"
  },
  {
    id: "calc-d-13",
    name: "Derivative of Inverse Cosine",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\arccos x) = -\\frac{1}{\\sqrt{1 - x^2}}"
  },
  {
    id: "calc-d-14",
    name: "Derivative of Inverse Tangent",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\arctan x) = \\frac{1}{1 + x^2}"
  },
  {
    id: "calc-d-15",
    name: "Derivative of Inverse Cosecant",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\text{arccsc } x) = -\\frac{1}{|x|\\sqrt{x^2 - 1}}"
  },
  {
    id: "calc-d-16",
    name: "Derivative of Inverse Secant",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\text{arcsec } x) = \\frac{1}{|x|\\sqrt{x^2 - 1}}"
  },
  {
    id: "calc-d-17",
    name: "Derivative of Inverse Cotangent",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\text{arccot } x) = -\\frac{1}{1 + x^2}"
  },
  {
    id: "calc-d-18",
    name: "Derivative of e^x",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(e^x) = e^x"
  },
  {
    id: "calc-d-19",
    name: "Derivative of a^x",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(a^x) = a^x \\ln(a)"
  },
  {
    id: "calc-d-20",
    name: "Derivative of Natural Logarithm",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\ln x) = \\frac{1}{x}"
  },
  {
    id: "calc-d-21",
    name: "Derivative of Logarithm Base a",
    category: "Calculus - Derivatives",
    formula: "\\frac{d}{dx}(\\log_a x) = \\frac{1}{x \\ln(a)}"
  },

  // Calculus - Integrals
  {
    id: "calc-i-1",
    name: "Power Rule for Integration",
    category: "Calculus - Integrals",
    formula: "\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)"
  },
  {
    id: "calc-i-2",
    name: "Integral of Sine",
    category: "Calculus - Integrals",
    formula: "\\int \\sin x \\, dx = -\\cos x + C"
  },
  {
    id: "calc-i-3",
    name: "Integral of Cosine",
    category: "Calculus - Integrals",
    formula: "\\int \\cos x \\, dx = \\sin x + C"
  },
  {
    id: "calc-i-4",
    name: "Integral of Tangent",
    category: "Calculus - Integrals",
    formula: "\\int \\tan x \\, dx = -\\ln|\\cos x| + C"
  },
  {
    id: "calc-i-5",
    name: "Integral of Cosecant",
    category: "Calculus - Integrals",
    formula: "\\int \\csc x \\, dx = -\\ln|\\csc x + \\cot x| + C"
  },
  {
    id: "calc-i-6",
    name: "Integral of Secant",
    category: "Calculus - Integrals",
    formula: "\\int \\sec x \\, dx = \\ln|\\sec x + \\tan x| + C"
  },
  {
    id: "calc-i-7",
    name: "Integral of Cotangent",
    category: "Calculus - Integrals",
    formula: "\\int \\cot x \\, dx = \\ln|\\sin x| + C"
  },
  {
    id: "calc-i-8",
    name: "Integral of e^x",
    category: "Calculus - Integrals",
    formula: "\\int e^x \\, dx = e^x + C"
  },
  {
    id: "calc-i-9",
    name: "Integral of 1/x",
    category: "Calculus - Integrals",
    formula: "\\int \\frac{1}{x} \\, dx = \\ln|x| + C"
  },
  {
    id: "calc-i-10",
    name: "Integral of a^x",
    category: "Calculus - Integrals",
    formula: "\\int a^x \\, dx = \\frac{a^x}{\\ln a} + C"
  },
  {
    id: "calc-i-11",
    name: "Integration by Parts",
    category: "Calculus - Integrals",
    formula: "\\int u \\, dv = uv - \\int v \\, du"
  },
  {
    id: "calc-i-12",
    name: "Integral Yielding Inverse Sine",
    category: "Calculus - Integrals",
    formula: "\\int \\frac{1}{\\sqrt{a^2 - x^2}} \\, dx = \\arcsin\\left(\\frac{x}{a}\\right) + C"
  },
  {
    id: "calc-i-13",
    name: "Integral Yielding Inverse Tangent",
    category: "Calculus - Integrals",
    formula: "\\int \\frac{1}{a^2 + x^2} \\, dx = \\frac{1}{a}\\arctan\\left(\\frac{x}{a}\\right) + C"
  },
  {
    id: "calc-i-14",
    name: "Integral Yielding Inverse Secant",
    category: "Calculus - Integrals",
    formula: "\\int \\frac{1}{x\\sqrt{x^2 - a^2}} \\, dx = \\frac{1}{a}\\text{arcsec}\\left(\\frac{|x|}{a}\\right) + C"
  },
  {
    id: "calc-i-15",
    name: "Average Value of a Function",
    category: "Calculus - Integrals",
    formula: "f_{\\text{avg}} = \\frac{1}{b - a} \\int_{a}^{b} f(x) \\, dx"
  },

  // Statistics & Probability
  {
    id: "stat-1",
    name: "Mean (Expected Value)",
    category: "Statistics & Probability",
    formula: "\\mu = \\frac{\\sum x_i}{N}"
  },
  {
    id: "stat-2",
    name: "Population Variance",
    category: "Statistics & Probability",
    formula: "\\sigma^2 = \\frac{\\sum (x_i - \\mu)^2}{N}"
  },
  {
    id: "stat-3",
    name: "Sample Variance",
    category: "Statistics & Probability",
    formula: "s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n - 1}"
  },
  {
    id: "stat-4",
    name: "Population Standard Deviation",
    category: "Statistics & Probability",
    formula: "\\sigma = \\sqrt{\\frac{\\sum (x_i - \\mu)^2}{N}}"
  },
  {
    id: "stat-5",
    name: "Sample Standard Deviation",
    category: "Statistics & Probability",
    formula: "s = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}"
  },
  {
    id: "stat-6",
    name: "Z-Score",
    category: "Statistics & Probability",
    formula: "z = \\frac{x - \\mu}{\\sigma}"
  },
  {
    id: "stat-7",
    name: "Permutations (nPr)",
    category: "Statistics & Probability",
    formula: "P(n, r) = \\frac{n!}{(n - r)!}"
  },
  {
    id: "stat-8",
    name: "Combinations (nCr)",
    category: "Statistics & Probability",
    formula: "C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}"
  },
  {
    id: "stat-9",
    name: "Bayes' Theorem",
    category: "Statistics & Probability",
    formula: "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}"
  },
  {
    id: "stat-10",
    name: "Binomial Probability",
    category: "Statistics & Probability",
    formula: "P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}"
  },

  // Physics / Kinematics
  {
    id: "phys-1",
    name: "Kinematics: Velocity",
    category: "Physics / Kinematics",
    formula: "v = u + at"
  },
  {
    id: "phys-2",
    name: "Kinematics: Displacement",
    category: "Physics / Kinematics",
    formula: "s = ut + \\frac{1}{2}at^2"
  },
  {
    id: "phys-3",
    name: "Kinematics: Velocity Squared",
    category: "Physics / Kinematics",
    formula: "v^2 = u^2 + 2as"
  },
  {
    id: "phys-4",
    name: "Newton's Second Law",
    category: "Physics / Kinematics",
    formula: "F = ma"
  },
  {
    id: "phys-5",
    name: "Mass-Energy Equivalence",
    category: "Physics / Kinematics",
    formula: "E = mc^2"
  },
  {
    id: "phys-6",
    name: "Work",
    category: "Physics / Kinematics",
    formula: "W = Fd \\cos(\\theta)"
  },
  {
    id: "phys-7",
    name: "Kinetic Energy",
    category: "Physics / Kinematics",
    formula: "KE = \\frac{1}{2}mv^2"
  },
  {
    id: "phys-8",
    name: "Potential Energy",
    category: "Physics / Kinematics",
    formula: "PE = mgh"
  },
  {
    id: "phys-9",
    name: "Power",
    category: "Physics / Kinematics",
    formula: "P = \\frac{W}{t}"
  },
  {
    id: "phys-10",
    name: "Momentum",
    category: "Physics / Kinematics",
    formula: "p = mv"
  },
  {
    id: "phys-11",
    name: "Centripetal Force",
    category: "Physics / Kinematics",
    formula: "F_c = \\frac{mv^2}{r}"
  },
  {
    id: "phys-12",
    name: "Gravitational Force",
    category: "Physics / Kinematics",
    formula: "F_g = G\\frac{m_1 m_2}{r^2}"
  },

  // Financial Math
  {
    id: "fin-1",
    name: "Simple Interest",
    category: "Financial Math",
    formula: "I = Prt"
  },
  {
    id: "fin-2",
    name: "Compound Interest",
    category: "Financial Math",
    formula: "A = P\\left(1 + \\frac{r}{n}\\right)^{nt}"
  },
  {
    id: "fin-3",
    name: "Continuous Compounding",
    category: "Financial Math",
    formula: "A = Pe^{rt}"
  },
  {
    id: "fin-4",
    name: "Future Value of Annuity",
    category: "Financial Math",
    formula: "FV = P \\times \\frac{(1 + r)^n - 1}{r}"
  },
  {
    id: "fin-5",
    name: "Present Value of Annuity",
    category: "Financial Math",
    formula: "PV = P \\times \\frac{1 - (1 + r)^{-n}}{r}"
  },
  {
    id: "fin-6",
    name: "Effective Annual Rate (EAR)",
    category: "Financial Math",
    formula: "EAR = \\left(1 + \\frac{i}{n}\\right)^n - 1"
  },
  {
    id: "fin-7",
    name: "Rule of 72",
    category: "Financial Math",
    formula: "t \\approx \\frac{72}{r}"
  },

  // Advanced Calculus
  {
    id: "adv-calc-1",
    name: "Taylor Series Definition",
    category: "Advanced Calculus",
    formula: "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n"
  },
  {
    id: "adv-calc-2",
    name: "Maclaurin Series Definition",
    category: "Advanced Calculus",
    formula: "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n"
  },
  {
    id: "adv-calc-3",
    name: "Laplace Transform Definition",
    category: "Advanced Calculus",
    formula: "\\mathcal{L}\\{f(t)\\} = \\int_0^\\infty e^{-st} f(t) \\, dt"
  },
  {
    id: "adv-calc-4",
    name: "Laplace Transform: 1",
    category: "Advanced Calculus",
    formula: "\\mathcal{L}\\{1\\} = \\frac{1}{s}"
  },
  {
    id: "adv-calc-5",
    name: "Laplace Transform: t^n",
    category: "Advanced Calculus",
    formula: "\\mathcal{L}\\{t^n\\} = \\frac{n!}{s^{n+1}}"
  },
  {
    id: "adv-calc-6",
    name: "Laplace Transform: e^{at}",
    category: "Advanced Calculus",
    formula: "\\mathcal{L}\\{e^{at}\\} = \\frac{1}{s - a}"
  },
  {
    id: "adv-calc-7",
    name: "Laplace Transform: sin(at)",
    category: "Advanced Calculus",
    formula: "\\mathcal{L}\\{\\sin(at)\\} = \\frac{a}{s^2 + a^2}"
  },
  {
    id: "adv-calc-8",
    name: "Laplace Transform: cos(at)",
    category: "Advanced Calculus",
    formula: "\\mathcal{L}\\{\\cos(at)\\} = \\frac{s}{s^2 + a^2}"
  },
  {
    id: "adv-calc-9",
    name: "Integration by Substitution",
    category: "Advanced Calculus",
    formula: "\\int f(g(x))g'(x) \\, dx = \\int f(u) \\, du"
  },
  {
    id: "adv-calc-10",
    name: "Fundamental Theorem of Calculus",
    category: "Advanced Calculus",
    formula: "\\int_a^b f(x) \\, dx = F(b) - F(a)"
  },
  {
    id: "adv-calc-11",
    name: "Arc Length",
    category: "Advanced Calculus",
    formula: "L = \\int_a^b \\sqrt{1 + [f'(x)]^2} \\, dx"
  },
  {
    id: "adv-calc-12",
    name: "Surface Area of Revolution",
    category: "Advanced Calculus",
    formula: "S = \\int_a^b 2\\pi f(x) \\sqrt{1 + [f'(x)]^2} \\, dx"
  },
  {
    id: "adv-calc-13",
    name: "Volume of Revolution (Disk Method)",
    category: "Advanced Calculus",
    formula: "V = \\pi \\int_a^b [f(x)]^2 \\, dx"
  },
  {
    id: "adv-calc-14",
    name: "Volume of Revolution (Washer Method)",
    category: "Advanced Calculus",
    formula: "V = \\pi \\int_a^b ([R(x)]^2 - [r(x)]^2) \\, dx"
  },
  {
    id: "adv-calc-15",
    name: "Divergence Theorem",
    category: "Advanced Calculus",
    formula: "\\iint_S \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_V \\nabla \\cdot \\mathbf{F} \\, dV"
  },
  {
    id: "adv-calc-16",
    name: "Stokes' Theorem",
    category: "Advanced Calculus",
    formula: "\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}"
  },
  {
    id: "adv-calc-17",
    name: "Green's Theorem",
    category: "Advanced Calculus",
    formula: "\\oint_C (P \\, dx + Q \\, dy) = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) \\, dA"
  }
];
