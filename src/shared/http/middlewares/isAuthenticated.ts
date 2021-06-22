import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';

/** Interface para pegar as informações do Payload do Usuario */
interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

/** Middware de Autentificação para Proteção de Rotas */
export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError('JWT Token Faltando!')
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, auth.jwt.secret);
    /** Nessa linha e pegado o atributo sub que referencia o ID do Usuario Autentificado na Sessão */
    const {sub} = decodeToken as ITokenPayload;

    request.user = {
      id: sub
    }
    return next();

  } catch {
    throw new AppError('JWT Token Invalido');
  }
};
