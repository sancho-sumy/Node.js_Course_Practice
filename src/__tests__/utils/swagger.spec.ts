import { Application } from 'express';
import logger from '../../utils/logger.util';
import swaggerDocs from '../../utils/swagger.util';

jest.mock('swagger-jsdoc', () => jest.fn());
jest.mock('swagger-ui-express', () => ({
    serve: jest.fn(),
    setup: jest.fn(),
}));
jest.mock('../../utils/logger.util');

const createMockApp = () => {
    const app: Partial<Application> = {
        use: jest.fn(),
        get: jest.fn(),
    };
    return app as Application;
};

describe('Swagger Docs', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('configures swagger docs and sets up the API routes', () => {
        const mockApp = createMockApp();
        const port = 3000;

        swaggerDocs(mockApp, port);

        const [route] = (mockApp.get as jest.Mock).mock.calls[0];
        expect(route).toBe('/api-docs.json');
        expect(logger.info).toHaveBeenCalledWith(`Docs available at http://localhost:${port}/api-docs`);
    });
});
