import { Request } from 'express';
import { validationResult } from 'express-validator';

import { CustomError } from '../interfaces';

export const validationCheck = (req: Request) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error: CustomError = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array().map(err => err.msg);
        throw error;
    }
    return true;
};
