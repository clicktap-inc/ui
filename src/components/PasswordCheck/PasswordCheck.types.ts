export type PasswordRequirement = {
  label: string;
  test: (value: string) => boolean;
};

export type PasswordCheckProps = {
  value: string;
  variant?: 'default' | 'short' | 'requirements';
  requirements?: PasswordRequirement[];
};
