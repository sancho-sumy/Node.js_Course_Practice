import { NextFunction, Request, Response } from 'express';
import {
    createMovieHandler,
    deleteMovieHandler,
    findMoviesByGenreHandler,
    getMovieHandler,
    getMoviesHandler,
    updateMovieHandler,
} from '../../controllers';
import { createMovie, deleteMovie, getMovie, getMovies, getMoviesByGenre, updateMovie } from '../../services';

jest.mock('../../services');

const setupMocks = () => {
    const req = { params: {} } as Request;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    return { req, res, next };
};

describe('Movie Controller', () => {
    afterEach(done => {
        jest.clearAllMocks();
        done();
    });

    describe('getMoviesHandler', () => {
        it('should fetch all movies successfully', async () => {
            const mockedMovies = [
                { id: '1', title: 'Movie 1', genre: 'Action' },
                { id: '2', title: 'Movie 2', genre: 'Comedy' },
            ];
            (getMovies as jest.Mock).mockResolvedValue(mockedMovies);

            const { req, res, next } = setupMocks();

            await getMoviesHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Fetched movies successfully',
                result: mockedMovies,
            });
        });

        it('should handle getMovies error', async () => {
            const testError = new Error('Test error');
            (getMovies as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();
            req.params.movieId = '4';

            await getMoviesHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });

    describe('getMovieHandler', () => {
        it('should fetch a movie by id successfully', async () => {
            const mockedMovie = { id: '3', title: 'Movie 3', genre: 'Drama' };
            (getMovie as jest.Mock).mockResolvedValue(mockedMovie);

            const { req, res, next } = setupMocks();
            req.params.movieId = '3';

            await getMovieHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Fetched movie successfully',
                result: mockedMovie,
            });
        });

        it('should handle getMovie error', async () => {
            const testError = new Error('Test error');
            (getMovie as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();
            req.params.movieId = '4';

            await getMovieHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });

    describe('createMovieHandler', () => {
        it('should create a new movie successfully', async () => {
            const mockedMovie = { title: 'Movie 5', genre: 'Action' };
            (createMovie as jest.Mock).mockResolvedValue(mockedMovie);

            const { req, res, next } = setupMocks();

            await createMovieHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Movie successfully created',
                result: mockedMovie,
            });
        });

        it('should handle createMovie error', async () => {
            const testError = new Error('Test error');
            (createMovie as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();

            await createMovieHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });

    describe('editMovieHandler', () => {
        it('should edit the movie successfully', async () => {
            const mockedMovie = { title: 'Movie 5', genre: 'Action' };
            (updateMovie as jest.Mock).mockResolvedValue(mockedMovie);

            const { req, res, next } = setupMocks();

            await updateMovieHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Movie successfully updated',
                result: mockedMovie,
            });
        });

        it('should handle editMovie error', async () => {
            const testError = new Error('Test error');
            (updateMovie as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();

            await updateMovieHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });

    describe('deleteMovieHandler', () => {
        it('should delete the movie successfully', async () => {
            (deleteMovie as jest.Mock).mockResolvedValue(true);

            const { req, res, next } = setupMocks();

            await deleteMovieHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Movie deleted.',
            });
        });

        it('should handle editMovie error', async () => {
            const testError = new Error('Test error');
            (deleteMovie as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();

            await deleteMovieHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });

    describe('findMoviesByGenreHandler', () => {
        it('should fetch all movies by genre successfully', async () => {
            const mockedMovies = [
                { id: '1', title: 'Movie 1', genre: 'Action' },
                { id: '2', title: 'Movie 2', genre: 'Comedy' },
            ];
            (getMoviesByGenre as jest.Mock).mockResolvedValue(mockedMovies);

            const { req, res, next } = setupMocks();

            await findMoviesByGenreHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Fetched movies successfully.',
                movies: mockedMovies,
            });
        });

        it('should handle getMoviesByGenre error', async () => {
            const testError = new Error('Test error');
            (getMoviesByGenre as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();
            req.params.movieId = '4';

            await findMoviesByGenreHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });
});
