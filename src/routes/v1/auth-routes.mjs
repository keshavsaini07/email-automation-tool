import passport from "passport";
import { Router } from "express";
import { AuthController, MailController } from "../../controllers/index.mjs";
import "../../utils/strategy/google-strategy.mjs";
import authMiddleware from "../../middlewares/auth-middleware.mjs";

const router = Router();

router.get("/google", passport.authenticate('google'));
router.get(
  "/google/redirect",
  passport.authenticate('google'),
  AuthController.auth
);

router.get("/status", authMiddleware.checkIsAuth, AuthController.checkStatus);

router.get("/mails", authMiddleware.checkIsAuth, MailController.fetchEmails);

export default router;
