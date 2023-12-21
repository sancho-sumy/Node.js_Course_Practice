import config from 'config';
import mongoose from 'mongoose';
import connect from '../../utils/connect.util';
import logger from '../../utils/logger.util';

jest.mock('config');
jest.mock('mongoose');
jest.mock('../../utils/logger.util');

describe('Connect function', () => {
    afterEach(done => {
        jest.clearAllMocks();
        done();
    });

    it('should successfully connect to the database', async () => {
        (config.get as jest.Mock).mockReturnValue('mongodb://fake-test-uri');
        (mongoose.connect as jest.Mock).mockResolvedValue({});
        await connect();

        expect(mongoose.connect).toHaveBeenCalled();
        expect(logger.info).toHaveBeenCalledWith('Connected to DB');
    });

    it('should log an error and exit when the connection fails', async () => {
        (config.get as jest.Mock).mockReturnValue('mongodb://fake-test-uri');
        (mongoose.connect as jest.Mock).mockRejectedValue(new Error('Connection error'));
        const mockExit = jest.spyOn(process, 'exit').mockImplementation();

        await connect();

        expect(mongoose.connect).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith('Could not connect to DB');
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
    });
});
