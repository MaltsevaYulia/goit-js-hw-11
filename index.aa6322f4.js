const e={key:"33441417-95384e2574ef1faadfd151af8",image_type:"photo",orientation:"horizontal",safesearch:!0};function n(n){const{key:o,image_type:t,orientation:a,safesearch:s}=e;return fetch(`https://pixabay.com/api/?key=${o}&q=${n}&image_type=${t}&orientation=${a}&safesearch=${s}`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))}const o={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery")};function t(e){let n="";n=e.map((({webformatURL:e,largeImageURL:n,tags:o,likes:t,views:a,comments:s,downloads:r})=>`<div class="photo-card">\n  <img src="${e}" alt="${o}" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes ${t}</b>\n    </p>\n    <p class="info-item">\n      <b>Views ${a}</b>\n    </p>\n    <p class="info-item">\n      <b>Comments ${s}</b>\n    </p>\n    <p class="info-item">\n      <b>Downloads ${r}</b>\n    </p>\n  </div>\n</div>`)).join(""),console.log(n),o.gallery.insertAdjacentHTML("beforeend",n)}console.log(o.form),console.log(o.gallery),o.form.addEventListener("submit",(function(e){e.preventDefault();const o=e.currentTarget.elements.searchQuery.value;console.log(o),n(o).then((e=>e.hits)).then(t)}));
//# sourceMappingURL=index.aa6322f4.js.map
