import Router from "express"
import {
  getBudgetStatusController,
  setBudgetController,
} from "../controller/budget.controller"

const router = Router()

router.post("/set", setBudgetController)
router.get("/status", getBudgetStatusController)

export default router
