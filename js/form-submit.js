import { isEscEvent } from './utils/keyboard-actions.js';

const main = document.querySelector('main');
const adForm = document.querySelector('.ad-form');
const buttonResetForm = adForm.querySelector('.ad-form__reset');
const successMessage = document.querySelector('#success');
const errorMessage = document.querySelector('#error');

// вешаем слушатель на отправку формы
const adFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch('https://23.javascript.pages.academy/keksobooking/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onError('Не удалось отправить объявление. Попробуйте ещё раз');
        }
      })
      .catch(() => {
        onError('Не удалось отправить объявление. Попробуйте ещё раз');
      });
  });
};

// успешная отправка
const setSuccessMessage = () => {
  const successMessageBox = successMessage.cloneNode(true);
  document.addEventListener('keydown', escapeSuccessMessageBoxHandler);
  document.addEventListener('click', closeSuccessMessageBoxHandler);
  main.appendChild(successMessageBox);
};

const escapeSuccessMessageBoxHandler = (evt) => {
  evt.preventDefault();
  if (isEscEvent(evt)) {
    successMessage.remove();
  }
  document.removeEventListener('keydown', escapeSuccessMessageBoxHandler);
  document.removeEventListener('click', closeSuccessMessageBoxHandler);
};

const closeSuccessMessageBoxHandler = () => {
  successMessage.remove();
  document.removeEventListener('keydown', escapeSuccessMessageBoxHandler);
  document.removeEventListener('click', closeSuccessMessageBoxHandler);
};

// ощибка при отправке
const setErrorMessage = () => {
  const errorMessageBox = errorMessage.cloneNode(true);
  document.addEventListener('keydown', escapeErrorMessageBoxHandler);
  document.addEventListener('click', closeErrorMessageBoxHandler);
  main.appendChild(errorMessageBox);
};

const escapeErrorMessageBoxHandler = (evt) => {
  evt.preventDefault();
  if (isEscEvent(evt)) {
    errorMessage.remove();
  }
  document.removeEventListener('keydown', escapeErrorMessageBoxHandler);
  document.removeEventListener('click', closeErrorMessageBoxHandler);
};

const closeErrorMessageBoxHandler = () => {
  successMessage.remove();
  document.removeEventListener('keydown', escapeErrorMessageBoxHandler);
  document.removeEventListener('click', closeErrorMessageBoxHandler);
};

buttonResetForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
});

const successfulFormSubmission = () => {
  setSuccessMessage();
  adForm.reset();
};

adFormSubmit(successfulFormSubmission, setErrorMessage);
