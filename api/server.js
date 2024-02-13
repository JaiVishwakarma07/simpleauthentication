import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoute from './routes/auth.js'
import iamgeRoute from './routes/image.js'


const app = express()
dotenv.config()
mongoose.set('strictQuery', true)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected")
    } catch (err) {
        console.log(err);
    }
}

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())


//routes
app.use("/api/auth", authRoute)
app.use("/api/images", imageRoute)



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";

    return res.status(errorStatus).send(errorMessage)
})

app.listen(8800, () => {
    connect();
    console.log("api working")
})