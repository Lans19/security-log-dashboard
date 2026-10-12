const severities = ["All", "Low", "Medium", "High", "Critical"];

const eventTypes = [
  "All",
  "Failed Login",
  "Successful Login",
  "Port Scan",
  "Malware Detected",
  "Firewall Block",
  "Privilege Escalation",
  "Suspicious File Access",
  "Data Exfiltration Attempt"
];

export default function Filters({
  severityFilter,
  eventTypeFilter,
  searchTerm,
  onSeverityChange,
  onEventTypeChange,
  onSearchChange
}) {
  return (
    <section className="filters">
      <div className="filter-group">
        <label htmlFor="severity">Severity</label>
        <select
          id="severity"
          value={severityFilter}
          onChange={(event) => onSeverityChange(event.target.value)}
        >
          {severities.map((severity) => (
            <option key={severity} value={severity}>
              {severity}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="eventType">Event Type</label>
        <select
          id="eventType"
          value={eventTypeFilter}
          onChange={(event) => onEventTypeChange(event.target.value)}
        >
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group grow">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search IP, user, or host..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </section>
  );
}