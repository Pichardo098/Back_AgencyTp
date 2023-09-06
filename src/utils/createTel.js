const createTel = () => {
  const baseNum = 33;
  const min = 10000000;
  const max = 99999999;
  const num = Math.floor(Math.random() * (max - min + 1)) + min;

  return `${baseNum}${num}`;
};

const createExt = () => {
  const min = 100;
  const max = 999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { createTel, createExt };
