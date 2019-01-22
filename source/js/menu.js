var navMain = document.querySelector('.main-nav');
var navList = document.querySelector('.site-list__item');
var navToggle = document.querySelector('.main-nav__button');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click',function(){

  if(navMain.classList.contains('main-nav--hide')){
    navMain.classList.remove('main-nav--hide');
    navMain.classList.add('main-nav--show');

    var navShow = document.querySelector('.main-nav--show .main-nav__list')

    navShowHeight = navShow.scrollHeight;
    navShow.style.height = navShowHeight + 'px';

  }else{
    navMain.classList.add('main-nav--hide');
    navMain.classList.remove('main-nav--show');

    var navHide = document.querySelector('.main-nav--hide .main-nav__list');
    navHide.style.height = 0;
  }
});
