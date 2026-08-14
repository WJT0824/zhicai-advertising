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

  var copyButton=document.querySelector('.copy-qq');
  if(copyButton){copyButton.addEventListener('click',function(){
    var text=copyButton.getAttribute('data-copy');
    var done=function(){toast.classList.add('show');setTimeout(function(){toast.classList.remove('show');},1800);};
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done).catch(function(){fallbackCopy(text,done);});}else{fallbackCopy(text,done);}
  });}
  function fallbackCopy(text,done){var input=document.createElement('textarea');input.value=text;input.setAttribute('readonly','');input.style.position='fixed';input.style.opacity='0';document.body.appendChild(input);input.select();try{document.execCommand('copy');done();}catch(e){window.prompt('请复制QQ号码：',text);}document.body.removeChild(input);}

  var revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.12});revealItems.forEach(function(item){revealObserver.observe(item);});}else{Array.prototype.forEach.call(revealItems,function(item){item.classList.add('visible');});}

  var sections=Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if('IntersectionObserver' in window){var sectionObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){navLinks.forEach(function(link){link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id);});}});},{rootMargin:'-35% 0px -55% 0px'});sections.forEach(function(section){sectionObserver.observe(section);});}
  document.getElementById('year').textContent=new Date().getFullYear();
})();

