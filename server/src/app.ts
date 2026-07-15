import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import recordRoutes from "./routes/record.routes.js"
import { authMiddleware } from "./middleware/auth.middleware.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", authRoutes)
app.use("/record", authMiddleware, recordRoutes)

export default app
