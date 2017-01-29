/* global allowedEmails */
const signupForm = document.querySelector('.login__signup');

function validateSignup() {
  const email = signupForm.querySelector('#email').value;
  const domain = email.split('@')[1];
  if (allowedEmails.indexOf(domain) !== -1) return true;

  console.warn('Use a Harvard email!');

  const errMsg = document.createElement('h3');
  errMsg.classList.add('login__signup__errMsg');
  errMsg.textContent = 'You must use a Harvard email address.';

  signupForm.insertBefore(errMsg, signupForm.firstChild);
  return false;
}
