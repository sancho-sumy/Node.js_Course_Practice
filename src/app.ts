import express, { Request, Response, NextFunction, Application } from 'express';

import logger from './utils/logger.utils';
import healthRoutes from './routes/health.routes';
import moviesRoutes from './routes/movies.routes';
import swaggerDocs from './utils/swagger';

export interface Error {
    statusCode?: number;
    message: string;
    data?: any;
}

const port: number = 3000;

const app: Application = express();

app.use(express.json());

app.use('/movies', moviesRoutes);
app.use('/health-check', healthRoutes);

swaggerDocs(app, port);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    const status = error.statusCode ?? 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
    logger.info(`App listening on http://localhost:${port}`);
});
