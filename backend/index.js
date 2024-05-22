import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoute.js";

const app = express();
mongoose.connect(
  "mongodb://Hutang666_memorysaw:6ca64476c1ffcbeb0beac1b1700c96539260fe9a@0-t.h.filess.io:27018/Hutang666_memorysaw",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("database terkoneksi weeeekkk.."));

app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(5001, () => console.log("server berjalann jiaaa"));
