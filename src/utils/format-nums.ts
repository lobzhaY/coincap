export const formatNums = (str: string): string => {
  return parseFloat(str).toFixed(2);
};

export const formatToBillion = (str: string): string => {
  return `${(parseFloat(str) / 1e9).toFixed(2)} billion`;
};

export const formatToMillion = (str: string): string => {
  return `${(parseFloat(str) / 1e6).toFixed(2)} million`;
};

export const addDollarSign = (str: string): string => {
  return `${str} $`;
};

export const addProcentSign = (str: string): string => {
  return `${str} %`;
};
