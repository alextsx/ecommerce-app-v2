'use client';

import { BaseTable } from '@/components/table/BaseTable';
import { useGetCategoriesQuery } from '@/redux/categories/categories.api.slice';
import { CategoriesListTableColumns } from './TableColumns';

const CategoriesListTable = () => {
  const { data, isLoading, isFetching } = useGetCategoriesQuery();
  return (
    <BaseTable
      columns={CategoriesListTableColumns}
      data={data}
      isFetching={isFetching}
      isLoading={isLoading}
    />
  );
};

export default CategoriesListTable;
