export const ErrorFormatted = (
  code: number = 404,
  type: 'ValidationError' | 'Custom',
  message: string,
  details?: string,
) => {
  return {
    code,
    type,
    message,
    details,
  };
};

export type IErrorFormatted = ReturnType<typeof ErrorFormatted>;

export type ResponseErrorBody = {
  errors?: IErrorFormatted[];
  error?: IErrorFormatted;
};
