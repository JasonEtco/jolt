const signupForm = document.querySelector('.login__signup');

function validateSignup() {
  const email = signupForm.querySelector('#email').value;
  if (/@jd\d\d.law.harvard.edu/ig.test(email)) return true;

  console.warn('Use a Harvard email!');
  return false;
}
