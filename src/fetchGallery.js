const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33441417-95384e2574ef1faadfd151af8';
const options = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

function fetchGallery(q) {
  const { key, image_type, orientation, safesearch } = options;
  return fetch(
    `${BASE_URL}?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`
  ).then(response => {
     if (!response.ok) {
       throw new Error(response.status);
     }
     return response.json();
  });
}

export { fetchGallery };
