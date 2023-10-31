import express, {Express, Request, Response} from 'express';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
// const port = process.env.PORT;
const port = 3001;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});


app.use(cors({
    origin: 'YOUR_FRONTEND_ORIGIN',
    credentials: true
}));

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});