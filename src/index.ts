import express from "express";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use("/api", router);

const serverStart = async () => {
  try {
    app.listen(3000, () =>  console.log("....server...is up", 3000));
  } catch (error) {
    throw error;
  }
};

serverStart();
