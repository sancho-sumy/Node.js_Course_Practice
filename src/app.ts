import config from 'config';
import express, { Application, NextFunction, Request, Response } from 'express';

import { CustomError } from './interfaces';
import { genresRoutes, healthRoutes, moviesRoutes } from './routes';
import { connect, logger, swaggerDocs } from './utils';

const port = config.get<number>('server.port');

const app: Application = express();

app.use(express.json());

app.use('/movies', moviesRoutes);
app.use('/genres', genresRoutes);
app.use('/health-check', healthRoutes);

swaggerDocs(app, port);

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const status = error.statusCode ?? 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(port, async () => {
    logger.info(`App listening on http://localhost:${port}`);

    await connect();
});
