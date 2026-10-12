import { useState } from "react";

const severityClass = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical"
};

export default function LogTable({ logs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(logs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleLogs = logs.slice(startIndex, startIndex + rowsPerPage);

  function formatTime(value) {
    return new Date(value).toLocaleString();
  }

  return (
    <div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Event</th>
              <th>Severity</th>
              <th>Source IP</th>
              <th>Host</th>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {visibleLogs.map((log) => (
              <tr key={log.id}>
                <td>{formatTime(log.timestamp)}</td>
                <td>{log.eventType}</td>
                <td>
                  <span className={`badge ${severityClass[log.severity]}`}>
                    {log.severity}
                  </span>
                </td>
                <td>{log.sourceIp}</td>
                <td>{log.destinationHost}</td>
                <td>{log.user}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}