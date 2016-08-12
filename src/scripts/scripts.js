const nav = document.getElementById('js--global-nav');
const navButton = document.getElementById('js--nav-button');
const navClose = document.getElementById('js--nav-close');
const overlay = document.querySelector('.overlay');

function toggleNavClasses() {
  nav.classList.toggle('nav--open');
  overlay.classList.toggle('is-visible');
  document.body.classList.toggle('body--no-scroll');
}

navButton.addEventListener('click', () => toggleNavClasses());
navClose.addEventListener('click', () => toggleNavClasses());
overlay.addEventListener('click', () => toggleNavClasses());

// Abstract Modal
const abstractModal = document.querySelector('.abstract-modal');
const abstractModalButton = document.getElementById('js--abstract-button');
const abstractModalClose = document.getElementById('js--abstract-close');

if (abstractModalButton && abstractModalClose) {
  function toggleAbstractClasses() {
    abstractModal.classList.toggle('abstract-modal--open');
    document.body.classList.toggle('body--no-scroll');
  }
  
  abstractModalButton.addEventListener('click', () => toggleAbstractClasses());
  abstractModalClose.addEventListener('click', () => toggleAbstractClasses());
}
