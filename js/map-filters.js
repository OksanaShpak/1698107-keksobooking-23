const MAX_OFFERS = 10;
const DEFAULT_VALUE = 'any';

const priceRange = {
  'low': {
    start: 0,
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
    end: Infinity,
  },
};

const mapFilters = Array.from(document.querySelector('.map__filters').children);

const filters = {
  'housing-type': (data, filter) => filter.value === data.offer.type,
  'housing-price': (data, filter) => data.offer.price >= priceRange[filter.value].start && data.offer.price < priceRange[filter.value].end,
  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),
  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),
  'housing-features': (data, filter) => {
    const checkedElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
    return checkedElements.every((checkbox) => data.offer.features && data.offer.features.some((feature) => feature === checkbox.value));
  },
};

const filterAds = (data) => {
  const offers = [];
  let i = 0;
  let result;

  while (i < data.length && offers.length < MAX_OFFERS) {
    result = mapFilters.every((filter) => (filter.value === DEFAULT_VALUE) ? true : filters[filter.id](data[i], filter));
    if (result) {
      offers.push(data[i]);
    }
    i++;
  }
  return offers;
};

export { filterAds };
