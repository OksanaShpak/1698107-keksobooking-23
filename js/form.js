// set form status
const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');

const setStatusInactive = () => {
  adForm.classList.add('ad-form--disabled');

  for (const fieldset of fieldsets) {
    fieldset.disabled = true;
  }

  mapFilters.classList.add('map__filters--disabled');
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = true;
  }
};

const setStatusActive = () => {
  adForm.classList.remove('ad-form--disabled');

  for (const fieldset of fieldsets) {
    fieldset.disabled = false;
  }

  mapFilters.classList.remove('map__filters--disabled');
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = false;
  }
};

// set form validation
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

export { setStatusInactive, setStatusActive};
