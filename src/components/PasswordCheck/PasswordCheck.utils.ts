/** @todo these functions should probably be passed as props to be able to extend */
export const checkStrength = (value: string) => {
  const isMinLength = value.length >= 8;
  let strength = 0;
  if (/^(?=.*[a-z])(?=.*[A-Z])/.test(value) && isMinLength) {
    strength += 1;
  }
  if (/\d/.test(value) && isMinLength) {
    strength += 1;
  }
  if (value.length >= 8) {
    strength += 1;
  }
  if (value.length >= 11) {
    strength += 1;
  }
  if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value) && isMinLength) {
    strength += 1;
  }
  return strength;
};

export const getProgressText = (strength: number) => {
  switch (strength) {
    case 5:
      return 'Very Strong';
    case 4:
      return 'Strong';
    case 3:
      return 'Good';
    case 2:
      return 'Weak';
    case 1:
      return 'Very Weak';
    default:
      return '';
  }
};

/** @todo this doesn't look like it is used...remove? */
export const getPasswordRequirements = (value = '') => {
  return {
    eightСharacters: value.length >= 8,
    upLowCaseLetters: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
    oneNumber: /\d/.test(value),
  };
};
