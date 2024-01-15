import {
  ERROR_AMOUNT_INTEGER_VALUES_ONLY_ALLOWED,
  ERROR_DESCRIPTION_MAX_LENGTH,
  ERROR_INVALID_AMOUNT_VALUE
} from 'constants/transactFormConstants';

export const validateAmount = (input: number) => {
  if (isNaN(input)) {
    return ERROR_AMOUNT_INTEGER_VALUES_ONLY_ALLOWED;
  }

  if (input && (input > 100000 || input<0)) {
    return ERROR_INVALID_AMOUNT_VALUE;
  }

  return '';
};

export const validateDescription = (value: string) => {
  const length = value.trim().length;
  if (length > 100) {
    return ERROR_DESCRIPTION_MAX_LENGTH;
  }

  return '';
};
