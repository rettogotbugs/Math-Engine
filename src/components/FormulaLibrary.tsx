import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const FORMULAS = [
  {
    category: "Algebra",
    items: [
      {
        name: "Quadratic Formula",
        formula: "x = (-b ± √(b² - 4ac)) / 2a",
        desc: "Used to find the roots of a quadratic equation ax² + bx + c = 0.",
      },
      {
        name: "Difference of Squares",
        formula: "a² - b² = (a - b)(a + b)",
        desc: "Factoring a difference of two squares.",
      },
      {
        name: "Perfect Square Trinomial",
        formula: "(a ± b)² = a² ± 2ab + b²",
        desc: "Expanding a binomial squared.",
      },
      {
        name: "Sum of Cubes",
        formula: "a³ + b³ = (a + b)(a² - ab + b²)",
        desc: "Factoring a sum of two cubes.",
      },
    ],
  },
  {
    category: "Trigonometry",
    items: [
      {
        name: "Pythagorean Identity",
        formula: "sin²(θ) + cos²(θ) = 1",
        desc: "Fundamental identity relating sine and cosine.",
      },
      {
        name: "Double Angle (Sine)",
        formula: "sin(2θ) = 2sin(θ)cos(θ)",
        desc: "Sine of a double angle.",
      },
      {
        name: "Double Angle (Cosine)",
        formula: "cos(2θ) = cos²(θ) - sin²(θ)",
        desc: "Cosine of a double angle.",
      },
      {
        name: "Tangent Identity",
        formula: "tan(θ) = sin(θ) / cos(θ)",
        desc: "Definition of tangent.",
      },
    ],
  },
  {
    category: "Calculus",
    items: [
      {
        name: "Power Rule (Derivative)",
        formula: "d/dx (x^n) = n * x^(n-1)",
        desc: "Derivative of a power function.",
      },
      {
        name: "Product Rule",
        formula: "d/dx (u*v) = u * dv/dx + v * du/dx",
        desc: "Derivative of a product of two functions.",
      },
      {
        name: "Quotient Rule",
        formula: "d/dx (u/v) = (v * du/dx - u * dv/dx) / v²",
        desc: "Derivative of a quotient of two functions.",
      },
      {
        name: "Chain Rule",
        formula: "d/dx f(g(x)) = f'(g(x)) * g'(x)",
        desc: "Derivative of a composite function.",
      },
      {
        name: "Power Rule (Integral)",
        formula: "∫ x^n dx = (x^(n+1)) / (n+1) + C",
        desc: "Integral of a power function (n ≠ -1).",
      },
    ],
  },
  {
    category: "Geometry",
    items: [
      {
        name: "Area of Circle",
        formula: "A = πr²",
        desc: "Area of a circle with radius r.",
      },
      {
        name: "Circumference of Circle",
        formula: "C = 2πr",
        desc: "Perimeter of a circle.",
      },
      {
        name: "Volume of Sphere",
        formula: "V = (4/3)πr³",
        desc: "Volume of a sphere with radius r.",
      },
      {
        name: "Pythagorean Theorem",
        formula: "a² + b² = c²",
        desc: "Relates the sides of a right triangle.",
      },
    ],
  },
];

export function FormulaLibrary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...FORMULAS.map((f) => f.category)];

  const filteredFormulas = FORMULAS.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        (activeCategory === "All" || cat.category === activeCategory) &&
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.formula.toLowerCase().includes(search.toLowerCase()) ||
          item.desc.toLowerCase().includes(search.toLowerCase())),
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-indigo-400" />
          Formula Library
        </h1>
        <p className="mt-2 text-zinc-400">
          Browse and search essential mathematical formulas
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search formulas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-12">
        {filteredFormulas.map((category) => (
          <div key={category.category}>
            <h2 className="mb-6 text-2xl font-bold text-white border-b border-white/10 pb-2">
              {category.category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-xl hover:border-indigo-500/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.name}
                  </h3>
                  <div className="rounded-xl bg-indigo-500/10 p-4 mb-4 border border-indigo-500/20">
                    <code className="text-lg font-bold text-indigo-400 font-mono block text-center">
                      {item.formula}
                    </code>
                  </div>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {filteredFormulas.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-lg">No formulas found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
