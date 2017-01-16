const nav = document.getElementById('js--global-nav');
const navButton = document.getElementById('js--nav-button');
const navClose = document.getElementById('js--nav-close');
const overlay = document.querySelector('.overlay');

function toggleNavClasses() {
  nav.classList.toggle('nav--open');
  overlay.classList.toggle('is-visible');
  document.body.classList.toggle('body--no-scroll');
}

if (nav) {
  window.addEventListener('keydown', e => {
    if (e.keyCode === 27 && nav.classList.contains('nav--open')) toggleNavClasses();
  });

  navButton.addEventListener('click', () => toggleNavClasses());
  navClose.addEventListener('click', () => toggleNavClasses());
  overlay.addEventListener('click', () => toggleNavClasses());
}
