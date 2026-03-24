import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 8000 },
];

const categoryData = [
  { name: "Electronics", value: 4500 },
  { name: "Clothing", value: 3200 },
  { name: "Home", value: 2800 },
  { name: "Books", value: 1500 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const Dashboard = () => {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        Analytics Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Sales" value="$32,400" change="+12%" />
        <StatCard title="Orders" value="1,234" change="+5%" />
        <StatCard title="Avg. Order Value" value="$262" change="+3%" />
        <StatCard title="Customers" value="8,932" change="+18%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Monthly Sales
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Sales by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Customer Segments
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change }) => (
  <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {title}
    </h3>
    <div className="mt-2 flex items-baseline justify-between">
      <p className="text-2xl font-semibold text-gray-800 dark:text-white">
        {value}
      </p>
      <span className="text-sm font-medium text-green-600 dark:text-green-400">
        {change}
      </span>
    </div>
  </div>
);

export default Dashboard;
