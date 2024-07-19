export const formatAmount = (number: string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const isNumeric = (value: string) => {
  return /^-?\d+(\.\d+)?$/.test(value);
};
