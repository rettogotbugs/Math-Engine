import { MathTool } from "../mathTools";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter, ZAxis } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57'];

export const chartTools: MathTool[] = [
  {
    id: "pie_chart",
    name: "Pie Chart Generator",
    category: "Charts & Graphs",
    description: "Generate an interactive pie chart from data.",
    inputs: [
      {
        id: "labels",
        label: "Labels (comma separated)",
        type: "text",
        placeholder: "e.g., Apples, Oranges, Bananas",
      },
      {
        id: "values",
        label: "Values (comma separated)",
        type: "text",
        placeholder: "e.g., 30, 20, 50",
      },
    ],
    calculate: (values) => {
      try {
        const labels = values.labels.split(",").map(s => s.trim());
        const dataValues = values.values.split(",").map(s => parseFloat(s.trim()));

        if (labels.length !== dataValues.length || labels.length === 0) {
          return { result: "Number of labels must match number of values." };
        }

        const data = labels.map((name, i) => ({ name, value: dataValues[i] }));

        const chart = React.createElement(
          "div",
          { className: "flex justify-center w-full h-64" },
          React.createElement(
            PieChart,
            { width: 400, height: 250 },
            React.createElement(
              Pie,
              {
                data: data,
                cx: "50%",
                cy: "50%",
                labelLine: false,
                outerRadius: 80,
                fill: "#8884d8",
                dataKey: "value",
                label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`
              },
              data.map((entry, index) => React.createElement(Cell, { key: `cell-${index}`, fill: COLORS[index % COLORS.length] }))
            ),
            React.createElement(Tooltip),
            React.createElement(Legend)
          )
        );

        return {
          result: chart,
          steps: ["Parsed labels and values.", "Generated Pie Chart."],
        };
      } catch (e) {
        return { result: "Invalid input." };
      }
    },
  },
  {
    id: "bar_graph",
    name: "Bar Graph Generator",
    category: "Charts & Graphs",
    description: "Generate a bar graph from categories and values.",
    inputs: [
      {
        id: "categories",
        label: "Categories (comma separated)",
        type: "text",
        placeholder: "e.g., Q1, Q2, Q3, Q4",
      },
      {
        id: "values",
        label: "Values (comma separated)",
        type: "text",
        placeholder: "e.g., 100, 200, 150, 300",
      },
    ],
    calculate: (values) => {
      try {
        const categories = values.categories.split(",").map(s => s.trim());
        const dataValues = values.values.split(",").map(s => parseFloat(s.trim()));

        if (categories.length !== dataValues.length || categories.length === 0) {
          return { result: "Number of categories must match number of values." };
        }

        const data = categories.map((name, i) => ({ name, value: dataValues[i] }));

        const chart = React.createElement(
          "div",
          { className: "flex justify-center w-full h-64" },
          React.createElement(
            BarChart,
            { width: 400, height: 250, data: data },
            React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#444" }),
            React.createElement(XAxis, { dataKey: "name", stroke: "#888" }),
            React.createElement(YAxis, { stroke: "#888" }),
            React.createElement(Tooltip, { contentStyle: { backgroundColor: '#333', border: 'none' } }),
            React.createElement(Legend),
            React.createElement(Bar, { dataKey: "value", fill: "#8884d8" })
          )
        );

        return {
          result: chart,
          steps: ["Parsed categories and values.", "Generated Bar Graph."],
        };
      } catch (e) {
        return { result: "Invalid input." };
      }
    },
  },
  {
    id: "scatter_plot",
    name: "Scatter Plot Generator",
    category: "Charts & Graphs",
    description: "Generate a scatter plot from (x, y) pairs.",
    inputs: [
      {
        id: "points",
        label: "Points (x,y pairs separated by semicolon)",
        type: "text",
        placeholder: "e.g., 1,2; 2,3; 3,5; 4,7",
      },
    ],
    calculate: (values) => {
      try {
        const pairs = values.points.split(";").map(s => s.trim()).filter(s => s.length > 0);
        const data = pairs.map(pair => {
          const [x, y] = pair.split(",").map(s => parseFloat(s.trim()));
          return { x, y };
        });

        if (data.some(p => isNaN(p.x) || isNaN(p.y))) {
          return { result: "Invalid point format. Use x,y; x,y" };
        }

        const chart = React.createElement(
          "div",
          { className: "flex justify-center w-full h-64" },
          React.createElement(
            ScatterChart,
            { width: 400, height: 250 },
            React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#444" }),
            React.createElement(XAxis, { type: "number", dataKey: "x", name: "X", stroke: "#888" }),
            React.createElement(YAxis, { type: "number", dataKey: "y", name: "Y", stroke: "#888" }),
            React.createElement(Tooltip, { cursor: { strokeDasharray: '3 3' }, contentStyle: { backgroundColor: '#333', border: 'none' } }),
            React.createElement(Scatter, { name: "Data", data: data, fill: "#8884d8" })
          )
        );

        return {
          result: chart,
          steps: ["Parsed (x, y) pairs.", "Generated Scatter Plot."],
        };
      } catch (e) {
        return { result: "Invalid input." };
      }
    },
  },
];
