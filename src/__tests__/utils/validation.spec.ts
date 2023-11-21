import { Request } from 'express';
import { validationResult } from 'express-validator';
import { validationCheck } from '../../utils/validation.util';

jest.mock('express-validator');

const createMockRequest = () => {
    const req = { params: {} } as Request;
    return req;
};

describe('Validation Check', () => {
    afterEach(done => {
        jest.clearAllMocks();
        done();
    });

    it('returns true when there are no errors', () => {
        (validationResult as unknown as jest.Mock).mockReturnValue({ isEmpty: () => true });

        const req = createMockRequest();
        const result = validationCheck(req);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(result).toBeTruthy();
    });

    it('throws a CustomError with a 422 status code when there are validation errors', () => {
        const mockErrors = [{ msg: 'Error 1' }, { msg: 'Error 2' }];

        (validationResult as unknown as jest.Mock).mockReturnValue({ isEmpty: () => false, array: () => mockErrors });

        const req = createMockRequest();

        expect(() => validationCheck(req)).toThrow('Validation failed');
        expect(validationResult).toHaveBeenCalledWith(req);
    });
});
