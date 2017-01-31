const nav = document.getElementById('global-nav');
const navButton = document.getElementById('js--nav-button');
const navClose = document.querySelector('.nav__close');
const overlay = document.querySelector('.overlay');

function toggleNavClasses(navChildren) {
  nav.classList.toggle('nav--open');
  overlay.classList.toggle('is-visible');
  document.body.classList.toggle('body--no-scroll');

  if (nav.getAttribute('aria-hidden')) {
    nav.removeAttribute('aria-hidden');

    for (let i = 0; i < navChildren.length; i++) {
      const el = navChildren[i];
      el.removeAttribute('tabindex');
    }
  } else {
    nav.setAttribute('aria-hidden', true);

    for (let i = 0; i < navChildren.length; i++) {
      const el = navChildren[i];
      el.setAttribute('tabindex', '-1');
    }
  }
}

if (nav) {
  const navChildren = nav.querySelectorAll('*');

  window.addEventListener('keydown', e => {
    if (e.keyCode === 27 && nav.classList.contains('nav--open')) toggleNavClasses(navChildren);
  });

  navButton.onclick = () => toggleNavClasses(navChildren);
  navClose.onclick = () => toggleNavClasses(navChildren);
  overlay.onclick = () => toggleNavClasses(navChildren);
}
