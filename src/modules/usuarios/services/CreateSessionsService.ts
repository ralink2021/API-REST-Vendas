import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/model/Usuario';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';

/** Interface com os atributos que sera passado na requisição */
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  usuario: Usuario;
  token: string;
}


class CreateSessionsService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);
    const usuario = await usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError('Email ou Senha Incorreto!', 401);
    }

    /** Realiza a Verificação da Senha Pura com a Senha Criptografada */
    const passwordConfirmed = await compare(password, usuario.password)

    if (!passwordConfirmed) {
      throw new AppError('Email ou Senha Incorreto!', 401);
    }

    /** Configuração do Token JWS */
    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return {
      usuario,
      token,
    };
  }
}

export default CreateSessionsService;
