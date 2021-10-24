import express, { Request, Response, NextFunction, response } from "express";
// import "express-async-errors";

const cors = require("cors");

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server Error",
  });
});

const server = app.listen(3000, () => console.log("Server is running"));
