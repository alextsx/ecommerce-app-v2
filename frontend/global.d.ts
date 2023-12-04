type Variant = 'destructive' | 'default';

type Product = {
  id: string;
  price: number;
  discounted_price: number;
  product_name: string;
  quantity: number;
};

//typical nestjs error response
type ErrorResponseType = {
  statusCode: number;
  data: {
    statusCode: number;
    message: string | string[];
    error: string;
  };
};
