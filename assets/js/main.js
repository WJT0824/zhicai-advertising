(function(){
  'use strict';
  var menuButton=document.querySelector('.menu-toggle');
  var nav=document.querySelector('.site-nav');
  var navLinks=Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  var toast=document.querySelector('.toast');

  if(menuButton&&nav){
    menuButton.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded',String(open));
    });
    navLinks.forEach(function(link){link.addEventListener('click',function(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');});});
    document.addEventListener('click',function(event){if(!nav.contains(event.target)&&!menuButton.contains(event.target)){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}});
  }

  var copyButtons=Array.prototype.slice.call(document.querySelectorAll('.copy-contact'));
  copyButtons.forEach(function(copyButton){copyButton.addEventListener('click',function(){
    var text=copyButton.getAttribute('data-copy');
    var label=copyButton.getAttribute('data-label')||'内容';
    var done=function(){toast.textContent=label+'已复制';toast.classList.add('show');setTimeout(function(){toast.classList.remove('show');},1800);};
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done).catch(function(){fallbackCopy(text,label,done);});}else{fallbackCopy(text,label,done);}
  });});
  function fallbackCopy(text,label,done){var input=document.createElement('textarea');input.value=text;input.setAttribute('readonly','');input.style.position='fixed';input.style.opacity='0';document.body.appendChild(input);input.select();try{document.execCommand('copy');done();}catch(e){window.prompt('请复制'+label+'：',text);}document.body.removeChild(input);}

  var lightbox=document.querySelector('.lightbox');
  var lightboxImage=lightbox?lightbox.querySelector('img'):null;
  var lightboxCaption=lightbox?lightbox.querySelector('p'):null;
  var lightboxClose=lightbox?lightbox.querySelector('.lightbox-close'):null;
  var lastLightboxTrigger=null;
  function closeLightbox(){if(!lightbox)return;lightbox.hidden=true;lightboxImage.removeAttribute('src');document.body.style.overflow='';if(lastLightboxTrigger)lastLightboxTrigger.focus();}
  Array.prototype.forEach.call(document.querySelectorAll('[data-lightbox]'),function(trigger){trigger.addEventListener('click',function(){lastLightboxTrigger=trigger;lightboxImage.src=trigger.getAttribute('data-lightbox');lightboxImage.alt=trigger.getAttribute('data-caption')||'案例大图';lightboxCaption.textContent=trigger.getAttribute('data-caption')||'';lightbox.hidden=false;document.body.style.overflow='hidden';lightboxClose.focus();});});
  if(lightbox){lightbox.addEventListener('click',function(event){if(event.target===lightbox)closeLightbox();});}
  if(lightboxClose){lightboxClose.addEventListener('click',closeLightbox);}
  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&lightbox&&!lightbox.hidden)closeLightbox();});

  var revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.12});revealItems.forEach(function(item){revealObserver.observe(item);});}else{Array.prototype.forEach.call(revealItems,function(item){item.classList.add('visible');});}

  var sections=Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if('IntersectionObserver' in window){var sectionObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){navLinks.forEach(function(link){link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id);});}});},{rootMargin:'-35% 0px -55% 0px'});sections.forEach(function(section){sectionObserver.observe(section);});}
  document.getElementById('year').textContent=new Date().getFullYear();
})();
