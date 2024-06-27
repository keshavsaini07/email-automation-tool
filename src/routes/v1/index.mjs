import express from 'express'
import {InfoController} from '../../controllers/index.mjs'

const router = express.Router();

import userRoutes from "./user-routes.mjs"
import authRoutes from "./auth-routes.mjs"
import responseController from '../../controllers/response-controller.js';

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

// /api/v1/info - GET
router.get("/info", InfoController.info);
router.get("/response", responseController.generateResponse)

export default router;
