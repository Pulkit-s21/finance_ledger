import Router from "express"
import { askQuestionController } from "../controller/chat.controller"

const router = Router()

router.post("/ask", askQuestionController)

export default router
