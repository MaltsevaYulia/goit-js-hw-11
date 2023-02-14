
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import GalleryAPIServise from './fetchGallery'
import LoadMoreBtn from './components/load-more-btn'
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const galleryAPIServise = new GalleryAPIServise()
const lightbox = new simpleLightbox('.gallery a');
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', fetchImg);

function onSearch(evt) {
  evt.preventDefault();
  galleryAPIServise.q = evt.currentTarget.elements.searchQuery.value.trim();
  // console.log(galleryAPIServise.q);

  loadMoreBtn.show();
  galleryAPIServise.resetPage()
  clearGallery();
  fetchImg();
  
 
}

function fetchImg() {
  loadMoreBtn.disable();
  loadMoreBtn.show();
  return galleryAPIServise
    .fetchGallery()
    .then(res => {
      notification(res);
      return res.hits
    })
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
  lightbox.refresh();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function OnError(error) {
  console.log(error);
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  
  loadMoreBtn.hide();
}

function notification(res) {
  console.log("🚀 ~ isContentFinished ~ res", res)
  console.log('res.hits.length', res.hits.length);
  if (galleryAPIServise.page === 2)
    Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`); 
  if (res.hits.length < galleryAPIServise.perPage) {
    loadMoreBtn.hide();
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  } 
  }






