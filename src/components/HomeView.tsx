import { motion } from "motion/react";
import { UniversalInput } from "./UniversalInput";
import { ToolCard } from "./ToolCard";
import { mathTools } from "../lib/mathTools";
import { CATEGORIES, CLASSES } from "../lib/constants";
import { Calculator, Compass, BookOpen } from "lucide-react";

type HomeViewProps = {
  onSelectTool: (id: string) => void;
  onSelectCategory: (id: string) => void;
};

export function HomeView({ onSelectTool, onSelectCategory }: HomeViewProps) {
  // Get popular tools
  const popularIds = [
    "linear_eq",
    "quad_eq",
    "derivative",
    "integral",
    "matrix_ops",
    "basic_trig",
    "area_circle",
    "lcm_hcf",
  ];
  const popularTools = popularIds
    .map((id) => mathTools.find((t) => t.id === id)!)
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl space-y-16 pb-12">
      {/* Hero Section */}
      <section className="text-center pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            All-in-One Math Engine
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400 mb-10">
            Solve, Learn, and Explore Mathematics from Basics to JEE Level
          </p>

          <div className="mx-auto max-w-3xl">
            <UniversalInput />
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-zinc-500">
              <span>Try:</span>
              <button className="hover:text-indigo-400 transition-colors">"solve 2x + 5 = 15"</button>
              <span>•</span>
              <button className="hover:text-indigo-400 transition-colors">"derivative of x^2"</button>
              <span>•</span>
              <button className="hover:text-indigo-400 transition-colors">"area of circle radius 5"</button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Action Section */}
      <section className="grid gap-4 sm:grid-cols-3">
        <button
          onClick={() => onSelectCategory("all")}
          className="group flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/5 bg-white/5 p-8 text-center transition-all hover:bg-white/10 hover:border-indigo-500/30"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 transition-transform group-hover:scale-110">
            <Calculator className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Solve a Problem</h3>
            <p className="text-sm text-zinc-400 mt-1">Use our specialized calculators</p>
          </div>
        </button>
        <button
          onClick={() => onSelectCategory("all")}
          className="group flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/5 bg-white/5 p-8 text-center transition-all hover:bg-white/10 hover:border-emerald-500/30"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
            <Compass className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Explore Tools</h3>
            <p className="text-sm text-zinc-400 mt-1">Browse 50+ math tools</p>
          </div>
        </button>
        <button
          onClick={() => onSelectCategory("Formulas")}
          className="group flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/5 bg-white/5 p-8 text-center transition-all hover:bg-white/10 hover:border-amber-500/30"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 transition-transform group-hover:scale-110">
            <BookOpen className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Learn Formulas</h3>
            <p className="text-sm text-zinc-400 mt-1">Access the formula library</p>
          </div>
        </button>
      </section>

      {/* Popular Tools */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-tight">Popular Tools</h2>
          <button 
            onClick={() => onSelectCategory("all")}
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onClick={() => onSelectTool(tool.id)} />
          ))}
        </div>
      </section>

      {/* Classes */}
      <section>
        <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Classes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSES.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 text-left transition-all hover:bg-white/10 hover:border-white/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{category.name}</h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {mathTools.filter((t) => t.classLevel === category.id).length} tools
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Topics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 text-left transition-all hover:bg-white/10 hover:border-white/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{category.name}</h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {mathTools.filter((t) => t.category === category.id).length} tools
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="rounded-3xl border border-white/5 bg-white/5 p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Step-by-step Solutions</h3>
            <p className="text-zinc-400">Understand the process, not just the answer. Every tool provides detailed, easy-to-follow steps.</p>
          </div>
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Wide Topic Coverage</h3>
            <p className="text-zinc-400">From basic arithmetic to advanced calculus and linear algebra, we have tools for every level.</p>
          </div>
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Fast Calculations</h3>
            <p className="text-zinc-400">Get instant results for complex mathematical problems without any delay or loading screens.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
