start = function() {
	// GLOBAL VARIABLES
	var body = document.body;

	var navButton = document.getElementById('js--nav-button');
	var navClose  = document.getElementById('js--nav-close');
	var nav       = document.getElementById('js--global-nav');

	navButton.addEventListener('click', function() {
		nav.classList.add('nav--open');
	});

	navClose.addEventListener('click', function() {
		nav.classList.remove('nav--open');
	});



	// Abstract Modal

	var abstractModal = document.querySelector('.abstract-modal');
	var abstractModalButton = document.getElementById('js--abstract-button');
	var abstractModalClose = document.getElementById('js--abstract-close');

	abstractModalButton.addEventListener('click', function() {
		abstractModal.classList.add('abstract-modal--open');
		body.classList.add('body--no-scroll');
	});

	abstractModalClose.addEventListener('click', function() {
		abstractModal.classList.remove('abstract-modal--open');
		body.classList.remove('body--no-scroll');
	});



	// Login Form

	var loginModal = document.querySelector('.login-modal');
	var loginButton = document.querySelector('.login-button');

	loginButton.addEventListener('click', function() {
		loginModal.style.display = 'block';
	});
}