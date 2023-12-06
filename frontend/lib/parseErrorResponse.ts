export const parseErrorResponse = (error: unknown): string => {
  const { data } = error as ErrorResponseType;

  if (!data || !data.message) {
    return 'Something went wrong';
  }

  if (Array.isArray(data.message)) {
    return data.message[0];
  }

  return data.message;
};
