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

export default function FailedLoginChart({ logs }) {
  const failedLoginData = useMemo(() => {
    const counts = {};

    logs
      .filter((log) => log.eventType === "Failed Login")
      .forEach((log) => {
        counts[log.user] = (counts[log.user] || 0) + 1;
      });

    return Object.entries(counts)
      .map(([user, count]) => ({ user, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [logs]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={failedLoginData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="user" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar
          dataKey="count"
          name="Failed Logins"
          fill="#8b5cf6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}