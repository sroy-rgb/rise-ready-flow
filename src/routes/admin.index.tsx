import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const cards = [
    { to: "/admin/team", label: "Team Members", desc: "Add, edit, or remove team members shown on /team and CED Law." },
    { to: "/admin/jobs", label: "Job Listings", desc: "Manage open positions shown on /careers." },
    { to: "/admin/legislation", label: "Legislative Wins", desc: "Manage bills shown on /legislative-wins." },
  ];
  return (
    <div>
      <h1 style={{fontSize:28,margin:"0 0 8px"}}>Content Management</h1>
      <p style={{color:"#666",margin:"0 0 24px"}}>Prototype CMS. Changes save instantly to Lovable Cloud and appear on the public site on next page load.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
        {cards.map(c => (
          <Link key={c.to} to={c.to} style={{background:"#fff",border:"1px solid #e5e5e5",padding:20,borderRadius:8,textDecoration:"none",color:"#111"}}>
            <h3 style={{margin:"0 0 6px",fontSize:16}}>{c.label}</h3>
            <p style={{margin:0,fontSize:13,color:"#666"}}>{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}