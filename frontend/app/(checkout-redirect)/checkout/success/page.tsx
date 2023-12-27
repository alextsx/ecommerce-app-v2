'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CardContent, CardHeader } from '@/components/ui/card';
import { emptyCart } from '@/redux/cart/cart.slice';

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emptyCart());
  }, [dispatch]);

  return (
    <>
      <CardHeader className="border-b-2">
        <h1 className="mx-auto text-3xl font-bold">🎉 Order successfully placed! 🎉</h1>
      </CardHeader>
      <CardContent className="mt-8">
        <h2 className="text-xl font-semibold text-green-700 mb-2">
          🙏 Thank You For Your Purchase
        </h2>
        <p className="text-md text-gray-700 mb-10">
          Your transaction was successful. We are committed to providing an unrivaled selection of
          high-quality products, an easy shopping experience, prompt delivery, and exceptional
          customer service.
        </p>

        <h2 className="text-xl font-semibold text-orange-700 mb-2">🚀 What&apos;s Next?</h2>
        <p className="text-md text-gray-700 mb-10">
          Our team will process your order and ship the most innovative products to you. You are
          guaranteed to have the coolest things money can buy without spending days researching on
          your own.
        </p>

        <h2 className="text-xl font-semibold text-purple-700 mb-2">💼 Stay With Us</h2>
        <p className="text-md text-gray-700 mb-10">
          Trust our team of experts to help you stay ahead of the curve, and always be on the
          cutting edge of technology. Join our product revolution as we continuously challenge what
          is possible in your life and help bring awesomeness worldwide.
        </p>
      </CardContent>
    </>
  );
};

export default CheckoutSuccess;
