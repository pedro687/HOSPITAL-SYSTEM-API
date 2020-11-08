import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const port = process.env.port || 3333;

app.use(express.json());

app.use(routes);

app.use(cors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.log(err);

  return res.status(500).json(
    {
      error: '500',
      message: 'internal server error',
    },
  );

});

app.listen(port, () => {
  console.log(` Server Running at ${port}`);
});
