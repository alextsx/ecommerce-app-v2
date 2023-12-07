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
