'use client';

import { HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { Field, FormikProvider, useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAlertBox } from '@/hooks/useAlertBox';
import { useToggleToast } from '@/hooks/useToggleToast';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { cn } from '@/lib/shadcn-utils';
import { useSignupMutation } from '@/redux/auth/auth.api.slice';
import { registerSchema } from '@/schemas/auth.schema';
import { SubmitBtn } from '../button/SubmitBtn';

type RegistrationFormProps = HTMLAttributes<HTMLFormElement>;
type RegistrationFormValuesType = {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
};

const initialValues: RegistrationFormValuesType = {
  email: '',
  password: '',
  password_confirmation: '',
  first_name: '',
  last_name: ''
};

export const RegistrationForm = ({ className, ...props }: RegistrationFormProps) => {
  const router = useRouter();

  const [register, { isLoading }] = useSignupMutation();

  //notifications
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();

  const onSubmit = async (values: RegistrationFormValuesType) => {
    hide();
    const { email, password, password_confirmation, last_name, first_name } = values;
    try {
      await register({ email, password, password_confirmation, first_name, last_name }).unwrap();
      toggleToast({
        title: 'Successfully registered!',
        description: 'You can now login to your account.',
        variant: 'constructive'
      });
      router.push('/login');
    } catch (err: any) {
      const message = parseErrorResponse(err);
      show({
        message,
        title: 'Error',
        variant: 'destructive'
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerSchema
  });

  const { handleSubmit, errors, values, handleChange, isValid, touched } = formik;

  const isBtnDisabled = isLoading || !isValid;

  return (
    <FormikProvider value={formik}>
      <form className={cn('grid gap-10', className)} onSubmit={handleSubmit} {...props} noValidate>
        {visible && <AlertBoxComponent />}
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Label className="sr-only" htmlFor="first_name">
              First name
            </Label>
            <Field
              as={Input}
              id="first_name"
              placeholder="First name"
              type="text"
              autoCapitalize="none"
              autoComplete="first_name"
              autoCorrect="off"
              disabled={isLoading}
              error={touched.first_name && errors.first_name}
              onChange={handleChange}
              value={values.first_name}
            />
            <Label className="sr-only" htmlFor="last_name">
              Last name
            </Label>
            <Field
              as={Input}
              id="last_name"
              placeholder="Last name"
              type="text"
              autoCapitalize="none"
              autoComplete="last_name"
              autoCorrect="off"
              disabled={isLoading}
              error={touched.last_name && errors.last_name}
              onChange={handleChange}
              value={values.last_name}
            />
          </div>
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Field
            as={Input}
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            error={touched.email && errors.email}
            onChange={handleChange}
            value={values.email}
          />
          <Label className="sr-only" htmlFor="email">
            Password
          </Label>
          <Field
            as={Input}
            id="password"
            placeholder="Your password"
            type="password"
            autoCapitalize="none"
            autoComplete="false"
            autoCorrect="off"
            disabled={isLoading}
            error={touched.password && errors.password}
            onChange={handleChange}
            value={values.password}
          />
          <Label className="sr-only" htmlFor="email">
            Confirm password
          </Label>
          <Field
            as={Input}
            id="password_confirmation"
            placeholder="Confirm your password"
            type="password"
            autoCapitalize="none"
            autoComplete="false"
            autoCorrect="off"
            disabled={isLoading}
            error={touched.password_confirmation && errors.password_confirmation}
            onChange={handleChange}
            value={values.password_confirmation}
          />
        </div>
        <SubmitBtn isLoading={isLoading} isBtnDisabled={isBtnDisabled} label="Sign up" />
      </form>
    </FormikProvider>
  );
};
