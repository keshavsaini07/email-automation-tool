import express from 'express'
import {InfoController} from '../../controllers/index.js'

const router = express.Router();

// /api/v1/info - GET
router.get("/info", InfoController.info);

export default router;
