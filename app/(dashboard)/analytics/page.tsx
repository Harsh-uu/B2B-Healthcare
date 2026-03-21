"use client";

import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { useUIStore } from "@/store/ui-store";
import { patients } from "@/data/patients";
import {
  patientTrends7d,
  patientTrends30d,
  departmentData,
  statusDistribution,
} from "@/data/patients";
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
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, AlertTriangle } from "lucide-react";

const COLORS = ["#059669", "#D97706", "#DC2626"];

const summaryStats = [
  {
    label: "Total Admissions",
    value: "83",
    change: "+12%",
    up: true,
    icon: TrendingUp,
  },
  {
    label: "Total Discharges",
    value: "74",
    change: "+8%",
    up: true,
    icon: Users,
  },
  {
    label: "Avg. Length of Stay",
    value: "4.2d",
    change: "-0.3d",
    up: false,
    icon: TrendingDown,
  },
  {
    label: "Readmission Rate",
    value: "3.1%",
    change: "-0.5%",
    up: false,
    icon: AlertTriangle,
  },
];

export default function AnalyticsPage() {
  const { analyticsRange, setAnalyticsRange } = useUIStore();
  const [isLoading, setIsLoading] = useState(true);

  const trendData = analyticsRange === "7d" ? patientTrends7d : patientTrends30d;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [analyticsRange]);

  function ChartSkeleton() {
    return <div className="w-full h-64 bg-gray-100 animate-pulse" />;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-text">Analytics</h1>
          <p className="text-xs text-text-muted mt-0.5">Patient trends and department insights</p>
        </div>
        <Toggle
          options={[
            { label: "7 Days", value: "7d" },
            { label: "30 Days", value: "30d" },
          ]}
          value={analyticsRange}
          onChange={(v) => setAnalyticsRange(v as "7d" | "30d")}
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryStats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-text-muted uppercase tracking-wide">
                {stat.label}
              </p>
              <span
                className={`text-[11px] font-semibold ${
                  stat.up ? "text-success" : "text-danger"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold text-text mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart */}
        <Card className="lg:col-span-2">
          <div className="mb-4">
            <CardTitle>Patient Trends</CardTitle>
          </div>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px" }}
                />
                <Line
                  type="monotone"
                  dataKey="admissions"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#2563EB" }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="discharges"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#059669" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Bar Chart */}
        <Card>
          <div className="mb-4">
            <CardTitle>Patients by Department</CardTitle>
          </div>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                  fontSize={10}
                  angle={-25}
                  textAnchor="end"
                  tickLine={false}
                  height={50}
                />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="patients" fill="#2563EB" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Pie Chart */}
        <Card>
          <div className="mb-4">
            <CardTitle>Status Distribution</CardTitle>
          </div>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "0",
                      border: "1px solid #E2E8F0",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom legend */}
              <div className="flex justify-center gap-6 mt-2">
                {statusDistribution.map((entry, i) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[i] }}
                    />
                    <span className="text-xs text-text-secondary">
                      {entry.name} ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
