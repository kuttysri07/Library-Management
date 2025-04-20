import express from "express";
import {
  getloggedUSer,
  loginController,
  logoutController,
  signupContoller,
} from "../controller/authController.js";
import { protectRoute } from "../middlewares/protuctRoute.js";

const router = express.Router();

router.post("/signup", signupContoller);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/user" , protectRoute , getloggedUSer )

export default router;
