export const textFieldValidationRules = {
  minLength: 2,
  maxLength: 30,
  required: true,
};

export const optionalTextFieldValidationRules = {
  minLength: 2,
  maxLength: 30,
};

export const numberFieldValidationRules = {
  pattern: /^\d+$/,
  required: true,
};

export const emailValidationRules = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const passwordValidationRules = {
  required: true,
  minLength: 8,
  maxLength: 16,
};

export const userNameValidationRules = {
  required: true,
  minLength: 2,
  maxLength: 15,
};
