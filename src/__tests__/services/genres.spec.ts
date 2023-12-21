import { Genre } from '../../interfaces';
import { GenreModel } from '../../models';
import { createGenre, deleteGenre, getGenre, getGenres, updateGenre } from '../../services';

jest.mock('../../models');

const testGenre: Genre = {
    name: 'Test Genre',
};

describe('Genre Services', () => {
    afterEach(done => {
        jest.clearAllMocks();
        done();
    });

    describe('getGenres', () => {
        it('should get all genres successfully', async () => {
            const genres = [
                { id: 1, title: 'Genre 1', genre: 'Action' },
                { id: 2, title: 'Genre 2', genre: 'Comedy' },
            ];

            (GenreModel.find as jest.Mock).mockResolvedValue(genres);

            const result = await getGenres();

            expect(result).toEqual(genres);
            expect(GenreModel.find).toHaveBeenCalled();
        });

        it('should handle error', async () => {
            const testError = new Error('Test error');
            (GenreModel.find as jest.Mock).mockRejectedValue(testError);

            await expect(getGenres()).rejects.toThrow('Test error');
        });
    });

    describe('getGenre', () => {
        it('should get a genre by ID successfully', async () => {
            const testId = '12345';

            (GenreModel.findById as jest.Mock).mockResolvedValue(testGenre);

            const result = await getGenre(testId);

            expect(result).toEqual(testGenre);
            expect(GenreModel.findById).toHaveBeenCalledWith(testId, 'name');
        });

        it('should throw a "Could not find genre" error when getting a non-existent genre', async () => {
            (GenreModel.findById as jest.Mock).mockResolvedValue(null);

            await expect(getGenre('1')).rejects.toThrow('Could not find genre.');
        });
    });

    describe('createGenre', () => {
        it('should create a genre successfully', async () => {
            (GenreModel.create as jest.Mock).mockResolvedValue(testGenre);

            const result = await createGenre(testGenre);

            expect(result).toEqual(testGenre);
            expect(GenreModel.create).toHaveBeenCalledWith(testGenre);
        });

        it('should handle error', async () => {
            const testError = new Error('Test error');
            (GenreModel.create as jest.Mock).mockRejectedValue(testError);

            await expect(createGenre(testGenre)).rejects.toThrow('Test error');
        });
    });

    describe('updateGenre', () => {
        const testId = '12345';
        const updatedGenre = { ...testGenre, name: 'New Test Genre' };

        it('should update a genre successfully', async () => {
            (GenreModel.findById as jest.Mock).mockResolvedValue({ ...testGenre, save: jest.fn() });
            (GenreModel.prototype.save as jest.Mock).mockResolvedValue(true);

            const result = await updateGenre(testId, updatedGenre);

            expect(result.name).toEqual(updatedGenre.name);
            expect(GenreModel.findById).toHaveBeenCalledWith(testId, 'name');
            expect(result.save).toHaveBeenCalled();
        });

        it('should throw a "Could not find genre" error when getting a non-existent genre', async () => {
            (GenreModel.findById as jest.Mock).mockResolvedValue(null);

            await expect(updateGenre(testId, updatedGenre)).rejects.toThrow('Could not find genre.');
        });
    });

    describe('deleteGenre', () => {
        it('should delete a genre successfully', async () => {
            const testId = '12345';

            (GenreModel.findById as jest.Mock).mockResolvedValue(testGenre);
            (GenreModel.findByIdAndRemove as jest.Mock).mockResolvedValue(true);

            const result = await deleteGenre(testId);

            expect(result).toBeTruthy();
            expect(GenreModel.findByIdAndRemove).toHaveBeenCalledWith(testId);
        });

        it('should throw a "Could not find genre" error when getting a non-existent genre', async () => {
            (GenreModel.findById as jest.Mock).mockResolvedValue(null);

            await expect(deleteGenre('12345')).rejects.toThrow('Could not find genre.');
        });
    });
});
