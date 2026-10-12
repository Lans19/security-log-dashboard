import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const colors = {
  Low: "#22c55e",
  Medium: "#eab308",
  High: "#f97316",
  Critical: "#ef4444"
};

export default function SeverityPieChart({ logs }) {
  const severityData = ["Low", "Medium", "High", "Critical"].map(
    (severity) => ({
      name: severity,
      value: logs.filter((log) => log.severity === severity).length
    })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={severityData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {severityData.map((entry) => (
            <Cell
              key={entry.name}
              fill={colors[entry.name]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}