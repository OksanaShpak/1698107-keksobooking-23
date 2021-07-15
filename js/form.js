const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset, .map__filters>select');
const mapFilters = document.querySelector('.map__filters');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const guestsAmount = capacity.querySelectorAll('option');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const adFormTime = adForm.querySelector('.ad-form__element--time');
const timeIn = adFormTime.querySelector('#timein');
const timeOut = adFormTime.querySelector('#timeout');

const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const TypeOfHousing = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const setDesabledFieldsets = () => {
  fieldsets.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const setStatusInactive = () => {
  adForm.classList.add('ad-form--disabled');
  setDesabledFieldsets();
  mapFilters.classList.add('map__filters--disabled');
};

const setStatusActive = () => {
  adForm.classList.remove('ad-form--disabled');
  setDesabledFieldsets();
  mapFilters.classList.remove('map__filters--disabled');
};

const setRoomsValidation = () => {
  const roomValue = roomNumber.value;

  guestsAmount.forEach((guest) => {
    const isDisabled = NumberOfGuests[roomValue].indexOf(guest.value) === -1;
    guest.selected = NumberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

setRoomsValidation();

const roomNumberChangeHandler = () => {
  setRoomsValidation();
};

roomNumber.addEventListener('change', roomNumberChangeHandler);

const TypeOfHousingChangeHandler = () => {
  const minPrice = TypeOfHousing[type.value];
  price.placeholder = minPrice;
  price.min = minPrice;
};

type.addEventListener('change', TypeOfHousingChangeHandler);

adFormTime.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
});

export { setStatusInactive, setStatusActive, TypeOfHousingChangeHandler };
