import { MESSAGE } from "../constants/modal";

export const getNewAlertMessage = (
  coinName: string,
  action: MESSAGE
): string => {
  const actionMessage =
    action === MESSAGE.add_success
      ? "added successfully"
      : "successfully deleted";
  return `${coinName} ${actionMessage}`;
};
