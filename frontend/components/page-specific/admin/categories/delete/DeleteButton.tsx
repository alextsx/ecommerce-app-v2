import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DeleteButton = () => {
  return (
    <Button className="text-lg text-center" variant="destructive">
      <Trash2 />
    </Button>
  );
};
