import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/model/Usuario';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';

class ListUsuarioService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute(): Promise<Usuario[]> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);

    /** Realiza a busca de todos os Usuarios Existentes na Base de Dados */
    const usuarios = usuarioRepository.find();
    return usuarios;
  }
}

export default ListUsuarioService;
