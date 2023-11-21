import { NextFunction, Request, Response } from 'express';

import { createMovie, deleteMovie, getMovie, getMovies, getMoviesByGenre, updateMovie } from '../services';
import { logger, validationCheck } from '../utils';

export async function getMoviesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const movies = await getMovies();
        res.status(200).json({ message: 'Fetched movies successfully', result: movies });
    } catch (error) {
        next(error);
    }
}

export async function getMovieHandler(req: Request, res: Response, next: NextFunction) {
    try {
        validationCheck(req);
        const movieId = req.params.movieId;
        const movie = await getMovie(movieId);
        res.status(200).json({ message: 'Fetched movie successfully', result: movie });
    } catch (error) {
        next(error);
    }
}

export async function createMovieHandler(req: Request, res: Response, next: NextFunction) {
    try {
        validationCheck(req);
        const movie = await createMovie(req.body);
        logger.info('New movie created');
        return res.status(201).json({ message: `Movie successfully created`, result: movie });
    } catch (error: any) {
        next(error);
    }
}

export async function updateMovieHandler(req: Request, res: Response, next: NextFunction) {
    try {
        validationCheck(req);
        const movie = await updateMovie(req.params.movieId, req.body);
        logger.info('The movie was updated');
        return res.status(200).json({ message: `Movie successfully updated`, result: movie });
    } catch (error: any) {
        next(error);
    }
}

export async function deleteMovieHandler(req: Request, res: Response, next: NextFunction) {
    try {
        validationCheck(req);
        await deleteMovie(req.params.movieId);
        res.status(200).json({ message: 'Movie deleted.' });
    } catch (error) {
        next(error);
    }
}

export async function findMoviesByGenreHandler(req: Request, res: Response, next: NextFunction) {
    try {
        validationCheck(req);
        const movies = await getMoviesByGenre(req.params.genreName);
        res.status(200).json({ message: 'Fetched movies successfully.', movies });
    } catch (error) {
        next(error);
    }
}
