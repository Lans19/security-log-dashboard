import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function TopIpsChart({ logs }) {
  const topIps = useMemo(() => {
    const counts = {};

    logs.forEach((log) => {
      counts[log.sourceIp] = (counts[log.sourceIp] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [logs]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={topIps} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="ip"
          width={110}
        />
        <Tooltip />
        <Bar dataKey="count" name="Events" fill="#6366f1" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}