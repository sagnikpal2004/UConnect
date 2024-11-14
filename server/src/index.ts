import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.sendStatus(200);
});

import authRouter from "./routes/auth";
import classCommunityRouter from "./routes/classCommunity";
import userRouter from "./routes/user";

app.use("/auth", authRouter);
app.use("/classCommunity", classCommunityRouter);
app.use("/user", userRouter);

app.listen(3000);

