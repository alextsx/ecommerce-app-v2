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
  },
  checkout: {
    address: {
      line1: {
        required: 'Address is required',
        max: 'Address must be less than 255 characters'
      },
      line2: {
        max: 'Address must be less than 255 characters'
      },
      city: {
        required: 'City is required',
        max: 'City must be less than 255 characters'
      },
      state: {
        required: 'State is required',
        max: 'State must be less than 255 characters'
      },
      country: {
        required: 'Country is required',
        max: 'Country must be less than 255 characters'
      },
      zipcode: {
        required: 'Zip is required',
        max: 'Zip must be less than 255 characters'
      }
    },
    customer: {
      firstName: {
        required: 'First name is required',
        max: 'First name must be less than 255 characters'
      },
      lastName: {
        required: 'Last name is required',
        max: 'Last name must be less than 255 characters'
      },
      email: {
        required: 'Email is required',
        email: 'Email is not valid'
      },
      phone: {
        required: 'Phone is required',
        max: 'Phone must be less than 255 characters'
      }
    },
    paymentMethod: {
      required: 'Payment method is required',
      oneOf: 'Payment method must be one of the following values: stripe, cod'
    }
  }
};
