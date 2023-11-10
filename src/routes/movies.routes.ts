import express, { Router } from 'express';

import {
    createMovieHandler,
    deleteMovieHandler,
    findMoviesByGenreHandler,
    getMovieHandler,
    getMoviesHandler,
    updateMovieHandler,
} from '../controllers';
import { movieIdValidator, movieValidator } from '../validators';

export const router: Router = express.Router();

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
 *        description: ID of the movie
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
router.get('/:movieId', movieIdValidator, getMovieHandler);

/**
 * @openapi
 * /movies/genre/{genreName}:
 *  get:
 *     tags:
 *     - Movies
 *     summary: Get all movies movies by genre
 *     parameters:
 *      - in: path
 *        name: genreName
 *        schema:
 *          type: string
 *        required: true
 *        description: Genre of the movie
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
 *       404:
 *        $ref: '#/components/responses/404'
 */
router.get('/genre/:genreName', findMoviesByGenreHandler);

/**
 * @openapi
 * /movies/add:
 *  post:
 *     tags:
 *     - Movies
 *     summary: Add a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: New movie created.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CreateMovieResponse'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 *       404:
 *        $ref: '#/components/responses/404'
 */
router.post('/add', movieValidator, createMovieHandler);

/**
 * @openapi
 * /movies/edit/{movieId}:
 *  put:
 *     tags:
 *     - Movies
 *     summary: Edit movie
 *     parameters:
 *      - in: path
 *        name: movieId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The movie was updated.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CreateMovieResponse'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 *       404:
 *        $ref: '#/components/responses/404'
 */
router.put('/edit/:movieId', movieIdValidator, movieValidator, updateMovieHandler);

/**
 * @openapi
 * /movies/{movieId}:
 *  delete:
 *     tags:
 *     - Movies
 *     summary: Delete specific movie by id
 *     parameters:
 *      - in: path
 *        name: movieId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the movie
 *     responses:
 *       200:
 *         description: Movie deleted.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/DeleteMovieResponse'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 *       404:
 *        $ref: '#/components/responses/404'
 */
router.delete('/:movieId', movieIdValidator, deleteMovieHandler);
