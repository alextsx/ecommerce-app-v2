'use client';

import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconCheckcircle } from '@/components/icon/IconCheckcircle';
import { IconChevronright } from '@/components/icon/IconChevronright';
import { IconCreditcard } from '@/components/icon/IconCreditcard';
import { IconMoneybillwave } from '@/components/icon/IconMoneybillwave';
import { IconShoppingcart } from '@/components/icon/IconShoppingcart';
import { selectCart } from '@/redux/cart/cart.slice';

const headerItems = [
  {
    innerText: 'Cart',
    icon: IconShoppingcart,
    pathname: '/cart'
  },
  {
    innerText: 'Checkout',
    icon: IconCreditcard,
    pathname: '/checkout'
  },
  {
    innerText: 'Payment',
    icon: IconMoneybillwave,
    pathname: '/payment'
  },
  {
    innerText: 'Order Complete',
    icon: IconCheckcircle,
    pathname: '/order-complete'
  }
];

//todo make variants for these
const activeHeaderItemDivStyle = 'text-blue-500 bg-blue-100';
const inactiveHeaderItemDivStyle = 'hover:text-blue-500 hover:bg-blue-100';

const activeHeaderItemTextStyle = 'text-blue-500';
const inactiveHeaderItemTextStyle = 'text-gray-500';

const disabledHeaderItemTextStyle = 'text-gray-300';

export default function Component({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const cart = useSelector(selectCart);
  return (
    <>
      <div className="flex items-center justify-around max-w-4xl w-full gap-2 pb-10 md:gap-4">
        {headerItems.map(({ innerText, icon: Icon, pathname: headerItemPathname }, index) => {
          const isUnclickableElement = innerText === 'Payment' || innerText === 'Order Complete';
          const isActive = pathname === headerItems[index].pathname;
          const isCheckoutWithEmptyCart = innerText === 'Checkout' && !cart.length;
          const isDisabled = isActive || isUnclickableElement || isCheckoutWithEmptyCart;

          const textStyle = isActive
            ? activeHeaderItemTextStyle
            : isUnclickableElement
              ? disabledHeaderItemTextStyle
              : inactiveHeaderItemTextStyle;

          const innerHTML = (
            <>
              <Icon className={textStyle} />
              <p className={textStyle}>{innerText}</p>
              {index < headerItems.length - 1 && <IconChevronright className={textStyle} />}
            </>
          );

          if (isDisabled) {
            return (
              <div
                key={index}
                className={`flex items-center space-x-2 ${
                  isActive ? activeHeaderItemDivStyle : inactiveHeaderItemDivStyle
                } rounded p-2`}
              >
                {innerHTML}
              </div>
            );
          }

          return (
            <Link
              href={headerItemPathname}
              key={index}
              className={`flex items-center space-x-2 ${
                isActive ? activeHeaderItemDivStyle : inactiveHeaderItemDivStyle
              } rounded p-2`}
            >
              {innerHTML}
            </Link>
          );
        })}
      </div>
      {children}
    </>
  );
}
