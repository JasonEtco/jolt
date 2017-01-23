const btns = document.querySelectorAll('.speakers__more-info-btn');
const speakerModal = document.querySelector('.speakers-modal');
const speakerModalContent = speakerModal.querySelector('.speakers-modal__content');
const speakerModalClose = document.getElementById('js--speakers-close');
const speakerModalOverlay = document.querySelector('.speakers-modal__overlay');


function toggleSpeakerClasses() {
  speakerModal.classList.toggle('speakers-modal--open');
  document.body.classList.toggle('body--no-scroll');
}

if (speakerModalClose) {
  window.addEventListener('keydown', e => {
    if (e.keyCode === 27 && speakerModal.classList.contains('speakers-modal--open')) {
      toggleSpeakerClasses();
    }
  });

  speakerModalClose.onclick = () => toggleSpeakerClasses();
  speakerModalOverlay.onclick = () => toggleSpeakerClasses();
}


if (btns) {
  Array.from(btns).forEach(btn => btn.addEventListener('click', (e) => {
    const content = e.target.nextSibling.innerHTML;
    speakerModalContent.innerHTML = content;
    toggleSpeakerClasses();
  }));
}
