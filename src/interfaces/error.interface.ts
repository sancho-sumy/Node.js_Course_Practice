import { ValidationError } from 'express-validator';

export interface CustomError {
    statusCode?: number;
    message: string | ValidationError;
    data?: any;
}
