/* 

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })

*/

import { ToastAction } from '@radix-ui/react-toast';
import { ToastActionElement } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

type UseToggleToastProps = {
  title: string;
  description: string;
  variant: Variant;
  actionMessage?: string;
};

export const useToggleToast = () => {
  const { toast } = useToast();

  const toastAction = (toastActionMessage: string): ToastActionElement => (
    <ToastAction altText={toastActionMessage}>{toastActionMessage}</ToastAction>
  );

  return ({ title, description, variant, actionMessage }: UseToggleToastProps) =>
    toast({
      variant,
      title,
      description,
      action: actionMessage ? toastAction(actionMessage) : undefined
    });
};
