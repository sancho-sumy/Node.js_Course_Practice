import { omit } from 'lodash';

import { CustomError, Movie } from '../interfaces';
import { GenreModel, MovieModel } from '../models';

export async function getMovies() {
    try {
        const movies = await MovieModel.find();
        return omit(movies, 'result');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getMovie(movieId: string) {
    try {
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            const error: CustomError = new Error('Could not find movie.');
            error.statusCode = 404;
            throw error;
        }
        return omit(movie.toJSON(), 'result');
    } catch (error: any) {
        throw error;
    }
}

export async function createMovie(input: Movie) {
    try {
        const movie = await MovieModel.create(input);
        return omit(movie.toJSON(), 'result');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateMovie(movieId: string, { title, description, releaseDate, genre }: Movie) {
    try {
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            const error: CustomError = new Error('Could not find movie.');
            error.statusCode = 404;
            throw error;
        }
        movie.title = title ?? movie.title;
        movie.description = description ?? movie.description;
        movie.releaseDate = releaseDate ?? movie.releaseDate;
        movie.genre = [...genre];
        await movie.save();
        return omit(movie.toJSON(), 'result');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteMovie(movieId: string) {
    try {
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            const error: CustomError = new Error('Could not find movie.');
            error.statusCode = 404;
            throw error;
        }
        await MovieModel.findByIdAndRemove(movieId);
        return omit(movie.toJSON(), 'result');
    } catch (error: any) {
        throw error;
    }
}

export async function getMoviesByGenre(genreName: string) {
    try {
        const query = { name: new RegExp(`^${genreName}$`, 'i') };
        const genre = await GenreModel.findOne(query);
        if (!genre) {
            const error: CustomError = new Error("Such genre doesn't exist");
            error.statusCode = 404;
            throw error;
        }
        const movies = await MovieModel.find({ genre: genre._id });
        if (!movies) {
            const error: CustomError = new Error('Could not find any movies.');
            error.statusCode = 404;
            throw error;
        }
        return omit(movies, 'result');
    } catch (error: any) {
        throw error;
    }
}
