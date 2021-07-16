const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const adFormPhoto = {
  WIDTH: 70,
  HEIGHT: 70,
};

const adForm = document.querySelector('.ad-form');
const avatarInput = adForm.querySelector('.ad-form-header__input');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const adPhotoInput = adForm.querySelector('.ad-form__input');
const adPhotoPreview = adForm.querySelector('.ad-form__photo');

const setImgLoadingPreview = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const avatarHandler = () => {
  setImgLoadingPreview(avatarInput, avatarPreview);
};

const resetAvatar = () =>{
  avatarPreview.src = DEFAULT_AVATAR;
};

avatarInput.addEventListener('change', avatarHandler);

const createImg = () => {
  const img = document.createElement('img');
  img.width = adFormPhoto.WIDTH;
  img.height = adFormPhoto.HEIGHT;
  return img;
};

const resetAdPhotoPreview = () => {
  adPhotoPreview.innerHTML = '';
};

const setImgPreparation = () => {
  const imgPreview = createImg();
  resetAdPhotoPreview();
  adPhotoPreview.appendChild(imgPreview);
  return imgPreview;
};

const photoHandler = () => {
  setImgLoadingPreview(adPhotoInput, setImgPreparation());
};

adPhotoInput.addEventListener('change', photoHandler);

export {resetAvatar, resetAdPhotoPreview};
