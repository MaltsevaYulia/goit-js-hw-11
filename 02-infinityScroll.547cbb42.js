!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},n.parcelRequired7c6=o);var a=o("5IjG7"),i=o("34OZX"),s=o("6JpON"),c={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")},l=new(0,i.default),u=new(e(a))(".gallery a");function f(){return l.fetchGallery().then((function(n){return y.observe(c.guard),function(n){console.log("🚀 ~ isContentFinished ~ res",n),2===l.page?e(s).Notify.success("Hooray! We found ".concat(n.totalHits," images.")):n.hits.length<l.perPage&&(y.unobserve(c.guard),e(s).Notify.warning("We're sorry, but you've reached the end of search results."))}(n),n.hits})).then(d).catch(g).finally((function(){c.form.reset()}))}function d(e){var n;n=e.map((function(e){var n=e.webformatURL,r=e.largeImageURL,t=e.tags,o=e.likes,a=e.views,i=e.comments,s=e.downloads;return'<a class="gallery__item" href="'.concat(r,'">\n        <div class="photo-card">\n  <img class="gallery__image" src="').concat(n,'" alt="').concat(t,'" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes </b>').concat(o,'\n    </p>\n    <p class="info-item">\n      <b>Views </b>').concat(a,'\n    </p>\n    <p class="info-item">\n      <b>Comments </b>').concat(i,'\n    </p>\n    <p class="info-item">\n      <b>Downloads </b>').concat(s,"\n    </p>\n  </div>\n</div></a>")})).join(""),c.gallery.insertAdjacentHTML("beforeend",n),u.refresh()}function g(n){y.unobserve(c.guard),e(s).Notify.failure("Sorry, there are no images matching your search query. Please try again.")}c.form.addEventListener("submit",(function(e){e.preventDefault(),l.q=e.currentTarget.elements.searchQuery.value.trim(),l.resetPage(),c.gallery.innerHTML="",f()}));var y=new IntersectionObserver((function(e){console.log(e),e.forEach((function(e){console.log("entry.isIntersecting",e.isIntersecting),e.isIntersecting&&f()}))}),{root:null,rootMargin:"300px"})}();
//# sourceMappingURL=02-infinityScroll.547cbb42.js.map
