export const parseErrorResponse = (error: unknown): string | string[] => {
  const { data } = error as ErrorResponseType;

  if (!data || !data.message) {
    return 'Something went wrong';
  }

  return data.message;
};
