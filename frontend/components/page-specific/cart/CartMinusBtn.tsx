import { FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { decreaseQuantity } from '@/redux/cart/cart.slice';
import { CartItem } from '@/redux/cart/cart.types';

export const CartMinusBtn = ({ cartItem }: { cartItem: CartItem }) => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="default"
      className="rounded-none w-5 h-5 flex justify-center items-center p-0"
      onClick={() => {
        dispatch(decreaseQuantity(cartItem.slug));
      }}
    >
      <FaMinus className="h-2 w-2 text-primary-foreground" />
    </Button>
  );
};
