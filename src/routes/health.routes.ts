import express, { Router } from 'express';

import { getStatusHandler } from '../controllers/health.controllers';

const router: Router = express.Router();

/**
 * @openapi
 * /health-check:
 *  get:
 *     tags:
 *     - Health-check
 *     summary: Checking app availability
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
router.get('/', getStatusHandler);

export default router;
