import { ComponentPropsWithoutRef, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '../icon/Spinner';

type SubmitBtnProps = {
  isLoading: boolean;
  isBtnDisabled: boolean;
  label: string;
} & ComponentPropsWithoutRef<'button'>;

export const SubmitBtn = memo(({ isBtnDisabled, isLoading, label, ...rest }: SubmitBtnProps) => {
  return (
    <Button type="submit" disabled={isBtnDisabled} {...rest}>
      {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
});

SubmitBtn.displayName = 'SubmitBtn';
