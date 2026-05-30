import { createFileRoute } from "@tanstack/react-router";
import { AdminTable } from "@/components/AdminTable";

export const Route = createFileRoute("/admin/jobs")({ component: () => (
  <AdminTable title="Job Listing" table="job_listings" orderBy="posted_date" fields={[
    { key: "title", label: "Title" },
    { key: "department", label: "Department", type: "select", options: [
      { value: "legal", label: "Legal" },
      { value: "nav", label: "Navigation" },
      { value: "policy", label: "Policy" },
      { value: "ops", label: "Operations" },
      { value: "finance", label: "Finance" },
      { value: "exec", label: "Executive" },
    ]},
    { key: "location", label: "Location" },
    { key: "type", label: "Type", type: "select", options: [
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Contract", label: "Contract" },
      { value: "Fellowship", label: "Fellowship" },
    ]},
    { key: "apply_url", label: "Apply URL", hideInTable: true },
    { key: "posted_date", label: "Posted" },
    { key: "status", label: "Status", type: "select", options: [
      { value: "open", label: "Open" }, { value: "closed", label: "Closed" }, { value: "draft", label: "Draft" },
    ]},
  ]}/>
)});