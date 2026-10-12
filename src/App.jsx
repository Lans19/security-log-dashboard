import { useMemo, useState } from "react";
import { securityLogs } from "./data/mockLogs";
import Filters from "./components/Filters";
import StatCard from "./components/StatCard";
import EventTrendChart from "./components/EventTrendChart";
import SeverityPieChart from "./components/SeverityPieChart";
import TopIpsChart from "./components/TopIpsChart";
import FailedLoginChart from "./components/FailedLoginChart";
import LogTable from "./components/LogTable";
import "./index.css";

export default function App() {
  const [severityFilter, setSeverityFilter] = useState("All");
  const [eventTypeFilter, setEventTypeFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = useMemo(() => {
    return securityLogs.filter((log) => {
      const matchesSeverity =
        severityFilter === "All" || log.severity === severityFilter;

      const matchesEventType =
        eventTypeFilter === "All" || log.eventType === eventTypeFilter;

      const matchesSearch =
        searchTerm === "" ||
        log.sourceIp.includes(searchTerm) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.destinationHost.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSeverity && matchesEventType && matchesSearch;
    });
  }, [severityFilter, eventTypeFilter, searchTerm]);

  const criticalCount = filteredLogs.filter(
    (log) => log.severity === "Critical"
  ).length;

  const highCount = filteredLogs.filter(
    (log) => log.severity === "High"
  ).length;

  const failedLoginCount = filteredLogs.filter(
    (log) => log.eventType === "Failed Login"
  ).length;

  const needsReviewCount = filteredLogs.filter(
    (log) => log.status === "Needs Review"
  ).length;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Security Log Analysis Dashboard</h1>
          <p>
            Simulated security-event monitoring for identifying unusual
            activity and prioritizing investigation.
          </p>
        </div>

        <div className="header-status">
          <span className="live-dot"></span>
          Simulated Live Monitoring
        </div>
      </header>

      <Filters
        severityFilter={severityFilter}
        eventTypeFilter={eventTypeFilter}
        searchTerm={searchTerm}
        onSeverityChange={setSeverityFilter}
        onEventTypeChange={setEventTypeFilter}
        onSearchChange={setSearchTerm}
      />

      <section className="stats-grid">
        <StatCard
          title="Total Events"
          value={filteredLogs.length}
          description="Events matching current filters"
          color="#3b82f6"
        />
        <StatCard
          title="Critical Events"
          value={criticalCount}
          description="Immediate investigation priority"
          color="#ef4444"
        />
        <StatCard
          title="High Severity"
          value={highCount}
          description="Potential security impact"
          color="#f59e0b"
        />
        <StatCard
          title="Failed Logins"
          value={failedLoginCount}
          description="Possible credential attacks"
          color="#8b5cf6"
        />
        <StatCard
          title="Needs Review"
          value={needsReviewCount}
          description="High or critical open events"
          color="#10b981"
        />
      </section>

      <section className="charts-grid">
        <div className="chart-card large">
          <h2>Security Events Over Time</h2>
          <EventTrendChart logs={filteredLogs} />
        </div>

        <div className="chart-card">
          <h2>Events by Severity</h2>
          <SeverityPieChart logs={filteredLogs} />
        </div>

        <div className="chart-card">
          <h2>Top Source IP Addresses</h2>
          <TopIpsChart logs={filteredLogs} />
        </div>

        <div className="chart-card">
          <h2>Failed Login Attempts by User</h2>
          <FailedLoginChart logs={filteredLogs} />
        </div>
      </section>

      <section className="table-card">
        <h2>Suspicious Activity Log</h2>
        <LogTable logs={filteredLogs} />
      </section>

      <footer className="dashboard-footer">
        <p>
          This dashboard uses simulated data for learning and demonstration
          purposes. It does not connect to a live security system.
        </p>
      </footer>
    </div>
  );
}
