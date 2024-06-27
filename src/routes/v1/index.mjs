import express from 'express'
import {InfoController} from '../../controllers/index.mjs'

const router = express.Router();

import userRoutes from "./user-routes.mjs"
import authRoutes from "./auth-routes.mjs"

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

// /api/v1/info - GET
router.get("/info", InfoController.info);

export default router;
