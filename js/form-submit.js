import { isEscEvent } from './utils/keyboard-actions.js';
import { request } from './api.js';

const adForm = document.querySelector('.ad-form');
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorWindow.querySelector('.error__button');
const resetButton = adForm.querySelector('.ad-form__reset');

// закрытие через кнопку Esc
const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    success.remove();
    error.remove();
  }
};

// закрытие окна сообщения
const closeMessageWindow = (message) => {
  document.addEventListener('keydown', onEscKeydown, { once: true });
  message.addEventListener('click', () => {
    message.remove();
    document.removeEventListener('keydown', onEscKeydown);
  });
};

// сообщение об успешной отправке
const setSuccessMessage = () => {
  const successMessageBox = success.cloneNode(true);
  document.body.append(successMessageBox);
  closeMessageWindow(successMessageBox);
};

// сообщение об неуспешной отправке
const setErrorMessage = () => {
  const errorMessageBox = error.cloneNode(true);
  document.body.append(errorMessageBox);
  closeMessageWindow(errorMessageBox);
};

// успешная отправка
// const escapeSuccessMessageBoxHandler = (evt) => {

//   if (isEscEvent(evt)) {
//     successMessage.remove();
//   }
// };

// const closeSuccessMessageBoxHandler = () => {
//   successMessage.remove();
//   document.removeEventListener('click', closeSuccessMessageBoxHandler);
// };

// const setSuccessMessage = () => {
//   const successMessageBox = successMessage.cloneNode(true);
//   body.appendChild(successMessageBox);
//   document.addEventListener('keydown', escapeSuccessMessageBoxHandler, {
//     once: true,
//   });
//   document.addEventListener('click', closeSuccessMessageBoxHandler);
// };

// // ошибка при отправке
// const closeErrorMessageBoxHandler = () => {
//   successMessage.remove();
//   document.removeEventListener('click', closeErrorMessageBoxHandler);
// };

// const escapeErrorMessageBoxHandler = (evt) => {
//   // evt.preventDefault();
//   if (isEscEvent(evt)) {
//     errorMessage.remove();
//     // document.removeEventListener('keydown', escapeErrorMessageBoxHandler);
//     document.removeEventListener('click', closeErrorMessageBoxHandler);
//   }
// };

// const setErrorMessage = () => {
//   const errorMessageBox = errorMessage.cloneNode(true);
//   document.addEventListener('keydown', escapeErrorMessageBoxHandler);
//   body.appendChild(errorMessageBox);
// };

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
});

const successfulFormSubmission = () => {
  setSuccessMessage();
  adForm.reset();
};

// вешаем слушатель на отправку формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  // const data = new FormData(adForm);
  console.log(data);
  if (adForm.checkValidity()) {
    request(successfulFormSubmission, setErrorMessage, 'POST', data);
  }
});
