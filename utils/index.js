export const validPrice = (price) =>
  price.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '$1 ');

export const parseDate = (date) => date.split('.').reverse().join('-');

export const jsCoreDateCreator = (dateString) => {
  let dateParam = dateString.split(/[\s-:]/);
  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
  return new Date(...dateParam);
};
