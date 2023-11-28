import { useState } from 'react';
import { AlertBox, AlertBoxProps } from '@/components/AlertBox';

export const useAlertBox = () => {
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [variant, setVariant] = useState<Variant>('default');
  const [visible, setVisible] = useState<boolean>(false);

  const hide = () => {
    setVisible(false);
  };

  const show = ({ message, title, variant }: AlertBoxProps) => {
    setMessage(message);
    setTitle(title);
    setVariant(variant);
    setVisible(true);
  };

  const AlertBoxComponent = () => {
    if (!message || !title) return null;
    if (!visible) return null;
    return <AlertBox variant={variant} title={title} message={message} />;
  };

  return {
    visible,
    AlertBoxComponent,
    show,
    hide
  };
};
