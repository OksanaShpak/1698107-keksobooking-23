const Urls = {
  POST: 'https://23.javascript.pages.academy/keksobooking/',
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
};

const request = (onSuccess, onError, method, data) => {
  fetch(Urls[method], {
    method: method,
    body: data,
  })
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      onError();
    });
};

export { request };
