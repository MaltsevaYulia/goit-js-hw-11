!function(){var o="33441417-95384e2574ef1faadfd151af8",e="photo",a="horizontal",t=!0;var n,c,r,l,f,i={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery")};console.log(i.form),console.log(i.gallery),i.form.addEventListener("submit",(function(o){console.log("aaaaaaaa")})),(n="yellow+flower",c=o,r=e,l=a,f=t,fetch("".concat("https://pixabay.com/api/","?key=").concat(c,"&q=").concat(n,"&image_type=").concat(r,"&orientation=").concat(l,"&safesearch=").concat(f)).then((function(o){if(!o.ok)throw new Error(o.status);return o.json()}))).then((function(o){return console.log(o)}))}();
//# sourceMappingURL=index.eddab518.js.map
