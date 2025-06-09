import express from "express";
import passport from "passport";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  authController.handleGoogleCallback
);

router.get("/api/logout", authController.logoutUser);

router.get("/api/current_user", authController.getCurrentUser);

export default router;
