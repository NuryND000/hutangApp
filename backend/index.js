import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";


dotenv.config();
const app = express();
mongoose.connect(
  "mongodb://127.0.0.1:27017/hutangApp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("database terkoneksi weeeekkk.."));

app.use(cookieParser());
app.use(cors({ credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(UserRoute);

app.listen(5001, () => console.log("server berjalann jiaaa"));
