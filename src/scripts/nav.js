const nav = document.getElementById('global-nav');
const navButton = document.getElementById('js--nav-button');
const navClose = document.querySelector('.nav__close');
const overlay = document.querySelector('.overlay');

function toggleNavClasses() {
  nav.classList.toggle('nav--open');
  overlay.classList.toggle('is-visible');
  document.body.classList.toggle('body--no-scroll');

  if (nav.getAttribute('aria-hidden')) {
    nav.removeAttribute('aria-hidden');
    Array.from(nav.querySelectorAll('*')).forEach(el => el.removeAttribute('tabindex'));
  } else {
    nav.setAttribute('aria-hidden', true);
    Array.from(nav.querySelectorAll('*')).forEach(el => el.setAttribute('tabindex', '-1'));
  }
}

if (nav) {
  window.addEventListener('keydown', e => {
    if (e.keyCode === 27 && nav.classList.contains('nav--open')) toggleNavClasses();
  });

  navButton.onclick = () => toggleNavClasses();
  navClose.onclick = () => toggleNavClasses();
  overlay.onclick = () => toggleNavClasses();
}
