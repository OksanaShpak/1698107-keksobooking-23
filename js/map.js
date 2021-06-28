import { setStatusActive } from './form.js';
import { similarAdFragment } from './popup.js';
import { createAds } from './data.js';

const address = document.querySelector('#address');
const resetButtons = document.querySelector('.ad-form__element--submit');

const DEFAULT_COORDINATES = {
  lat: 35.69381,
  lng: 139.70351,
};

const map = L.map('map-canvas')
  .on('load', () => {
    setStatusActive();
  })
  .setView(DEFAULT_COORDINATES, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
  address.value = `${newAddress.lat.toFixed(5)}, ${newAddress.lng.toFixed(5)}`;
});

// слой меток
// наша дата createAds
// const points = [];
// // наш темпелейт similarAdFragment
// const createCustomPopup = (point) => {
//   return popupElement;
// };

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const { location } = ad;
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon,
    },
  );

  marker.addTo(markerGroup).bindPopup(similarAdFragment(ad), {
    keepInView: true,
  });
};

createAds.forEach((ad) => {
  createMarker(ad);
});

// TODO: не работает очистка
// возвращение к исходному состоянию после отправки или очистки
resetButtons.addEventListener('click', () => {
  mainPinMarker.getLatLng(DEFAULT_COORDINATES);
  address.value = `${defaultAddress.lat}, ${defaultAddress.lng}`;
  map.setView(DEFAULT_COORDINATES, 10);
});
