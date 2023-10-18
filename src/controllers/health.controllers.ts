import { Request, Response, NextFunction } from 'express';

export async function getStatusHandler(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({ message: 'App is up and running', result: 'OK' });
    } catch (error) {
        next(error);
    }
}
