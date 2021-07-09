// set form status
const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset, .map__filters>select');
const mapFilters = document.querySelector('.map__filters');

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

// set rooms and guests validation
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const guestsAmount = capacity.querySelectorAll('option');

const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const setRoomsValidation = () => {
  const roomValue = roomNumber.value;

  guestsAmount.forEach((guest) => {
    // indexOf ищет вхождение значения, которое мы указываем в скобках, со значением NumberOfGuests[roomValue],
    // Если в результате поиска он ничего не нашел, то вернет -1 и тогда ненужные значения можно отключить и скрыть
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

// set min price and placeholder validation
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const TypeOfHousing = {
  bungalow: '0',
  flat: '1000',
  hotel: '2000',
  house: '3000',
  palace: '5000',
};

const TypeOfHousingChangeHandler = () => {
  const minPrice = TypeOfHousing[type.value];
  price.placeholder = minPrice;
  price.min = minPrice;
};

type.addEventListener('change', TypeOfHousingChangeHandler);

// set checkin/checkout time validation
const adFormTime = adForm.querySelector('.ad-form__element--time');
const timeIn = adFormTime.querySelector('#timein');
const timeOut = adFormTime.querySelector('#timeout');

adFormTime.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
});

export { setStatusInactive, setStatusActive };
