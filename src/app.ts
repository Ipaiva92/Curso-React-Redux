import express from "express";
import {postRouter, userRouter} from "./routes";

const app = express();
app.use(express.json());
app.use(postRouter);
app.use(userRouter);
const port = 3000;

const start = (): void => {
  try {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();