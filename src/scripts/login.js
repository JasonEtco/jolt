/* global allowedEmails */
const signupForm = document.querySelector('.login__signup');

function validateSignup() {
  return true;
  const email = signupForm.querySelector('#email').value;
  const domain = email.split('@')[1];
  if (allowedEmails.indexOf(domain) !== -1) return true;

  console.warn('Use a Harvard email!');
  return false;
}
