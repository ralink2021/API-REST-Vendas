import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

/** Middleware para Tratamento de Error */
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Error Interno do Servidor',
    });
  },
);

app.listen(3333, () => {
  console.log('Servidor Online!');
});
