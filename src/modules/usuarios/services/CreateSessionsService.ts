import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/model/Usuario';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';

/** Interface com os atributos que sera passado na requisição */
interface IRequest {
  email: string;
  password: string;
}


class CreateSessionsService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute({ email, password }: IRequest): Promise<Usuario> {
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
    return usuario;
  }
}

export default CreateSessionsService;
