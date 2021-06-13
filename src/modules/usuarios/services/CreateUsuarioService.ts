import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/model/Usuario';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';

/** Interface com os atributos que sera passado na requisição */
interface IRequest {
  nome: string;
  email: string;
  password: string;
}

class CreateUsuarioService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute({ nome, email, password }: IRequest): Promise<Usuario> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);
    const emailExists = await usuarioRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Endereço de Email ja Existente!');
    }

    /** Realiza a Criptografia da Senha */
    const hashPassword = await hash(password, 8)

    const usuario = usuarioRepository.create({
      nome,
      email,
      password: hashPassword,
    });
    await usuarioRepository.save(usuario);
    return usuario;
  }
}

export default CreateUsuarioService;
