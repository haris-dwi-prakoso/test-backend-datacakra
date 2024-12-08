import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import helmet from 'helmet';
import cors from "cors";
import { userRouter } from './routes/user';
import { profileActivityRouter } from './routes/profileactivity';

const port = Number(process.env.PORT) || 3000;
const app = express();

app.use(
    cors({
        origin: ["*"],
        credentials: true
    })
);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/activity', profileActivityRouter);
app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Hello World'
    });
});

app.listen(port, () => {
    console.log(`API started at http://localhost:${port}`);
});

export default app;