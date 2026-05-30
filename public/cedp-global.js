// CEDP global JS fixes — runs in iframe content
(function(){
  // Fix accordion arrow SVG to full down arrow (line + head)
  document.querySelectorAll('.cl-acc-circle svg').forEach(function(svg){
    svg.setAttribute('viewBox','0 0 24 24');
    svg.innerHTML = '<path d="M12 5v14M6 13l6 6 6-6" />';
  });
  // Ensure mission punch defaults to navy variant
  document.querySelectorAll('.cl-punch,.ow-punch,.punch').forEach(function(p){
    if(!p.classList.contains('v-g') && !p.classList.contains('v-r') && !p.classList.contains('v-n')){
      p.classList.add('v-n');
    }
    var tog = p.querySelector('.cl-punch-tog,.ow-punch-tog,.punch-tog');
    if(tog){
      var nbtn = tog.querySelector('[data-v="n"]');
      if(nbtn && !tog.querySelector('.on')) nbtn.classList.add('on');
    }
  });
})();
