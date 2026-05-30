// Live CMS data loader for static prototype pages
(function(){
  var SUPA = "https://dynyrkucykktpqptywlx.supabase.co";
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5bnlya3VjeWtrdHBxcHR5d2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTQ4NTgsImV4cCI6MjA5NTczMDg1OH0.MTjen-l4L4QtMxdJ82-Wz-ng7-brzIZQ6weLwhuUOrA";
  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c];});}
  function fetchTable(t, order){
    return fetch(SUPA+"/rest/v1/"+t+"?select=*&order="+order,{headers:{apikey:KEY,Authorization:"Bearer "+KEY}}).then(function(r){return r.json();});
  }

  function renderTeam(){
    var grid=document.getElementById("peopleGrid"); if(!grid) return;
    fetchTable("team_members","sort_order.asc").then(function(rows){
      if(!Array.isArray(rows)||!rows.length) return;
      grid.innerHTML = rows.filter(function(r){return r.status!=="alumni";}).map(function(p){
        return '<div class="person" data-cat="'+esc(p.department)+'" onclick="openProfile(this)"'+
          ' data-name="'+esc(p.name)+'" data-title="'+esc(p.title)+'" data-bio="'+esc(p.bio)+'"'+
          ' data-img="'+esc(p.photo_url)+'" data-li="'+esc(p.linkedin_url)+'">'+
          '<div class="person-img"><img src="'+esc(p.photo_url)+'" alt="'+esc(p.name)+'" loading="lazy"/></div>'+
          '<div class="person-info"><h3>'+esc(p.name)+'</h3><span>'+esc(p.title)+'</span></div></div>';
      }).join("");
    }).catch(function(e){console.warn("CMS team load failed",e);});
  }

  function renderJobs(){
    var list=document.querySelector(".pos-list"); if(!list) return;
    fetchTable("job_listings","posted_date.desc").then(function(rows){
      if(!Array.isArray(rows)||!rows.length) return;
      var deptLabel={legal:"Legal — CED Law",nav:"Navigation",policy:"Policy",ops:"Operations",finance:"Finance",exec:"Executive"};
      list.innerHTML = rows.filter(function(r){return r.status==="open";}).map(function(j){
        var u = j.apply_url && j.apply_url!=="#" ? j.apply_url : "#";
        return '<div class="pos-item" data-dept="'+esc(j.department)+'" onclick="window.open(\''+esc(u)+'\',\'_blank\')">'+
          '<h3>'+esc(j.title)+'</h3>'+
          '<span class="pos-dept">'+esc(deptLabel[j.department]||j.department)+'</span>'+
          '<span class="pos-loc">'+esc(j.location)+'</span>'+
          '<span class="pos-type">'+esc(j.type)+'</span>'+
          '<div class="pos-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div></div>';
      }).join("");
    }).catch(function(e){console.warn("CMS jobs load failed",e);});
  }

  function renderLegislation(){
    var wins=document.getElementById("wins"); if(!wins) return;
    fetchTable("legislative_wins","sort_order.asc").then(function(rows){
      if(!Array.isArray(rows)||!rows.length) return;
      var years={}; rows.forEach(function(b){(years[b.year]=years[b.year]||[]).push(b);});
      var yrs=Object.keys(years).sort(function(a,b){return Number(b)-Number(a);});
      var tabs='<div class="yr-tabs">'+yrs.map(function(y,i){return '<button class="yr-tab'+(i===0?" active":"")+'" onclick="setYear(\''+y+'\',this)">'+y+'</button>';}).join("")+'</div>';
      var panels=yrs.map(function(y,i){
        return '<div class="yr-panel'+(i===0?" active":"")+'" id="yr'+y+'">'+years[y].map(function(b){
          var photos = b.photo_url ? '<div class="bill-photos"><img src="'+esc(b.photo_url)+'" alt=""/></div>' : '';
          var fs = b.factsheet_url ? '<a class="bill-link" href="'+esc(b.factsheet_url)+'" target="_blank">Fact Sheet</a>' : '';
          var bt = b.bill_url ? '<a class="bill-link" href="'+esc(b.bill_url)+'" target="_blank">Bill Text</a>' : '';
          return '<div class="bill-row" onclick="toggleBill(this)">'+
            '<div class="bill-head"><span class="bill-num">'+esc(b.bill_number)+'</span><h3>'+esc(b.title)+'</h3>'+
            '<a class="bill-arrow" href="'+esc(b.bill_url||"#")+'" target="_blank" onclick="event.stopPropagation()"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>'+
            '<div class="bill-body"><div class="bill-inner"><p>'+esc(b.full_description||b.short_description)+'</p>'+photos+
            '<div class="bill-links">'+fs+bt+'</div></div></div></div>';
        }).join("")+'</div>';
      }).join("");
      // Keep heading/intro untouched: replace from yr-tabs onward
      var head=wins.querySelector(".yr-tabs"); var first=wins.querySelector(".yr-panel");
      if(head) head.remove();
      wins.querySelectorAll(".yr-panel").forEach(function(n){n.remove();});
      wins.insertAdjacentHTML("beforeend", tabs+panels);
    }).catch(function(e){console.warn("CMS legislation load failed",e);});
  }

  function go(){ renderTeam(); renderJobs(); renderLegislation(); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",go); else go();
})();