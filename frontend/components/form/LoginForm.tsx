'use client';

import { HTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Field, FormikProvider, useFormik } from 'formik';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAlertBox } from '@/hooks/useAlertBox';
import { useToggleToast } from '@/hooks/useToggleToast';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { cn } from '@/lib/shadcn-utils';
import { useLoginMutation } from '@/redux/auth/auth.api.slice';
import { setAccessToken, setAuthDetails } from '@/redux/auth/auth.slice';
import { ROLES } from '@/redux/auth/auth.types';
import { loginSchema } from '@/schemas/auth.schema';
import { SubmitBtn } from '../button/SubmitBtn';

type LoginFormProps = HTMLAttributes<HTMLFormElement>;
type LoginFormValuesType = {
  email: string;
  password: string;
  remember: boolean;
};

const initialValues: LoginFormValuesType = {
  email: '',
  password: '',
  remember: false
};

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  //notifications
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();

  const onSubmit = async (values: LoginFormValuesType) => {
    hide();
    const { email, password, remember } = values;
    try {
      const response = await login({ email, password, remember }).unwrap();
      const { access_token } = response;
      dispatch(setAccessToken(access_token));
      dispatch(setAuthDetails({ email, role: ROLES.CUSTOMER }));
      toggleToast({
        title: 'Success',
        description: 'You are now logged in!',
        variant: 'constructive'
      });

      router.push('/');
    } catch (err) {
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
    validationSchema: loginSchema,
    validateOnBlur: true
  });

  const { handleSubmit, setFieldValue, errors, values, handleChange, touched, isValid } = formik;

  const isBtnDisabled = isLoading || !isValid;

  return (
    <FormikProvider value={formik}>
      <form className={cn('grid gap-5', className)} onSubmit={handleSubmit} {...props} noValidate>
        {visible && <AlertBoxComponent />}
        <div className="grid gap-2">
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
        </div>
        <SubmitBtn isLoading={isLoading} isBtnDisabled={isBtnDisabled} label="Login" />
        <div className="flex items-center space-x-2">
          <Field
            as={Checkbox}
            id="remember"
            checked={values.remember}
            onCheckedChange={() => setFieldValue('remember', !values.remember)}
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
      </form>
    </FormikProvider>
  );
};
