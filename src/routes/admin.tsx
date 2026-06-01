import { createFileRoute, Outlet, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  const [status, setStatus] = useState<"loading" | "signed-out" | "not-admin" | "ok">("loading");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function check() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setStatus("signed-out"); return; }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    setStatus(roles ? "ok" : "not-admin");
  }

  useEffect(() => {
    check();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { check(); });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) setErr(error.message);
    else { setPw(""); }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.invalidate();
  }

  if (status === "loading") {
    return <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0a",color:"#fff",fontFamily:"system-ui"}}>Loading…</div>;
  }

  if (status === "signed-out") {
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0a",color:"#fff",fontFamily:"system-ui"}}>
        <form onSubmit={handleSignIn}
              style={{background:"#1a1a1a",padding:32,borderRadius:8,width:360,border:"1px solid #333"}}>
          <h1 style={{margin:"0 0 16px",fontSize:20}}>CEDP Admin</h1>
          <p style={{fontSize:13,opacity:.7,margin:"0 0 16px"}}>Sign in with your admin account.</p>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} autoFocus required
            style={{width:"100%",padding:10,background:"#0a0a0a",border:"1px solid #444",color:"#fff",borderRadius:4,marginBottom:10}}/>
          <input type="password" placeholder="Password" value={pw} onChange={(e)=>setPw(e.target.value)} required
            style={{width:"100%",padding:10,background:"#0a0a0a",border:"1px solid #444",color:"#fff",borderRadius:4,marginBottom:12}}/>
          {err && <div style={{color:"#ff6b6b",fontSize:12,marginBottom:8}}>{err}</div>}
          <button type="submit" disabled={busy} style={{width:"100%",padding:10,background:"#c9a84c",color:"#000",border:0,borderRadius:4,fontWeight:600,cursor:busy?"wait":"pointer"}}>{busy?"Signing in…":"Sign in"}</button>
        </form>
      </div>
    );
  }

  if (status === "not-admin") {
    return (
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#0a0a0a",color:"#fff",fontFamily:"system-ui",gap:16}}>
        <h1 style={{fontSize:20,margin:0}}>Access denied</h1>
        <p style={{fontSize:13,opacity:.7,margin:0,maxWidth:360,textAlign:"center"}}>This account is not an admin. Ask an existing admin to grant you the <code>admin</code> role in <code>user_roles</code>.</p>
        <button onClick={handleSignOut} style={{background:"transparent",border:"1px solid #444",color:"#fff",padding:"6px 14px",borderRadius:4,cursor:"pointer"}}>Sign out</button>
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
          <Link to="/admin/get-help" style={{color:"#fff",textDecoration:"none"}} activeProps={{style:{color:"#c9a84c",textDecoration:"none"}}}>Get Help</Link>
        </nav>
        <div style={{marginLeft:"auto",display:"flex",gap:12,fontSize:13}}>
          <a href="/" style={{color:"#aaa"}}>View site →</a>
          <button onClick={handleSignOut} style={{background:"transparent",border:"1px solid #444",color:"#fff",padding:"4px 10px",borderRadius:4,cursor:"pointer"}}>Log out</button>
        </div>
      </header>
      <main style={{maxWidth:1200,margin:"0 auto",padding:"32px 24px"}}>
        <Outlet />
      </main>
    </div>
  );
}