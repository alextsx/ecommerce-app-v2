export class PaginationResultDto<T> {
  data: T[];
  meta: {
    first_page: number;
    last_page: number;
    items_per_page: number;
    currentPage: number;
    total: number;
  };
}
