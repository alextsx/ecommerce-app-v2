import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToggleToast } from '@/hooks/useToggleToast';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { useDeleteCategoryMutation } from '@/redux/categories/categories.api.slice';

export const DeleteButton = ({ slug }: { slug: string }) => {
  //mutation
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  //toast
  const toggleToast = useToggleToast();

  const handleDeleteButtonClick = async () => {
    try {
      await deleteCategory(slug).unwrap();
      toggleToast({
        title: 'Category updated.',
        description: `Category ${slug} has been deleted.`,
        variant: 'constructive'
      });

      return;
    } catch (err) {
      const message = parseErrorResponse(err);
      toggleToast({
        title: 'Error',
        description: message,
        variant: 'destructive'
      });
    }
  };
  return (
    <Button onClick={handleDeleteButtonClick} className="text-lg text-center" variant="destructive">
      <Trash2 />
    </Button>
  );
};
