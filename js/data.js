import { getRandomPositiveFloat } from './utils/get-random-positive-float.js';
import { getRandomPositiveInteger } from './utils/get-random-positive-integer.js';
import { shuffleArray } from './utils/shuffle-array.js';

const AVATAR_RANGE = {
  MIN: 1,
  MAX: 8,
};
const OFFER_TITLE = 'Wonderful property in Tokyo';
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_CHECKSET = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_DESCRIPTION =
  'Comfortable real estate in Tokyo. A cozy option for the weary traveler.';
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LOCATION = {
  LAT: {
    MIN: 35.65,
    MAX: 35.7,
  },
  LNG: {
    MIN: 139.7,
    MAX: 139.8,
  },
};

const SIMILAR_AD_COUNT = 1;

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

const createAd = () => {
  const location = {
    lat: getRandomPositiveFloat(LOCATION.LAT.MIN, LOCATION.LAT.MAX, 5),
    lng: getRandomPositiveFloat(LOCATION.LNG.MIN, LOCATION.LNG.MAX, 5),
  };
  return {
    author: {
      avatar: `img/avatars/user0${getRandomPositiveInteger(AVATAR_RANGE.MIN, AVATAR_RANGE.MAX)}.png`},
    offer: {
      title: OFFER_TITLE,
      address: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger(100, 1000),
      type: getRandomArrayElement(OFFER_TYPE),
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(OFFER_CHECKSET),
      checkout: getRandomArrayElement(OFFER_CHECKSET),
      features: shuffleArray(OFFER_FEATURES).slice(0, getRandomPositiveInteger(1, OFFER_FEATURES.length - 1)),
      description: OFFER_DESCRIPTION,
      photos: OFFER_PHOTOS.slice(0, getRandomPositiveInteger(1, OFFER_PHOTOS.length - 1)),
    },
    location,
  };
};

const createAds = () =>
  new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

export { createAds };
