// GLOBAL VARIABLES
const { body } = document;

const navButton = document.getElementById('js--nav-button');
const navClose = document.getElementById('js--nav-close');
const nav = document.getElementById('js--global-nav');

navButton.addEventListener('click', () => {
  nav.classList.add('nav--open');
});

navClose.addEventListener('click', () => {
  nav.classList.remove('nav--open');
});


// Abstract Modal
const abstractModal = document.querySelector('.abstract-modal');
const abstractModalButton = document.getElementById('js--abstract-button');
const abstractModalClose = document.getElementById('js--abstract-close');

if (abstractModalButton && abstractModalClose) {
  abstractModalButton.addEventListener('click', () => {
    abstractModal.classList.add('abstract-modal--open');
    body.classList.add('body--no-scroll');
  });

  abstractModalClose.addEventListener('click', () => {
    abstractModal.classList.remove('abstract-modal--open');
    body.classList.remove('body--no-scroll');
  });
}
