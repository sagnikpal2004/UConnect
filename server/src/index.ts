import express from 'express';
import authRouter from './routes/auth';
import userRouter from './routes/user'; 

const app = express();
app.use(express.json()); 

app.get('/', (_, res) => {
    res.sendStatus(200);
});

app.use('/auth', authRouter);
app.use('/user', userRouter); 

app.listen(3000);