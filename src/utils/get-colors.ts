import { colors } from "../constants/utils";

export const getChangePercentColor = (str: string): string => {
  return parseFloat(str) < 0 ? colors.red : colors.green;
};
