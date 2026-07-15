import Router from "express"
import { createRecordController } from "../controller/record.controller"

const router = Router()

router.post("/create", createRecordController)

export default router
