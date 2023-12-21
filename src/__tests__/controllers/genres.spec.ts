import { NextFunction, Request, Response } from 'express';
import {
    createGenreHandler,
    deleteGenreHandler,
    getGenreHandler,
    getGenresHandler,
    updateGenreHandler,
} from '../../controllers';
import { createGenre, deleteGenre, getGenre, getGenres, updateGenre } from '../../services';

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

describe('Genre Controller', () => {
    afterEach(done => {
        jest.clearAllMocks();
        done();
    });

    describe('getGenresHandler', () => {
        it('should fetch all genres successfully', async () => {
            const mockedGenres = [
                { id: '1', name: 'Genre 1' },
                { id: '2', name: 'Genre 2' },
            ];
            (getGenres as jest.Mock).mockResolvedValue(mockedGenres);

            const { req, res, next } = setupMocks();

            await getGenresHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Fetched genres successfully',
                result: mockedGenres,
            });
        });

        it('should handle getGenres error', async () => {
            const testError = new Error('Test error');
            (getGenres as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();

            await getGenresHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });
    describe('getGenreHandler', () => {
        it('should fetch a genre by id successfully', async () => {
            const mockedGenre = { id: '3', name: 'Genre 3' };
            (getGenre as jest.Mock).mockResolvedValue(mockedGenre);

            const { req, res, next } = setupMocks();
            req.params.genreId = '3';

            await getGenreHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Fetched genre successfully',
                result: mockedGenre,
            });
        });

        it('should handle getGenre error', async () => {
            const testError = new Error('Test error');
            (getGenre as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();

            await getGenreHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });

    describe('createGenreHandler', () => {
        it('should create a new genre successfully', async () => {
            const mockedGenre = { name: 'Genre 5' };
            (createGenre as jest.Mock).mockResolvedValue(mockedGenre);

            const { req, res, next } = setupMocks();

            await createGenreHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Genre successfully created',
                result: mockedGenre,
            });
        });

        it('should handle createGenre error', async () => {
            const testError = new Error('Test error');
            (createGenre as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();

            await createGenreHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });

    describe('editGenreHandler', () => {
        it('should edit the genre successfully', async () => {
            const mockedGenre = { name: 'Genre 5' };
            (updateGenre as jest.Mock).mockResolvedValue(mockedGenre);

            const { req, res, next } = setupMocks();

            await updateGenreHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Genre successfully updated',
                result: mockedGenre,
            });
        });

        it('should handle editGenre error', async () => {
            const testError = new Error('Test error');
            (updateGenre as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();

            await updateGenreHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });

    describe('deleteGenreHandler', () => {
        it('should delete the genre successfully', async () => {
            (deleteGenre as jest.Mock).mockResolvedValue(true);

            const { req, res, next } = setupMocks();

            await deleteGenreHandler(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Genre deleted.',
            });
        });

        it('should handle editGenre error', async () => {
            const testError = new Error('Test error');
            (deleteGenre as jest.Mock).mockRejectedValue(testError);

            const { req, res, next } = setupMocks();

            await deleteGenreHandler(req, res, next);

            expect(next).toHaveBeenCalledWith(testError);
        });
    });
});
