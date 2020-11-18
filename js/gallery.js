import items from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');

gallery.insertAdjacentHTML('afterbegin', htmlGallery());

function htmlGallery() {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class='gallery__item'><a class="gallery__link" href="${original}"><img class='gallery__image' src="${preview}" data-source="${original}" alt="${description}"></li>`,
    )
    .join('');
};

const container = document.querySelector('.js-gallery');
const lightboxImg = document.querySelector('.lightbox__image');
const lightbox = document.querySelector('.js-lightbox');
const lightboxButton = document.querySelector('button[data-action="close-lightbox"]');
const cleanSrc = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
  
container.addEventListener('click', openModal);


function openModal(evt) { 
   evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  window.addEventListener('keydown', onEscKeyPress);
  lightbox.classList.add('is-open');
  lightboxImg.src = evt.target.dataset.source;
  lightboxImg.alt = evt.target.alt;
}

lightboxButton.addEventListener('click', closeModal);

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  lightbox.classList.remove('is-open');
  cleanSrc.removeAttribute('src');
}

 lightboxOverlay.addEventListener('click', closeModalOnOverlay);

function closeModalOnOverlay() {
  closeModal();
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
   closeModal();
  }
}