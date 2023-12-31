import { CustomError, Genre } from '../interfaces';
import { GenreModel } from '../models';

export async function getGenres() {
    try {
        const genres = await GenreModel.find();
        return genres;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getGenre(genreId: string) {
    try {
        const genre = await GenreModel.findById(genreId, 'name');
        if (!genre) {
            const error: CustomError = new Error('Could not find genre.');
            error.statusCode = 404;
            throw error;
        }
        return genre;
    } catch (error: any) {
        throw error;
    }
}

export async function createGenre(input: Genre) {
    try {
        const genre = await GenreModel.create(input);
        return genre;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateGenre(genreId: string, { name }: Genre) {
    try {
        const genre = await GenreModel.findById(genreId, 'name');
        if (!genre) {
            const error: CustomError = new Error('Could not find genre.');
            error.statusCode = 404;
            throw error;
        }
        genre.name = name;
        await genre.save();
        return genre;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteGenre(genreId: string) {
    try {
        const genre = await GenreModel.findById(genreId);
        if (!genre) {
            const error: CustomError = new Error('Could not find genre.');
            error.statusCode = 404;
            throw error;
        }
        await GenreModel.findByIdAndRemove(genreId);
        return genre;
    } catch (error: any) {
        throw error;
    }
}
