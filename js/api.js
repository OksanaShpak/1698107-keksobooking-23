const Url = {
  SERVER: 'https://23.javascript.pages.academy/keksobooking/',
  DATA: 'https://23.javascript.pages.academy/keksobooking/data',
};

const getData = (onSuccess) => {
  fetch(Url.DATA)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(Url.SERVER, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить объявление. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить объявление. Попробуйте ещё раз');
    });
};

export { getData, sendData };
