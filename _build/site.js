/* ===== REDES SOCIALES ===== */
var SOCIAL = {
  instagram: "https://www.instagram.com/vacheronprojects/",
  facebook:  "https://www.facebook.com/vacheronprojects/",
  linkedin:  "https://www.linkedin.com/company/vacheron-projects-sl/",
  x:         "https://twitter.com/VacheronProject/",
  pinterest: "https://es.pinterest.com/Vacheronproject/",
  whatsapp:  "https://wa.me/34628060560"
};
var NET_NAMES={instagram:"Instagram",facebook:"Facebook",linkedin:"LinkedIn",x:"X (Twitter)",pinterest:"Pinterest",whatsapp:"WhatsApp"};

(function(){
  function $(id){return document.getElementById(id);}

  // Iconos de redes
  [].forEach.call(document.querySelectorAll('[data-socials]'),function(box){
    Object.keys(NET_NAMES).forEach(function(k){
      var a=document.createElement('a');a.href=SOCIAL[k];a.target='_blank';a.rel='noopener';
      a.setAttribute('aria-label',NET_NAMES[k]);a.title=NET_NAMES[k];
      a.innerHTML='<svg aria-hidden="true"><use href="#i-'+k+'"/></svg>';box.appendChild(a);
    });
  });

  // Menú móvil
  var mb=$('menu-btn'),mm=$('mobile-menu');
  if(mb&&mm){
    mb.addEventListener('click',function(){var o=mm.hidden;mm.hidden=!o;mb.setAttribute('aria-expanded',String(o));mb.textContent=o?'Cerrar':'Menú';});
  }

  // Antes / después
  var ba=$('ba'),r=$('ba-range');
  if(ba&&r){r.addEventListener('input',function(){ba.style.setProperty('--pos',r.value+'%');});}

  // Filtros de trabajos
  var fl=document.querySelector('.filters');
  if(fl){
    fl.addEventListener('click',function(e){
      var b=e.target.closest('button');if(!b)return;
      [].forEach.call(fl.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed',String(x===b));});
      var f=b.dataset.f;
      [].forEach.call(document.querySelectorAll('[data-type]'),function(c){c.hidden=f!=='all'&&c.dataset.type.indexOf(f)<0;});
    });
  }

  // Formularios sencillos (inversores, empleo)
  [].forEach.call(document.querySelectorAll('form[data-simple]'),function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var bad=[].filter.call(f.querySelectorAll('[data-req]'),function(i){return !i.value.trim();});
      var err=f.querySelector('.err');
      if(bad.length){if(err)err.hidden=false;bad[0].focus();return;}
      if(err)err.hidden=true;
      [].forEach.call(f.children,function(c){if(!c.classList.contains('ok-msg'))c.hidden=true;});
      f.querySelector('.ok-msg').hidden=false;
    });
  });

  // Formulario de proyecto por pasos
  var form=$('lead-form');
  if(!form)return;
  var steps=[].slice.call(form.querySelectorAll('fieldset[data-step]')),
      next=$('next'),back=$('back'),label=$('step-label'),bars=form.querySelectorAll('.progress-bar i'),
      err=$('f-err'),cur=0;
  var required=[['tipo'],['zona','base'],['inv']];
  function val(n){var el=form.elements[n];if(!el)return '';if(el.tagName==='INPUT'&&el.type!=='radio')return el.value.trim();var c=form.querySelector('input[name="'+n+'"]:checked');return c?c.value:'';}
  function ready(){return required[cur].every(function(n){return !!val(n);});}
  function render(){
    steps.forEach(function(s,i){s.hidden=i!==cur;});
    [].forEach.call(bars,function(b,i){b.classList.toggle('on',i<=cur);});
    label.textContent='Paso '+(cur+1)+' de 3';
    back.hidden=cur===0;
    next.disabled=!ready();
    next.firstChild.nodeValue=cur===2?'Enviar solicitud ':'Continuar ';
  }
  // Preselección desde páginas de servicio: contacto.html#reforma, etc.
  var pre={construccion:'t-casa',reforma:'t-reforma',piscina:'t-piscina'}[location.hash.slice(1)];
  if(pre&&$(pre))$(pre).checked=true;
  form.addEventListener('input',function(){next.disabled=!ready();});
  form.addEventListener('change',function(){next.disabled=!ready();
    if(cur===0&&ready()){setTimeout(function(){cur=1;render();},280);}});
  back.addEventListener('click',function(){if(cur>0){cur--;err.hidden=true;render();}});
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!ready())return;
    if(cur<2){cur++;render();return;}
    var n=form.nombre.value.trim(),c=form.contacto.value.trim();
    if(!n||!c){err.hidden=false;return;}
    err.hidden=true;
    steps.forEach(function(s){s.hidden=true;});
    $('progress').hidden=true;$('form-nav').hidden=true;$('promise').hidden=true;
    $('done-h').textContent='Gracias, '+n.split(' ')[0]+'.';
    $('done-p').textContent='Proyecto: '+val('tipo').toLowerCase()+' en '+val('zona')+'. Un responsable de proyecto te contactará en menos de 24 h laborables para concertar la primera conversación.';
    $('done').hidden=false;
  });
  render();
})();

/* ===== Lightbox, filtros por enlace y reserva de vivienda ===== */
(function(){
  var lb=document.getElementById('lb');if(!lb)return;
  var im=document.getElementById('lb-img'),cap=document.getElementById('lb-c'),list=[],i=0;
  function show(n){i=(n+list.length)%list.length;var a=list[i];im.src=a.getAttribute('href');im.alt=a.dataset.lb||'';cap.textContent=(a.dataset.lb||'')+' · '+(i+1)+' / '+list.length;}
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[data-lb]');if(!a)return;
    e.preventDefault();
    var box=a.closest('.masonry,.units,.split')||document;
    list=[].slice.call(box.querySelectorAll('a[data-lb]'));
    show(list.indexOf(a));lb.hidden=false;document.getElementById('lb-x').focus();
  });
  function close(){lb.hidden=true;im.removeAttribute('src');}
  document.getElementById('lb-x').addEventListener('click',close);
  document.getElementById('lb-p').addEventListener('click',function(){show(i-1);});
  document.getElementById('lb-n').addEventListener('click',function(){show(i+1);});
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1);});

  // trabajos.html#piscinas abre el filtro correspondiente
  var h=location.hash.slice(1),fb=h&&document.querySelector('.filters button[data-f="'+h+'"]');
  if(fb)fb.click();

  // "Me interesa esta vivienda" marca la vivienda en el formulario
  [].forEach.call(document.querySelectorAll('[data-unit]'),function(b){
    b.addEventListener('click',function(){var n=b.dataset.unit.slice(-2),r=document.getElementById('u'+n);if(r)r.checked=true;});
  });
})();
