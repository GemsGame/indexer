import express from "express";
import router from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
const port = 3000;

const serverStart = async () => {
  try {
    app.listen(port, () =>  console.log("....server...is up", port));
  } catch (error) {
    throw error;
  }
};

serverStart();
