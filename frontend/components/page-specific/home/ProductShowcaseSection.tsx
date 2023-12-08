'use client';

import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition
} from '@reduxjs/toolkit/query';
import { ProductCard } from '@/components/card/ProductCard';
import SectionSeparator from '@/components/SectionSeparator';
import { ApiTagType } from '@/redux/api/api.slice';
import { Product } from '@/redux/product/product.types';

export const ProductShowcaseSection = ({
  useQueryHook,
  sectionName
}: {
  useQueryHook: UseQuery<
    QueryDefinition<
      void,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      ApiTagType,
      Product[],
      'api'
    >
  >;
  sectionName: string;
}) => {
  const { data: products, isLoading, isError } = useQueryHook();
  return (
    <>
      <SectionSeparator innerText={sectionName} />
      <section className="py-20 w-10/12 grid xl:grid-cols-4 grid-cols-2 gap-4 xl:gap-10 justify-items-center align-items-center">
        {products?.map((product) => <ProductCard key={product.name} product={product} />)}
      </section>
    </>
  );
};
