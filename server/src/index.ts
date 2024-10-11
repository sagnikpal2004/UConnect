import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

app.get("/", (_, res) => {
    res.sendStatus(200);
});

app.listen(3000);

