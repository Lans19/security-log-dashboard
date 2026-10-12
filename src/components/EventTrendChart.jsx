import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function EventTrendChart({ logs }) {
  const trendData = logs.reduce((accumulator, log) => {
    const hour = new Date(log.timestamp);
    const label = `${String(hour.getHours()).padStart(2, "0")}:00`;

    const existing = accumulator.find((item) => item.hour === label);

    if (existing) {
      existing.events += 1;

      if (log.severity === "Critical") existing.critical += 1;
      if (log.severity === "High") existing.high += 1;
    } else {
      accumulator.push({
        hour: label,
        events: 1,
        critical: log.severity === "Critical" ? 1 : 0,
        high: log.severity === "High" ? 1 : 0
      });
    }

    return accumulator;
  }, []);

  const sortedData = trendData.sort((a, b) => a.hour.localeCompare(b.hour));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={sortedData}>
        <defs>
          <linearGradient id="eventGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="hour" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="events"
          name="Total Events"
          stroke="#3b82f6"
          fill="url(#eventGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}