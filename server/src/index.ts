import express from "express";

import authRouter from "./routes/auth";

const app = express();

app.get("/", (_, res) => {
    res.sendStatus(200);
});

app.use("/auth", authRouter);

app.listen(3000);

