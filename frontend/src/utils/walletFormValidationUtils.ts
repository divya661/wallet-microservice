import {
  ERROR_USERNAME_IS_REQUIRED,
  ERROR_INVALID_USERNAME,
  ERROR_INVALID_INITIAL_BALANCE,
  ERROR_BALANCE_INTEGER_VALUES_ONLY_ALLOWED
} from '../constants/walletFormConstants';

export const validateUsername = (input: string) => {
  if (input.trim().length == 0) {
    return ERROR_USERNAME_IS_REQUIRED;
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(input)) {
    return ERROR_INVALID_USERNAME;
  }

  return '';
};

export const validateBalance = (input: number) => {
  if (isNaN(input)) {
    return ERROR_BALANCE_INTEGER_VALUES_ONLY_ALLOWED;
  }

  if (input !== null && (input < 0 || input > 10000)) {
    return ERROR_INVALID_INITIAL_BALANCE;
  }

  return '';
};
