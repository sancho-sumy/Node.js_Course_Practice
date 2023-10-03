import express from 'express';

import { getMoviesHandler } from '../controllers/movies.controllers.js';

const router = express.Router();

/**
 * @openapi
 * /movies:
 *  get:
 *     tags:
 *     - Movies
 *     summary: Get all movies
 *     responses:
 *       200:
 *         description: All movies from DB.
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Movie'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 */
router.get('/', getMoviesHandler);

export default router;
