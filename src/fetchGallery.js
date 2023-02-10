import axios from 'axios'
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33441417-95384e2574ef1faadfd151af8';
// const options = {
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
// };

const options = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 200,
  },
};

export default class GalleryAPIServise {
  constructor() {
    this.page = 1;
    this.q = '';
    this.shownImg = 40;
  }
  async fetchGallery() {
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${this.q}&page=${this.page}`,
        options
      );
      console.log('🚀  response', response.data);

      if (!response.data.totalHits) {
        throw new Error(response.status);
      } else if(response.data.totalHits)
      this.incrementPage();
      return response.data;
    } catch (error) {
      return error;
    }
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  incrementShownImg() {
    this.shownImg += 40;
    
  }
}

// async function fetchGallery(q) {
//   try {
//      const response = await axios.get(`${BASE_URL}?q=${q}`, options);
//     console.log("🚀  response", response)
    
//     if (!response.data.total) {
//       throw new Error(response.status);
//     }
//     return response.data;
//   } catch (error) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
// }

// fetchGallery('cat');

// function fetchGallery(q) {
//   const { key, image_type, orientation, safesearch } = options;
//   return fetch(
//     `${BASE_URL}?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`
//   ).then(response => {
//      if (!response.ok) {
//        throw new Error(response.status);
//      }
//      return response.json();
//   });
// }

// export { fetchGallery };
