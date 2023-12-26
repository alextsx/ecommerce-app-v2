'use client';

import { useDispatch } from 'react-redux';
import { addToCart as addToCartAction } from '@/redux/cart/cart.slice';
import { DetailedProduct, Product } from '@/redux/product/product.types';
import { useToggleToast } from './useToggleToast';

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const toast = useToggleToast();

  const addToCart = (product: DetailedProduct | Product) => {
    dispatch(addToCartAction(product));
    toast({
      title: 'Success',
      description: `${product.name} added to cart`,
      variant: 'constructive'
    });
  };

  return { addToCart };
};
