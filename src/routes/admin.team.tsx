import { createFileRoute } from "@tanstack/react-router";
import { AdminTable } from "@/components/AdminTable";

export const Route = createFileRoute("/admin/team")({ component: () => (
  <AdminTable title="Team Member" table="team_members" fields={[
    { key: "name", label: "Name" },
    { key: "title", label: "Title" },
    { key: "department", label: "Department", type: "select", options: [
      { value: "executive", label: "Executive" },
      { value: "cedlaw", label: "CED Law" },
      { value: "care", label: "CARE" },
      { value: "community", label: "Community Services" },
      { value: "finance", label: "Finance" },
      { value: "policy", label: "Policy" },
      { value: "ops", label: "Operations" },
    ]},
    { key: "photo_url", label: "Photo URL", hideInTable: true },
    { key: "bio", label: "Bio", type: "textarea", hideInTable: true },
    { key: "linkedin_url", label: "LinkedIn URL", hideInTable: true },
    { key: "is_leadership", label: "Leadership", type: "checkbox" },
    { key: "sort_order", label: "Order", type: "number" },
    { key: "status", label: "Status", type: "select", options: [
      { value: "active", label: "Active" }, { value: "alumni", label: "Alumni" },
    ]},
  ]}/>
)});