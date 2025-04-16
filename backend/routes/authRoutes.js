import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refreshToken", authController.refreshToken);
router.get("/verify", authController.verify);

export default router;
