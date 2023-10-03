import express from 'express';

import logger from './utils/logger.utils.js';
import healthRoutes from './routes/health.routes.js'

const port = 3000;

const app = express();

app.listen(port, () => {
  logger.info(`App listening on http://localhost:${port}`);

  app.use('/health-check', healthRoutes);

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

});
