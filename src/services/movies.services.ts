import { CustomError, Movie } from '../interfaces';
import { GenreModel, MovieModel } from '../models';

export async function getMovies() {
    try {
        const movies = await MovieModel.find();
        return movies;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getMovie(movieId: string) {
    try {
        const movie = await MovieModel.findById(movieId, 'title description releaseDate genre');
        if (!movie) {
            const error: CustomError = new Error('Could not find movie.');
            error.statusCode = 404;
            throw error;
        }
        return movie;
    } catch (error: any) {
        throw error;
    }
}

export async function createMovie(input: Movie) {
    try {
        const movie = await MovieModel.create(input);
        return movie;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateMovie(movieId: string, { title, description, releaseDate, genre }: Movie) {
    try {
        const movie = await MovieModel.findById(movieId, 'title description releaseDate genre');
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
        return movie;
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
        return true;
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
        return movies;
    } catch (error: any) {
        throw error;
    }
}
