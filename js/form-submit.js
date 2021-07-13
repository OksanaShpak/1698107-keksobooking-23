import { isEscEvent } from './utils/keyboard-actions.js';
import { request } from './api.js';
import { resetAvatar, resetAdPhotoPreview } from './img-upload.js';
import { resetMap } from './map.js';


const adForm = document.querySelector('.ad-form');
const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const resetButton = adForm.querySelector('.ad-form__reset');

const removePopup = () => {
  const popup = document.querySelector('.success, .error');
  popup.remove();
};

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removePopup();
  }
};

const setSuccessMessage = () => {
  const successMessageBox = successTemplate.cloneNode(true);
  document.addEventListener('keydown', onEscKeydown, { once: true });
  successMessageBox.addEventListener('click', () => {
    removePopup();
    document.removeEventListener('keydown', onEscKeydown);
  });
  document.body.append(successMessageBox);
};

const setErrorMessage = () => {
  const errorMessageBox = errorTemplate.cloneNode(true);
  document.addEventListener('keydown', onEscKeydown);
  errorMessageBox.addEventListener('click', () => {
    removePopup();
    document.addEventListener('keydown', onEscKeydown);
  });
  document.body.append(errorMessageBox);
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetAvatar();
  resetAdPhotoPreview();
  resetMap();
});

const successfulFormSubmission = () => {
  setSuccessMessage();
  adForm.reset();
  resetAvatar();
  resetAdPhotoPreview();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  if (adForm.checkValidity()) {
    request(successfulFormSubmission, setErrorMessage, 'POST', data);
  }
});
