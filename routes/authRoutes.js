import express from "express";
import { signup, login ,adminLogin} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/admin-login", adminLogin); 
router.post("/login", login);

export default router;