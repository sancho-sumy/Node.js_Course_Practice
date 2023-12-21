import { Movie } from '../../interfaces';
import { GenreModel, MovieModel } from '../../models';
import { createMovie, deleteMovie, getMovie, getMovies, getMoviesByGenre, updateMovie } from '../../services';

jest.mock('../../models');

const testMovie: Movie = {
    title: 'Test Movie',
    description: 'A test movie',
    releaseDate: `12-12-2012`,
    genre: ['Drama', 'Action'],
};

describe('Movie Services', () => {
    afterEach(done => {
        jest.clearAllMocks();
        done();
    });

    describe('getMovies', () => {
        it('should get all movies successfully', async () => {
            const movies = [
                { id: 1, title: 'Movie 1', genre: 'Action' },
                { id: 2, title: 'Movie 2', genre: 'Comedy' },
            ];

            (MovieModel.find as jest.Mock).mockResolvedValue(movies);

            const result = await getMovies();

            expect(result).toEqual(movies);
            expect(MovieModel.find).toHaveBeenCalled();
        });

        it('should handle error', async () => {
            const testError = new Error('Test error');
            (MovieModel.find as jest.Mock).mockRejectedValue(testError);

            await expect(getMovies()).rejects.toThrow('Test error');
        });
    });

    describe('getMovie', () => {
        it('should get a movie by ID successfully', async () => {
            const testId = '12345';

            (MovieModel.findById as jest.Mock).mockResolvedValue(testMovie);

            const result = await getMovie(testId);

            expect(result).toEqual(testMovie);
            expect(MovieModel.findById).toHaveBeenCalledWith(testId, 'title description releaseDate genre');
        });

        it('should throw a "Could not find movie" error when getting a non-existent movie', async () => {
            (MovieModel.findById as jest.Mock).mockResolvedValue(null);

            await expect(getMovie('1')).rejects.toThrow('Could not find movie.');
        });
    });

    describe('createMovie', () => {
        it('should create a movie successfully', async () => {
            (MovieModel.create as jest.Mock).mockResolvedValue(testMovie);

            const result = await createMovie(testMovie);

            expect(result).toEqual(testMovie);
            expect(MovieModel.create).toHaveBeenCalledWith(testMovie);
        });

        it('should handle error', async () => {
            const testError = new Error('Test error');
            (MovieModel.create as jest.Mock).mockRejectedValue(testError);

            await expect(createMovie(testMovie)).rejects.toThrow('Test error');
        });
    });

    describe('updateMovie', () => {
        const testId = '12345';
        const updatedMovie = { ...testMovie, title: 'New Test Movie' };

        it('should update a movie successfully', async () => {
            (MovieModel.findById as jest.Mock).mockResolvedValue({ ...testMovie, save: jest.fn() });
            (MovieModel.prototype.save as jest.Mock).mockResolvedValue(true);

            const result = await updateMovie(testId, updatedMovie);

            expect(result.title).toEqual(updatedMovie.title);
            expect(MovieModel.findById).toHaveBeenCalledWith(testId, 'title description releaseDate genre');
            expect(result.save).toHaveBeenCalled();
        });

        it('should throw a "Could not find movie" error when getting a non-existent movie', async () => {
            (MovieModel.findById as jest.Mock).mockResolvedValue(null);

            await expect(updateMovie(testId, updatedMovie)).rejects.toThrow('Could not find movie.');
        });
    });

    describe('deleteMovie', () => {
        it('should delete a movie successfully', async () => {
            const testId = '12345';

            (MovieModel.findById as jest.Mock).mockResolvedValue(testMovie);
            (MovieModel.findByIdAndRemove as jest.Mock).mockResolvedValue(true);

            const result = await deleteMovie(testId);

            expect(result).toBeTruthy();
            expect(MovieModel.findByIdAndRemove).toHaveBeenCalledWith(testId);
        });

        it('should throw a "Could not find movie" error when getting a non-existent movie', async () => {
            (MovieModel.findById as jest.Mock).mockResolvedValue(null);

            await expect(deleteMovie('12345')).rejects.toThrow('Could not find movie.');
        });
    });

    describe('getMoviesByGenre', () => {
        const genreName = 'Action';
        const genreId = '98765';
        const movies = [
            { id: 1, title: 'Movie 1', genre: 'Action' },
            { id: 3, title: 'Movie 3', genre: 'Action' },
        ];

        it('should get movies by genre successfully', async () => {
            (GenreModel.findOne as jest.Mock).mockResolvedValue({ _id: genreId });
            (MovieModel.find as jest.Mock).mockResolvedValue(movies);

            const result = await getMoviesByGenre(genreName);

            expect(result).toEqual(movies);
            expect(GenreModel.findOne).toHaveBeenCalledWith({ name: new RegExp(`^${genreName}$`, 'i') });
            expect(MovieModel.find).toHaveBeenCalledWith({ genre: genreId });
        });

        it('should throw a "Such genre doesn\'t exist" error when getting a non-existent genre', async () => {
            (MovieModel.findOne as jest.Mock).mockResolvedValue(null);

            await expect(getMoviesByGenre(genreName)).rejects.toThrow("Such genre doesn't exist");
        });

        it('should throw a "Could not find any movies" error if there is no films of specific genre', async () => {
            (MovieModel.findOne as jest.Mock).mockResolvedValue('Action');
            (MovieModel.find as jest.Mock).mockResolvedValue(null);

            await expect(getMoviesByGenre(genreName)).rejects.toThrow('Could not find any movies.');
        });
    });
});
