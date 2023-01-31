import moment from "moment";

export const formatVietnameseToString = (value) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-")
    .toLowerCase();
};

export const getNumberPrices = (string) => {
  let arr = string.split(" ");
  const numbers = arr.filter((item) => isFinite(+item) && !isNaN(+item));
  return numbers;
};

export const getNumberAreas = (string) => {
  let arr = string.split(" ");
  const numbers = arr.map((item) => +item.match(/\d+/)).filter((item) => item !== 0);
  return numbers;
};
export const checkStatus = (date) => {
  const today = new Date().toDateString();
  return moment(date, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(today);
};
