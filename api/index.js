import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"



dotenv.config()
const app = express()

const connect = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw error;
    }  
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!")
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!")
})

app.get("/", (req, res) => {
    res.send("first request")
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
    console.log("error")
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(8000, () => {
    connect()
    console.log("listening to 8000")
})