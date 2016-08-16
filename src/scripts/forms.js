const categoryDropdown = document.querySelector('#byCategory');

categoryDropdown.addEventListener('change', (e) => {
  const { value } = e.target;
	console.log(value);
	location.assign(`/jolt-digest/category/${value}`);
});
