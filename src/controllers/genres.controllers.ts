import { NextFunction, Request, Response } from 'express';

import { createGenre, deleteGenre, getGenre, getGenres, updateGenre } from '../services';
import { logger, validationCheck } from '../utils';

export async function getGenresHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const genres = await getGenres();
        res.status(200).json({ message: 'Fetched genres successfully', result: genres });
    } catch (error) {
        next(error);
    }
}

export async function getGenreHandler(req: Request, res: Response, next: NextFunction) {
    try {
        validationCheck(req);
        const genreId = req.params.genreId;
        const genre = await getGenre(genreId);
        res.status(200).json({ message: 'Fetched genre successfully', result: genre });
    } catch (error) {
        next(error);
    }
}

export async function createGenreHandler(req: Request, res: Response, next: NextFunction) {
    try {
        validationCheck(req);
        const genre = await createGenre(req.body);
        logger.info('New genre created');
        return res.status(201).json({ message: `Genre successfully created`, result: genre });
    } catch (error: any) {
        next(error);
        console.log(error);
    }
}

export async function updateGenreHandler(req: Request, res: Response, next: NextFunction) {
    try {
        validationCheck(req);
        const genre = await updateGenre(req.params.genreId, req.body);
        logger.info('The genre was updated');
        return res.status(200).json({ message: `Genre successfully updated`, result: genre });
    } catch (error: any) {
        next(error);
    }
}

export async function deleteGenreHandler(req: Request, res: Response, next: NextFunction) {
    try {
        validationCheck(req);
        await deleteGenre(req.params.genreId);
        res.status(200).json({ message: 'Genre deleted.' });
    } catch (error) {
        next(error);
    }
}
