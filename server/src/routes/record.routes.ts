import Router from "express"
import {
  createRecordController,
  eraseRecordController,
  getAllRecordsController,
  updateRecordController,
} from "../controller/record.controller"

const router = Router()

router.post("/create", createRecordController)
router.post("/delete", eraseRecordController)
router.post("/update", updateRecordController)
router.get("/all", getAllRecordsController)

export default router
