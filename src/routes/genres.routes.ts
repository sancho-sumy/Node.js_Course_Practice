import express, { Router } from 'express';

import {
    createGenreHandler,
    deleteGenreHandler,
    getGenreHandler,
    getGenresHandler,
    updateGenreHandler,
} from '../controllers';
import { genreIdValidator, genreValidator } from '../validators';

export const router: Router = express.Router();

/**
 * @openapi
 * /genres:
 *  get:
 *     tags:
 *     - Genres
 *     summary: Get all genres
 *     responses:
 *       200:
 *         description: All genres from DB.
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Genre'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 */
router.get('/', getGenresHandler);

/**
 * @openapi
 * /genres/{genreId}:
 *  get:
 *     tags:
 *     - Genres
 *     summary: Get specific genre by id
 *     parameters:
 *      - in: path
 *        name: genreId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the genre
 *     responses:
 *       200:
 *         description: Specific genre from DB by id.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Genre'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 *       404:
 *        $ref: '#/components/responses/404'
 */

router.get('/:genreId', genreIdValidator, getGenreHandler);

/**
 * @openapi
 * /genres/add:
 *  post:
 *     tags:
 *     - Genres
 *     summary: Add a new genre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       201:
 *         description: New genre created.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CreateGenreResponse'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 *       404:
 *        $ref: '#/components/responses/404'
 */

router.post('/add', genreValidator, createGenreHandler);

/**
 * @openapi
 * /genres/edit/{genreId}:
 *  put:
 *     tags:
 *     - Genres
 *     summary: Edit genre
 *     parameters:
 *      - in: path
 *        name: genreId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the genre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: The genre was updated.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CreateGenreResponse'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 *       404:
 *        $ref: '#/components/responses/404'
 */

router.put('/edit/:genreId', genreIdValidator, genreValidator, updateGenreHandler);

/**
 * @openapi
 * /genres/{genreId}:
 *  delete:
 *     tags:
 *     - Genres
 *     summary: Delete specific genre by id
 *     parameters:
 *      - in: path
 *        name: genreId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the genre
 *     responses:
 *       200:
 *         description: Genre deleted.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/DeleteGenreResponse'
 *       400:
 *        $ref: '#/components/responses/400'
 *       401:
 *        $ref: '#/components/responses/401'
 *       404:
 *        $ref: '#/components/responses/404'
 */
router.delete('/:genreId', genreIdValidator, deleteGenreHandler);
