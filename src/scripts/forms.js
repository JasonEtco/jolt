const categoryDropdown = document.querySelector('#byCategory');

if (categoryDropdown) {
  categoryDropdown.addEventListener('change', (e) => {
    const { value } = e.target;
    location.assign(`/jolt-digest/category/?cat=${value}`);
  });
}
