const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');

const setStatusInactive = () => {
  adForm.classList.add('ad-form--disabled');

  for (const fieldset of fieldsets) {
    fieldset.setAttribute('disabled', 'disabled');
  }

  mapFilters.classList.add('map__filters--disabled');
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute('disabled', 'disabled');
  }
};

const setStatusActive = () => {
  adForm.classList.remove('ad-form--disabled');

  for (const fieldset of fieldsets) {
    fieldset.removeAttribute('disabled', 'disabled');
  }

  mapFilters.classList.remove('map__filters--disabled');
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute('disabled', 'disabled');
  }
};

export { setStatusInactive, setStatusActive };
