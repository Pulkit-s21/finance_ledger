import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import recordRoutes from "./routes/record.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import budgetRoutes from "./routes/budget.routes.js"
import { authMiddleware } from "./middleware/auth.middleware.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", authRoutes)
app.use("/record", authMiddleware, recordRoutes)
app.use("/chat", authMiddleware, chatRoutes)
app.use("/budget", authMiddleware, budgetRoutes)

export default app
