import { declOfNum } from './utils/declension-of-numbers.js';

const similarAdTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const types = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const similarAdFragment = document.createDocumentFragment();

const renderCard = ({ offer, author }) => {
  const adElement = similarAdTemplate.cloneNode(true);

  const popupTitle = adElement.querySelector('.popup__title');
  if (offer.title) {
    popupTitle.textContent = offer.title;
  } else {
    popupTitle.remove();
  }

  const popupAddress = adElement.querySelector('.popup__text--address');
  if (offer.address) {
    popupAddress.textContent = offer.address;
  } else {
    popupAddress.remove();
  }

  const popupPrice = adElement.querySelector('.popup__text--price');
  if (offer.price) {
    popupPrice.textContent = `${offer.price} ₽/ночь`;
  } else {
    popupPrice.remove();
  }

  const popupType = adElement.querySelector('.popup__type');
  if (types[offer.type]) {
    popupType.textContent = types[offer.type];
  } else {
    popupType.remove();
  }

  const popupCapacity = adElement.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    popupCapacity.textContent = `${offer.rooms} ${declOfNum(offer.rooms, [
      'комната',
      'комнаты',
      'комнат',
    ])} для ${offer.guests} ${declOfNum(offer.guests, [
      'гость',
      'гостей',
      'гостей',
    ])}`;
  } else {
    popupCapacity.remove();
  }

  const popupFeatures = adElement.querySelector('.popup__features');
  if (offer.features) {
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    popupFeatures.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    popupFeatures.remove();
  }

  const popupDescription = adElement.querySelector('.popup__description');
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.remove();
  }

  const popupPhotos = adElement.querySelector('.popup__photos');
  if (offer.photos) {
    const photoTemplate = popupPhotos.querySelector('.popup__photo');
    const fragmentPhoto = document.createDocumentFragment();
    offer.photos.map((photo) => {
      const newPhoto = photoTemplate.cloneNode(true);
      newPhoto.src = photo;
      fragmentPhoto.appendChild(newPhoto);
    });
    popupPhotos.innerHTML = '';
    popupPhotos.appendChild(fragmentPhoto);
  } else {
    popupPhotos.remove();
  }

  const popupAvatar = adElement.querySelector('.popup__avatar');
  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }

  similarAdFragment.appendChild(adElement);

  return similarAdFragment;
};

export { renderCard };
