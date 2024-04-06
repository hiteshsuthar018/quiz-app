import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import bodyParser from 'body-parser'
const app = express();
app.use(bodyParser.json());

//configuring the dotenv
dotenv.config({ path: "./.env" })

//configuring the cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  //limiting json response
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import quizRouter from "./routes/quiz.routes.js"
app.use("/api/v1/quiz", quizRouter);

app.on("error", (error) => {
    console.log("Error :", error)
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running at port : ${process.env.PORT}`)
})
