import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { increaseQuantity } from '@/redux/cart/cart.slice';
import { CartItem } from '@/redux/cart/cart.types';

export const CartPlusBtn = ({ cartItem }: { cartItem: CartItem }) => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="default"
      className="rounded-none w-5 h-5 flex justify-center items-center p-0"
      onClick={() => {
        dispatch(increaseQuantity(cartItem.slug));
      }}
    >
      <FaPlus className="h-2 w-2 text-primary-foreground" />
    </Button>
  );
};
