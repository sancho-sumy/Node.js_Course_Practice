import express, { Router } from 'express';

import { getMoviesHandler, getMovieHandler } from '../controllers/movies.controllers';

const router: Router = express.Router();

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

/**
 * @openapi
 * /movies/{movieId}:
 *  get:
 *     tags:
 *     - Movies
 *     summary: Get specific movie by id
 *     parameters:
 *      - in: path
 *        name: movieId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the book
 *     responses:
 *       200:
 *         description: Specific movie from DB by id.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Movie'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 *       404:
 *        $ref: '#/components/responses/404'
 */

router.get('/:movieId', getMovieHandler);

export default router;
