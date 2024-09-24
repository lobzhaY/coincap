export enum MODAL {
  cart = "cart",
  buy = "buy",
}

export enum MESSAGE {
  add_success,
  delete_success,
}

export enum FORMAT_NUMS {
  SIGN = "sign",
  WORDS = "words",
  DOLLAR = "dollar",
  PERCENT = "percent",
  MILLION = "million",
  BILLION = "billion",
}

export const formatNumsWordData = {
    [FORMAT_NUMS.MILLION]: {
      wordString: "million",
      wordNums: 1e6,
    },
    [FORMAT_NUMS.BILLION]: {
      wordString: "billion",
      wordNums: 1e9,
    },
};

export const formatNumsSignData = {
      [FORMAT_NUMS.DOLLAR]: "$",
      [FORMAT_NUMS.PERCENT]: "%",
  };
