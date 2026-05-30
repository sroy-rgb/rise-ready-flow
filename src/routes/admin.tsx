import { createFileRoute, Outlet, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { isUnlocked, unlock, lock } from "@/lib/admin-gate";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  const [ok, setOk] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  useEffect(() => { setOk(isUnlocked()); }, []);

  if (!ok) {
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0a",color:"#fff",fontFamily:"system-ui"}}>
        <form onSubmit={(e)=>{e.preventDefault(); if(unlock(pw)){setOk(true);} else setErr("Wrong password");}}
              style={{background:"#1a1a1a",padding:32,borderRadius:8,width:340,border:"1px solid #333"}}>
          <h1 style={{margin:"0 0 16px",fontSize:20}}>CEDP Admin</h1>
          <p style={{fontSize:13,opacity:.7,margin:"0 0 16px"}}>Enter the admin password to continue.</p>
          <input type="password" value={pw} onChange={(e)=>setPw(e.target.value)} autoFocus
            style={{width:"100%",padding:10,background:"#0a0a0a",border:"1px solid #444",color:"#fff",borderRadius:4,marginBottom:12}}/>
          {err && <div style={{color:"#ff6b6b",fontSize:12,marginBottom:8}}>{err}</div>}
          <button type="submit" style={{width:"100%",padding:10,background:"#c9a84c",color:"#000",border:0,borderRadius:4,fontWeight:600,cursor:"pointer"}}>Unlock</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"#fafafa",color:"#111",fontFamily:"system-ui"}}>
      <header style={{background:"#0a0a0a",color:"#fff",padding:"14px 24px",display:"flex",alignItems:"center",gap:24}}>
        <strong style={{fontSize:16}}>CEDP CMS</strong>
        <nav style={{display:"flex",gap:16,fontSize:14}}>
          <Link to="/admin" style={{color:"#fff",textDecoration:"none"}} activeOptions={{exact:true}} activeProps={{style:{color:"#c9a84c",textDecoration:"none"}}}>Dashboard</Link>
          <Link to="/admin/team" style={{color:"#fff",textDecoration:"none"}} activeProps={{style:{color:"#c9a84c",textDecoration:"none"}}}>Team</Link>
          <Link to="/admin/jobs" style={{color:"#fff",textDecoration:"none"}} activeProps={{style:{color:"#c9a84c",textDecoration:"none"}}}>Jobs</Link>
          <Link to="/admin/legislation" style={{color:"#fff",textDecoration:"none"}} activeProps={{style:{color:"#c9a84c",textDecoration:"none"}}}>Legislation</Link>
        </nav>
        <div style={{marginLeft:"auto",display:"flex",gap:12,fontSize:13}}>
          <a href="/" style={{color:"#aaa"}}>View site →</a>
          <button onClick={()=>{lock(); setOk(false); router.invalidate();}} style={{background:"transparent",border:"1px solid #444",color:"#fff",padding:"4px 10px",borderRadius:4,cursor:"pointer"}}>Log out</button>
        </div>
      </header>
      <main style={{maxWidth:1200,margin:"0 auto",padding:"32px 24px"}}>
        <Outlet />
      </main>
    </div>
  );
}