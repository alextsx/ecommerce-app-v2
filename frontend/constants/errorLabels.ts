export const errorLabels = {
  auth: {
    email: {
      required: 'Email is required',
      email: 'Email is not valid'
    },
    password: {
      required: 'Password is required',
      min: 'Password must be at least 8 characters',
      sameAsCurrent: 'New password must be different from current password'
    },
    remember: {
      oneOf: 'Remember me must be one of the following values: true, false',
      required: 'Remember me is required'
    },
    first_name: {
      required: 'First name is required',
      max: 'First name must be less than 255 characters'
    },
    last_name: {
      required: 'Last name is required',
      max: 'Last name must be less than 255 characters'
    },
    password_confirmation: {
      required: 'Password confirmation is required',
      matches: 'Passwords must match'
    }
  }
};
