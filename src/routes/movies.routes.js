import express from 'express';

import { getMoviesHandler } from '../controllers/movies.controllers.js';

const router = express.Router();

/**
 * @openapi
 * /health-check:
 *  get:
 *     tags:
 *     - Health-check
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 *         content:
 *           application/json:
 *             example:
 *               "message": "App is up and running"
 *               "result": "OK"
 */
router.get('/', getMoviesHandler);

export default router;