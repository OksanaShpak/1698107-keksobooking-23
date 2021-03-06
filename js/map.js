import { setStatusActive, setStatusInactive } from './form.js';
import { renderCard } from './popup.js';
import { request } from './api.js';
import { filterAds } from './map-filters.js';
import { debounce } from './utils/debounce.js';

const address = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const errorLoad = document.querySelector('#error-load').content.querySelector('.error-load');

const DEFAULT_COORDINATES = {
  lat: 35.69381,
  lng: 139.70351,
};
const ZOOM_MAP = 10;
const FIXED_NUMBER = 5;
const MAX_ADS = 10;
const RENDER_DELAY = 500;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const mainPin = {
  url: '../img/main-pin.svg',
  size: [52, 52],
  anchor: [26, 52],
};

const pin = {
  url: '../img/pin.svg',
  size: [40, 40],
  anchor: [20, 40],
};

setStatusInactive();
const map = L.map('map-canvas')
  .on('load', () => {
    setStatusActive();
  })
  .setView(DEFAULT_COORDINATES, ZOOM_MAP);

L.tileLayer(TILE_LAYER, {
  attribution: ATTRIBUTION,
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: mainPin.url,
  iconSize: mainPin.size,
  iconAnchor: mainPin.anchor,
});

const mainPinMarker = L.marker(DEFAULT_COORDINATES, {
  draggable: true,
  icon: mainPinIcon,
});
mainPinMarker.addTo(map);

const defaultAddress = mainPinMarker.getLatLng();
address.value = `${defaultAddress.lat}, ${defaultAddress.lng}`;

mainPinMarker.on('moveend', (evt) => {
  const newAddress = evt.target.getLatLng();
  address.value = `${newAddress.lat.toFixed(FIXED_NUMBER)}, ${newAddress.lng.toFixed(FIXED_NUMBER)}`;
});

const pinIcon = L.icon({
  iconUrl: pin.url,
  iconSize: pin.size,
  iconAnchor: pin.anchor,
});

const markersGroup = L.layerGroup().addTo(map);

const createMarker = (ads) => {
  ads.forEach((ad) => {
    const { location } = ad;
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      { icon: pinIcon });
    marker.addTo(markersGroup).bindPopup(() => renderCard(ad), {
      keepInView: true,
    });
  });
};

let offers = [];

const setMapFiltersChange = () => {
  markersGroup.clearLayers();
  createMarker(filterAds(offers));
};

const setBounceFix = debounce(() => setMapFiltersChange(), RENDER_DELAY);

const onSuccess = (data) => {
  mapFilters.classList.remove('map__filters--disabled');
  offers = data.slice();
  createMarker(offers.slice(0, MAX_ADS));
  mapFilters.addEventListener('change', setBounceFix);
};

const onError = () => {
  const ALERT_SHOW_TIME = 5000;

  const showAlert = () => {
    errorLoad.style.zIndex = 100;
    errorLoad.style.position = 'absolute';
    errorLoad.style.left = 0;
    errorLoad.style.top = 0;
    errorLoad.style.right = 0;
    errorLoad.style.padding = '10px 3px';
    errorLoad.style.fontSize = '30px';
    errorLoad.style.textAlign = 'center';
    errorLoad.style.backgroundColor = 'red';

    document.body.append(errorLoad);

    setTimeout(() => {
      errorLoad.remove();
    }, ALERT_SHOW_TIME);
  };
  showAlert();
};

request(onSuccess, onError, 'GET');

const resetMap = () => {
  mapFilters.reset();
  setBounceFix();
  mainPinMarker.setLatLng(DEFAULT_COORDINATES);
  address.value = `${defaultAddress.lat}, ${defaultAddress.lng}`;
  map.setView(DEFAULT_COORDINATES, ZOOM_MAP);
};

export { resetMap };
