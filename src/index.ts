import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import helmet from 'helmet';
import { userRouter } from './routes/user';
import { profileActivityRouter } from './routes/profileactivity';

const port = Number(process.env.PORT) || 3000;
const app = express();

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

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`API started at http://localhost:${port}`);
});