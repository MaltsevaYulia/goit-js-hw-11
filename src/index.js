import { fetchGallery } from './fetchGallery';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

console.log(refs.form);
console.log(refs.gallery);

refs.form.addEventListener('submit', onSearch);

function onSearch(params) {
  console.log('aaaaaaaa');
}

fetchGallery('yellow+flower').then(res => console.log(res));

