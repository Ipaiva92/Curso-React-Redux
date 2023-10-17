import express from "express";
import {
  managerRouter,
  permissionRouter,
  userRouter,
  memberRouter,
  taskRouter,
} from "./routes";

const app = express();
app.use(express.json());
app.use(managerRouter);
app.use(userRouter);
app.use(permissionRouter);
app.use(taskRouter);
app.use(memberRouter);
const port = 3333;

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
