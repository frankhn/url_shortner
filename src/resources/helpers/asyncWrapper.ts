import { Response } from 'express';
import { BAD_REQUEST } from '../../constants/statusCodes';
import { responseWrapper } from '.';

export const asyncWrapper = async (res: Response, fn: () => void) => {
  try {
    await fn();
  } catch (error) {
    console.log(error)
    return responseWrapper({
      res,
      status: error.status || BAD_REQUEST,
      message: error.message,
      error: error.errors || error.error || error,
    });
  }
};
