import { NextFunction, Request, Response } from 'express';
import { getStatusHandler } from '../../controllers';

describe('Health Controller', () => {
    it('should provide the status successfully', async () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        await getStatusHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'App is up and running',
            result: 'OK',
        });
    });

    it('should handle error correctly', async () => {
        const req = {} as Request;
        const res = {
            status: () => {
                throw new Error('An error occurred');
            },
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        await getStatusHandler(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});
