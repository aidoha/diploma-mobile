export const validPrice = (price) =>
  price.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '$1 ');

export const parseDate = (date) => date.split('.').reverse().join('-');

export const jsCoreDateCreator = (dateString) => {
  let dateParam = dateString.split(/[\s-:]/);
  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
  return new Date(...dateParam);
};

export const convertUTCDateToLocalDate = (date) => {
  let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  let offset = date.getTimezoneOffset() / 60;
  let hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};
