import { isEscEvent } from './utils/keyboard-actions.js';
import { request } from './api.js';

const main = document.querySelector('main');
const adForm = document.querySelector('.ad-form');
const adFormSubmit = document.querySelector('.ad-form__submit');
const buttonResetForm = document.querySelector('.ad-form__reset');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const resetButton = adForm.querySelector('.ad-form__reset');

// успешная отправка
const escapeSuccessMessageBoxHandler = (evt) => {
  if (isEscEvent(evt)) {
    successMessage.remove();
  }
};

const closeSuccessMessageBoxHandler = () => {
  successMessage.remove();
  document.removeEventListener('click', closeSuccessMessageBoxHandler);
};

const setSuccessMessage = () => {
  const successMessageBox = successMessage.cloneNode(true);
  document.addEventListener('keydown', escapeSuccessMessageBoxHandler, {
    once: true,
  });
  document.addEventListener('click', closeSuccessMessageBoxHandler);
  main.appendChild(successMessageBox);
};

// ошибка при отправке
const closeErrorMessageBoxHandler = () => {
  successMessage.remove();
  document.removeEventListener('click', closeErrorMessageBoxHandler);
};

const escapeErrorMessageBoxHandler = (evt) => {
  evt.preventDefault();
  if (isEscEvent(evt)) {
    errorMessage.remove();
    document.removeEventListener('keydown', escapeErrorMessageBoxHandler);
    document.removeEventListener('click', closeErrorMessageBoxHandler);
  }
};

const setErrorMessage = () => {
  const errorMessageBox = errorMessage.cloneNode(true);
  document.addEventListener('keydown', escapeErrorMessageBoxHandler);
  main.appendChild(errorMessageBox);
};

buttonResetForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
});

const successfulFormSubmission = () => {
  setSuccessMessage();
  adForm.reset();
};

// вешаем слушатель на отправку формы
adFormSubmit.addEventListener('click', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  request(successfulFormSubmission, setErrorMessage, 'POST', formData);
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
});
