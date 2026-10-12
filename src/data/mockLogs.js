// Simulated security logs for dashboard demonstration only.
// In a real project, replace this with data from a SIEM, API, database, or log pipeline.

const eventTypes = [
  "Failed Login",
  "Successful Login",
  "Port Scan",
  "Malware Detected",
  "Firewall Block",
  "Privilege Escalation",
  "Suspicious File Access",
  "Data Exfiltration Attempt"
];

const severities = ["Low", "Medium", "High", "Critical"];

const sourceIps = [
  "192.168.1.24",
  "192.168.1.51",
  "10.0.0.18",
  "10.0.0.44",
  "203.0.113.77",
  "198.51.100.23",
  "45.33.32.156",
  "185.220.101.7"
];

const users = [
  "admin",
  "svc_backup",
  "j.mkhonta",
  "t.dlamini",
  "root",
  "hr_portal",
  "finance_user",
  "unknown"
];

const hosts = [
  "web-server-01",
  "db-server-01",
  "file-server-01",
  "domain-controller",
  "vpn-gateway",
  "workstation-42"
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomSeverity() {
  const value = Math.random();

  if (value > 0.92) return "Critical";
  if (value > 0.75) return "High";
  if (value > 0.45) return "Medium";
  return "Low";
}

function generateLogs(count = 350) {
  const logs = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(
      now.getTime() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)
    );

    const severity = randomSeverity();

    logs.push({
      id: `EVT-${1000 + i}`,
      timestamp: timestamp.toISOString(),
      eventType: randomItem(eventTypes),
      severity,
      sourceIp: randomItem(sourceIps),
      destinationHost: randomItem(hosts),
      user: randomItem(users),
      message: "Simulated security event generated for dashboard testing.",
      status: severity === "Critical" || severity === "High"
        ? "Needs Review"
        : "Reviewed"
    });
  }

  return logs.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
}

export const securityLogs = generateLogs(350);