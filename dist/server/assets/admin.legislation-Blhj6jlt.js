import { jsx } from "react/jsx-runtime";
import { A as AdminTable } from "./AdminTable-B-3zUe1_.js";
import "react";
import "./client-BP2HGQtw.js";
import "@supabase/supabase-js";
const SplitComponent = () => /* @__PURE__ */ jsx(AdminTable, { title: "Legislative Win", table: "legislative_wins", fields: [{
  key: "bill_number",
  label: "Bill #"
}, {
  key: "title",
  label: "Title"
}, {
  key: "year",
  label: "Year",
  type: "number"
}, {
  key: "short_description",
  label: "Short Description",
  type: "textarea",
  hideInTable: true
}, {
  key: "full_description",
  label: "Full Description",
  type: "textarea",
  hideInTable: true
}, {
  key: "bill_url",
  label: "Bill URL",
  hideInTable: true
}, {
  key: "factsheet_url",
  label: "Factsheet URL",
  hideInTable: true
}, {
  key: "photo_url",
  label: "Photo URL",
  hideInTable: true
}, {
  key: "is_spotlight",
  label: "Spotlight",
  type: "checkbox"
}, {
  key: "sort_order",
  label: "Order",
  type: "number"
}] });
export {
  SplitComponent as component
};
