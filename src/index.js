import { fetchGallery } from './fetchGallery';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    .finally(() => {
      refs.form.reset();
    }
);
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
        return `<a class="gallery__item" href="${largeImageURL}">
        <div class="photo-card">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes </b>${likes}
    </p>
    <p class="info-item">
      <b>Views </b>${views}
    </p>
    <p class="info-item">
      <b>Comments </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>${downloads}
    </p>
  </div>
</div></a>`;
      }
    )
    .join('');
  // console.log(markup);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a');
}

