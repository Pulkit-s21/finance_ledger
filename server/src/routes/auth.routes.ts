import Router from "express"
import {
  getCurrentUserController,
  loginUserController,
  registerUserController,
} from "../controller/auth.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.get("/me", authMiddleware, getCurrentUserController)

export default router
