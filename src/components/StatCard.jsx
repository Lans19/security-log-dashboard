export default function StatCard({ title, value, description, color }) {
  return (
    <div className="stat-card">
      <div className="stat-accent" style={{ backgroundColor: color }}></div>
      <div>
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
        <p className="stat-description">{description}</p>
      </div>
    </div>
  );
}