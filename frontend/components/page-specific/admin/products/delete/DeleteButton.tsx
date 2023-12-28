import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToggleToast } from '@/hooks/useToggleToast';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { useDeleteProductMutation } from '@/redux/product/product.api.slice';

export const ProductDeleteButton = ({ slug }: { slug: string }) => {
  //mutation
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  //toast
  const toggleToast = useToggleToast();

  const handleDeleteButtonClick = async () => {
    try {
      await deleteProduct(slug).unwrap();
      toggleToast({
        title: 'Product deleted',
        description: `Product with slug ${slug} has been deleted.`,
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
