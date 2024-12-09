import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.sendStatus(200);
});

import authRouter from "./routes/auth";
import coursesRouter from "./routes/courses";
import postsRouter from "./routes/posts";

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/posts", postsRouter);

app.listen(3000);

