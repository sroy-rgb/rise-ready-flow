import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "select";
  options?: { value: string; label: string }[];
  hideInTable?: boolean;
};

export function AdminTable({ table, fields, title, orderBy = "sort_order" }: {
  table: string; fields: Field[]; title: string; orderBy?: string;
}) {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await (supabase as any).from(table).select("*").order(orderBy, { ascending: true });
    if (error) console.error(error);
    setRows(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, [table]);

  // Realtime: refresh when anyone (admin or frontend) changes this table
  useEffect(() => {
    const channel = (supabase as any)
      .channel(`admin-${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => load())
      .subscribe();
    return () => { (supabase as any).removeChannel(channel); };
  }, [table]);

  function blank() {
    const o: any = {};
    fields.forEach(f => {
      o[f.key] = f.type === "checkbox" ? false : f.type === "number" ? 0 : "";
    });
    return o;
  }

  async function save() {
    if (!editing) return;
    const payload = { ...editing };
    delete payload.created_at; delete payload.updated_at;
    if (editing.id) {
      const { error } = await (supabase as any).from(table).update(payload).eq("id", editing.id);
      if (error) { alert(error.message); return; }
    } else {
      delete payload.id;
      const { error } = await (supabase as any).from(table).insert(payload);
      if (error) { alert(error.message); return; }
    }
    setEditing(null); load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this entry?")) return;
    const { error } = await (supabase as any).from(table).delete().eq("id", id);
    if (error) { alert(error.message); return; }
    load();
  }

  const tableFields = fields.filter(f => !f.hideInTable);

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",marginBottom:16}}>
        <h1 style={{fontSize:24,margin:0,flex:1}}>{title}</h1>
        <button onClick={()=>setEditing(blank())} style={btnPri}>+ Add New</button>
      </div>
      {loading ? <p>Loading…</p> : (
        <div style={{background:"#fff",border:"1px solid #e5e5e5",borderRadius:8,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead style={{background:"#f5f5f5"}}>
              <tr>{tableFields.map(f => <th key={f.key} style={th}>{f.label}</th>)}<th style={th}>Actions</th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} style={{borderTop:"1px solid #eee"}}>
                  {tableFields.map(f => (
                    <td key={f.key} style={td}>
                      {f.type === "checkbox" ? (r[f.key] ? "✓" : "") :
                       String(r[f.key] ?? "").slice(0, 80)}
                    </td>
                  ))}
                  <td style={td}>
                    <button onClick={()=>setEditing(r)} style={btnSm}>Edit</button>
                    <button onClick={()=>remove(r.id)} style={{...btnSm,marginLeft:6,color:"#c00"}}>Delete</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={tableFields.length+1} style={{...td,textAlign:"center",color:"#999",padding:24}}>No entries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50,padding:20}} onClick={()=>setEditing(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:8,padding:24,width:"100%",maxWidth:600,maxHeight:"90vh",overflow:"auto"}}>
            <h2 style={{margin:"0 0 16px",fontSize:18}}>{editing.id ? "Edit" : "Add"} {title}</h2>
            {fields.map(f => (
              <div key={f.key} style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:12,fontWeight:600,marginBottom:4}}>{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea value={editing[f.key] ?? ""} onChange={e=>setEditing({...editing,[f.key]:e.target.value})} rows={3} style={inp}/>
                ) : f.type === "checkbox" ? (
                  <input type="checkbox" checked={!!editing[f.key]} onChange={e=>setEditing({...editing,[f.key]:e.target.checked})}/>
                ) : f.type === "select" ? (
                  <select value={editing[f.key] ?? ""} onChange={e=>setEditing({...editing,[f.key]:e.target.value})} style={inp}>
                    {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : f.type === "number" ? (
                  <input type="number" value={editing[f.key] ?? 0} onChange={e=>setEditing({...editing,[f.key]:Number(e.target.value)})} style={inp}/>
                ) : (
                  <input type="text" value={editing[f.key] ?? ""} onChange={e=>setEditing({...editing,[f.key]:e.target.value})} style={inp}/>
                )}
              </div>
            ))}
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}>
              <button onClick={()=>setEditing(null)} style={btnSec}>Cancel</button>
              <button onClick={save} style={btnPri}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const th: React.CSSProperties = {padding:"10px 12px",textAlign:"left",fontSize:11,textTransform:"uppercase",color:"#666",fontWeight:600};
const td: React.CSSProperties = {padding:"10px 12px",verticalAlign:"top"};
const inp: React.CSSProperties = {width:"100%",padding:8,border:"1px solid #ddd",borderRadius:4,fontSize:13,fontFamily:"inherit"};
const btnPri: React.CSSProperties = {background:"#0a0a0a",color:"#fff",border:0,padding:"8px 14px",borderRadius:4,fontSize:13,fontWeight:600,cursor:"pointer"};
const btnSec: React.CSSProperties = {background:"#fff",color:"#111",border:"1px solid #ddd",padding:"8px 14px",borderRadius:4,fontSize:13,cursor:"pointer"};
const btnSm: React.CSSProperties = {background:"transparent",border:0,fontSize:12,cursor:"pointer",color:"#0066cc",padding:0};