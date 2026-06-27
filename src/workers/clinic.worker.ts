import { type Patient } from "../hooks/usePatientData";

interface WorkerInputMessage {
  patients: Patient[];
  severityFilter: "ALL" | "CRITICAL" | "STABLE";
  searchQuery: string;
}

export interface WorkerOutputMessage {
  filteredPatients: Patient[];
  totalCount: number;
  criticalCount: number;
  stableCount: number;
}

self.onmessage = (event: MessageEvent<WorkerInputMessage>) => {
  const { patients, severityFilter } = event.data;

  if (!patients) return;

  const totalCount = patients.length;
  const criticalCount = patients.filter(
    (p) => p.severity === "CRITICAL",
  ).length;
  const stableCount = totalCount - criticalCount;

  let filteredPatients = patients;
  if (severityFilter !== "ALL") {
    filteredPatients = patients.filter((p) => p.severity === severityFilter);
  }

  self.postMessage({
    filteredPatients,
    totalCount,
    criticalCount,
    stableCount,
  });
};
