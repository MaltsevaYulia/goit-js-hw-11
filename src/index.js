// import { fetchGallery } from './fetchGallery';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import GalleryAPIServise from './fetchGallery'
import LoadMoreBtn from './components/load-more-btn'
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

console.log(refs.form);
console.log(refs.gallery);

const galleryAPIServise = new GalleryAPIServise()
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', fetchImg);

function onSearch(evt) {
  evt.preventDefault();
  galleryAPIServise.q = evt.currentTarget.elements.searchQuery.value.trim();
  console.log(galleryAPIServise.q);

  loadMoreBtn.show();
  galleryAPIServise.resetPage()
  clearGallery();
  fetchImg();
  // galleryAPIServise.fetchGallery()
  //    .then(res => res.hits)
  //    .then(createMarkup)
  //    .finally(() => {
  //      refs.form.reset();
  //    });
  
  //.then(res => cosole.log(res));
}

function fetchImg() {
  loadMoreBtn.disable();
  return galleryAPIServise
    .fetchGallery()
    .then(res => res.hits)
    .then(createMarkup)
    .catch(OnError)
    .finally(() => {
      refs.form.reset();
      loadMoreBtn.enable();
    });
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

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function OnError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  loadMoreBtn.hide();
}

function isContentFinished() {
  if (galleryAPIServise < res.totalHits) {
   return
  } 
   Notiflix.Notify.warning(
     "We're sorry, but you've reached the end of search results."
   );
}






//Если без класса
// function onSearch(evt) {
//   evt.preventDefault(); 
//   const searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
//   console.log(searchQuery);
//   fetchGallery(searchQuery)
//     .then(res => res.hits)
//     .then(createMarkup)
//     .finally(() => {
//       refs.form.reset();
//     }
// );
//   //.then(res => cosole.log(res));
// }