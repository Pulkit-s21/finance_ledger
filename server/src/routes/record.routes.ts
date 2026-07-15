import Router from "express"
import {
  createRecordController,
  getAllRecordsController,
} from "../controller/record.controller"

const router = Router()

router.post("/create", createRecordController)
router.get("/all", getAllRecordsController)

export default router
