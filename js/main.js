// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => {
  if (min < 0 || max <= 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloat = (min, max, decimalPlace) => {
  if (min < 0 || max <= 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }

  const float = Math.random() * (max - min + 1) + min;
  return float.toFixed(decimalPlace);
};
