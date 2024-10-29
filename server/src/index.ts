import express from "express";

const app = express();
app.get("/", (_, res) => {
    res.sendStatus(200);
});

import authRouter from "./routes/auth";
import classCommunityRouter from "./routes/classCommunity";

app.use("/auth", authRouter);
app.use("/classCommunity", classCommunityRouter);

app.listen(3000);

