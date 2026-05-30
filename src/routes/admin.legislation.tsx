import { createFileRoute } from "@tanstack/react-router";
import { AdminTable } from "@/components/AdminTable";

export const Route = createFileRoute("/admin/legislation")({ component: () => (
  <AdminTable title="Legislative Win" table="legislative_wins" fields={[
    { key: "bill_number", label: "Bill #" },
    { key: "title", label: "Title" },
    { key: "year", label: "Year", type: "number" },
    { key: "short_description", label: "Short Description", type: "textarea", hideInTable: true },
    { key: "full_description", label: "Full Description", type: "textarea", hideInTable: true },
    { key: "bill_url", label: "Bill URL", hideInTable: true },
    { key: "factsheet_url", label: "Factsheet URL", hideInTable: true },
    { key: "photo_url", label: "Photo URL", hideInTable: true },
    { key: "is_spotlight", label: "Spotlight", type: "checkbox" },
    { key: "sort_order", label: "Order", type: "number" },
  ]}/>
)});