import axios from 'axios';
import './sass/index.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css'


const refs = {
    formEl: document.querySelector('.search-form'),
    inputEl: document.querySelector('.search-query'),
    galleryEl: document.querySelector('.gallery'),
    buttonLoad: document.querySelector('.load-more'),
}


let page = 1;
refs.formEl.addEventListener('submit', onFormSubmit);
refs.buttonLoad.addEventListener('click', onBtnClick);
refs.buttonLoad.classList.add('hide');



const fetchImg = async () => {
  const KEY = '34474690-2f779264971807feca9fee9a4';
  const BASE_URL = 'https://pixabay.com/api/';
  const searchValue = refs.inputEl.value.trim();
  try{
    const response = await axios.get(`${BASE_URL}?key=${KEY}&image_type=photo&q=${searchValue}&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    console.log(response);
    if (response.data.hits.length === 0 || searchValue === '') {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    } else {
      createMarkup(response.data.hits);
      Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      if (response.data.hits.length === 40 && page === 1) {
      refs.buttonLoad.classList.remove('hide');
      } else if (response.data.hits.length < 40 && page !== 1) {
        refs.buttonLoad.classList.add('hide');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      } 
      }
  }
  catch (error) {
    console.log(error);
  }
};



function onFormSubmit (event) {
  event.preventDefault();
  page = 1;
  refs.galleryEl.innerHTML = '';
  fetchImg()
}



function onBtnClick () {
  page += 1;
  fetchImg();
}



function createMarkup (data) {
  const result = data.reduce((acc, item) => (acc += `<div class="photo-card">
   <a class="gallery__link" href="${item.largeImageURL}">
   <img src="${item.webformatURL}" alt="${item.tags}tags" loading="lazy" />
   <div class="info">
     <p class="info-item">
       <b>likes ${item.likes}</b>
     </p>
     <p class="info-item">
       <b>views ${item.views}</b>
     </p>
     <p class="info-item">
       <b>comments ${item.comments}</b>
     </p>
     <p class="info-item">
       <b>downloads ${item.downloads}</b>
     </p>
   </div>
 </div>`), '');
  refs.galleryEl.insertAdjacentHTML('beforeend', result);
  gallery.refresh();
};




let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});















