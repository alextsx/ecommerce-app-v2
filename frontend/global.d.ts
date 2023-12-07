type Variant = 'destructive' | 'default';

//typical nestjs error response
type ErrorResponseType = {
  statusCode: number;
  data: {
    statusCode: number;
    message: string | string[];
    error: string;
  };
};

type PaginationResponse<T> = {
  data: T[];
  meta: {
    items_per_page: number;
    currentPage: number;
    first_page: number;
    last_page: number;
  };
};
