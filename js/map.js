import { setStatusActive } from './form.js';
import { renderCard } from './popup.js';
import { getData } from './api.js';

const address = document.querySelector('#address');
const resetButtons = document.querySelector('.ad-form__element--submit');

const DEFAULT_COORDINATES = {
  lat: 35.69381,
  lng: 139.70351,
};
const ZOOM_MAP = 10;
const FIXED_NUMBER = 5;

const mainPin = {
  url: '../img/main-pin.svg',
  size: [52, 52],
  anchor: [26, 52],
};

const Pin = {
  url: '../img/pin.svg',
  size: [40, 40],
  anchor: [20, 40],
};

const map = L.map('map-canvas')
  .on('load', () => {
    setStatusActive();
  })
  .setView(DEFAULT_COORDINATES, ZOOM_MAP);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

// заполнение адресса по умалчанию и обновление при смене положения пина
const defaultAddress = mainPinMarker.getLatLng();
address.value = `${defaultAddress.lat}, ${defaultAddress.lng}`;

mainPinMarker.on('moveend', (evt) => {
  const newAddress = evt.target.getLatLng();
  address.value = `${newAddress.lat.toFixed(FIXED_NUMBER)}, ${newAddress.lng.toFixed(FIXED_NUMBER)}`;
});

const pinIcon = L.icon({
  iconUrl: Pin.url,
  iconSize: Pin.size,
  iconAnchor: Pin.anchor,
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
      {
        icon: pinIcon,
      },
    );
    marker.addTo(markersGroup).bindPopup(() => renderCard(ad), {
      keepInView: true,
    });
  });
};

getData(() => {
  createMarker();
});

// возвращение к исходному состоянию после отправки или очистки
resetButtons.addEventListener('click', (evt) => {
  evt.preventDefault();
  mainPinMarker.setLatLng(DEFAULT_COORDINATES);
  address.value = `${defaultAddress.lat}, ${defaultAddress.lng}`;
  map.setView(DEFAULT_COORDINATES, ZOOM_MAP);
});
