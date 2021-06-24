import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import {isAfter, addHours} from 'date-fns';
import { hash } from 'bcryptjs';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';
import UsuarioTokenRepository from '../typeorm/repositories/UsuarioTokenRepository';

/** Interface com os atributos que sera passado na requisição */
interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute({ token, password }: IRequest): Promise<void> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);
    const usuarioTokenRepository = getCustomRepository(UsuarioTokenRepository);

    /** Verifica se o Token do Usuario Existe. */
    const userToken = await usuarioTokenRepository.findByToken(token);
    if(!userToken){
      throw new AppError('Token do Usuario não Existente!');
    }

    /** Verifica se o Usuario existe na Base de Dados! */
    const user = await usuarioRepository.findById(userToken.user_id);
    if(!user){
      throw new AppError('Usuario não Existe.')
    }

    /** Verifica a Validade do Token */
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token Expirado!');
    }

    /** Alterar a Senha do Usuario apos as Validações */
    user.password = await hash(password, 8);
  }
}

export default ResetPasswordService;
