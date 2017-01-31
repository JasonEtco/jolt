const btns = document.querySelectorAll('.speakers__more-info-btn');
const speakerModal = document.querySelector('.speakers-modal');
const speakerModalClose = document.querySelector('.speakers-modal__close');
const speakerModalOverlay = document.querySelector('.speakers-modal__overlay');


function toggleSpeakerClasses() {
  speakerModal.classList.toggle('speakers-modal--open');
  document.body.classList.toggle('body--no-scroll');
}

if (speakerModalClose && speakerModal) {
  window.addEventListener('keydown', e => {
    if (e.keyCode === 27 && speakerModal.classList.contains('speakers-modal--open')) {
      toggleSpeakerClasses();
    }
  });

  speakerModalClose.onclick = () => toggleSpeakerClasses();
  speakerModalOverlay.onclick = () => toggleSpeakerClasses();
}


if (btns && speakerModal) {
  const speakerModalContent = speakerModal.querySelector('.speakers-modal__content');

  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener('click', (e) => {
      const content = e.target.nextSibling.innerHTML;
      speakerModalContent.innerHTML = content;
      toggleSpeakerClasses();
    });
  }
}
