interface CustomResponse extends Response {
  data: {
    message: string;
  };
}

export interface CustomError extends Error {
  response: CustomResponse;
}
