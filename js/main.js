import { getRandomPositiveFloat } from './utils/get-random-positive-float.js';
import { getRandomPositiveInteger } from './utils/get-random-positive-integer.js';
import { shuffleArray } from './utils/shuffle-array.js';
import { AVATAR_RANGE,
  OFFER_TITLE,
  OFFER_TYPE,
  OFFER_CHECKSET,
  OFFER_FEATURES,
  OFFER_DESCRIPTION,
  OFFER_PHOTOS,
  LOCATION } from './data.js';

const SIMILAR_AD_COUNT = 10;

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

const createAd = () => {
  const location = {
    lat: getRandomPositiveFloat(LOCATION.LAT.MIN, LOCATION.LAT.MAX, 5),
    lng: getRandomPositiveFloat(LOCATION.LNG.MIN, LOCATION.LNG.MAX, 5),
  };
  return {
    author: {
      avatar: `img/avatars/user0${getRandomPositiveInteger(AVATAR_RANGE.MIN, AVATAR_RANGE.MAX)}.png`,
    },
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

const similarAds = () => new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

similarAds();
