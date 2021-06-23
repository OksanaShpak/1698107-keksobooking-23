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

export { setStatusInactive, setStatusActive };
