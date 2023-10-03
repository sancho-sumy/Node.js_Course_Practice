import express from 'express';

import { getStatusHandler } from '../controllers/health.controllers.js';

const router = express.Router();

router.get('/', getStatusHandler);

export default router;
