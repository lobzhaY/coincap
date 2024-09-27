export enum MODAL {
  cart = 'cart',
  buy = 'buy',
}

export enum MESSAGE {
  add_success,
  delete_success,
}

export enum FORMAT_NUMS_WORD {
  MILLION = 'million',
  BILLION = 'billion',
}

export enum FORMAT_NUMS_SIGN {
  DOLLAR = 'dollar',
  PERCENT = 'percent',
}

export const formatNumsWordData = {
  [FORMAT_NUMS_WORD.MILLION]: {
    wordString: 'million',
    wordNums: 1e6,
  },
  [FORMAT_NUMS_WORD.BILLION]: {
    wordString: 'billion',
    wordNums: 1e9,
  },
};

export const formatNumsSignData = {
  [FORMAT_NUMS_SIGN.DOLLAR]: '$',
  [FORMAT_NUMS_SIGN.PERCENT]: '%',
};
