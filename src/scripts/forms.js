const categoryDropdown = document.querySelector('#byCategory');

if (categoryDropdown) {
  categoryDropdown.addEventListener('change', (e) => {
    const { value } = e.target;
    location.assign(`/digest/category/?cat=${value}`);
  });
}
