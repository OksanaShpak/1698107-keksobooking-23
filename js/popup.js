import { createAds } from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');

const types = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const similarAds = createAds();
const updateElement = (element, content, property='innerHTML')=>{
  if (content.length === 0 ){
    element.classList.add('hidden');
    return false;
  }
  element[property] = content;
  return true;
};

similarAds.forEach(({offer, author}  ) => {
  const adElement = similarAdTemplate.cloneNode(true);
  updateElement(adElement.querySelector('.popup__title'), offer.title, 'textContent');
  // adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  adElement.querySelector('.popup__type').textContent = types[offer.type];
  adElement.querySelector('.popup__text--capacity').innerHTML = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElement.querySelector('.popup__features').innerHTML = offer.features.map((feature) =>`<li class="popup__feature popup__feature--${feature}"></li>`).join('');
  adElement.querySelector('.popup__description').textContent = offer.description;
  adElement.querySelector('.popup__photos').innerHTML=offer.photos.map((src)=>`<img src="${src}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('');
  adElement.querySelector('.popup__avatar').src = author.avatar;

  mapCanvas.appendChild(adElement);
});

