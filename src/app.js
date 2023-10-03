import express from 'express';

import logger from './utils/logger.utils.js';
import healthRoutes from './routes/health.routes.js'
import swaggerDocs from "./utils/swagger.js";

const port = 3000;

const app = express();

app.use(express.json());

app.listen(port, () => {
  logger.info(`App listening on http://localhost:${port}`);

  app.use('/health-check', healthRoutes);

  swaggerDocs(app, port);

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

});
