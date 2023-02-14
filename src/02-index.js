import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import GalleryAPIServise from './fetchGallery';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

const galleryAPIServise = new GalleryAPIServise();
const lightbox = new simpleLightbox('.gallery a');

refs.form.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  galleryAPIServise.q = evt.currentTarget.elements.searchQuery.value.trim();
//   console.log(galleryAPIServise.q);
  galleryAPIServise.resetPage();
//   galleryAPIServise.resetShownImg();
  clearGallery();
  fetchImg();
}

function fetchImg() {
  return galleryAPIServise
    .fetchGallery()
    .then(res => {
        observer.observe(refs.guard);
        notification(res);
      return res.hits;
    })
    .then(createMarkup)
    .catch(OnError)
    .finally(() => {
      refs.form.reset();
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
  
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  
    lightbox.refresh();

    // const { height: cardHeight } = document
    //   .querySelector('.gallery')
    //   .firstElementChild.getBoundingClientRect();


}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function OnError(error) {
//   console.log(error);
    observer.unobserve(refs.guard);
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );


}

function notification(res) {
    // console.log('🚀 ~ isContentFinished ~ res', res);
  if (galleryAPIServise.page === 2)
    Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);
   else if (res.hits.length < galleryAPIServise.perPage) {
    observer.unobserve(refs.guard);
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
    // console.log(
    //   'galleryAPIServise.shownImg',
    //   res.totalHits - galleryAPIServise.shownImg
    // );
    
}

const detals = {
  root: null,
  rootMargin: '300px',
};
const observer = new IntersectionObserver(onload, detals);

function onload(enteries) {
    console.log(enteries);
  enteries.forEach(entry => {
    console.log('entry.isIntersecting', entry.isIntersecting);
      if (entry.isIntersecting) {
        fetchImg()
    }
  });
}


// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();
// // console.log(cardHeight);

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });