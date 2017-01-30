const collapseBtns = document.querySelectorAll('.aside__collapse-btn');

Array.from(collapseBtns).forEach(btn => btn.addEventListener('click', (e) => {
  e.target.nextElementSibling.classList.toggle('is-visible');
}));
