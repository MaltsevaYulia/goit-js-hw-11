import { fetchGallery } from './fetchGallery';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

console.log(refs.form);
console.log(refs.gallery);

refs.form.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  console.log(searchQuery);
  fetchGallery(searchQuery)
    .then(res => res.hits)
    .then(createMarkup)
    .finally(() => refs.form.reset);
  //.then(res => cosole.log(res));
}

function createMarkup(images) {
  let markup = '';
  markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  console.log(markup);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
