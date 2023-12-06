import { boolean, object, string } from 'yup';
import { errorLabels } from '@/constants/errorLabels';

const { auth: authErrorLabels } = errorLabels;

const baseAuthSchema = object({
  email: string().email(authErrorLabels.email.email).required(authErrorLabels.email.required),
  password: string()
    .min(8, authErrorLabels.password.min)
    .required(authErrorLabels.password.required)
});

export const loginSchema = baseAuthSchema.shape({
  remember: boolean()
    .oneOf([true, false], authErrorLabels.remember.oneOf)
    .required(authErrorLabels.remember.required)
});

export const registerSchema = baseAuthSchema.shape({
  first_name: string()
    .required(authErrorLabels.first_name.required)
    .max(255, authErrorLabels.first_name.max),
  last_name: string()
    .required(authErrorLabels.last_name.required)
    .max(255, authErrorLabels.last_name.max),
  password_confirmation: string()
    .required(authErrorLabels.password_confirmation.required)
    .test(
      'passwords-match',
      authErrorLabels.password_confirmation.matches,
      (value, context) => value === context.parent.password
    )
});

export const forgotPasswordSchema = object({
  email: string().email(authErrorLabels.email.email).required(authErrorLabels.email.required)
});
