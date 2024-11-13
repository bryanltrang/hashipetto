// custom error message codes for auth errors

export const ErrorMessageCodes: { [key: string]: string } = {
  form_param_format_invalid: 'Invalid email address. Try again',
  form_password_incorrect: 'Incorrect password. Try again.',
  too_many_requests: 'Too many login attempts. Try again later.',
  form_identifier_not_found: 'Email address not found. Try again.',
};
