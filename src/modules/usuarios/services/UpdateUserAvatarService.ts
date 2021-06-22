import path from 'path';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';
import uploadConfig from '@config/upload'
import fs from 'fs';
import Usuario from '../typeorm/model/Usuario';

/** Interface com os atributos que sera passado na requisição */
interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute({ user_id, avatarFilename }: IRequest): Promise<Usuario> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const user = await usuarioRepository.findById(user_id);

    if(!user){
      throw new AppError('Usuario não Encontrato!');
    }

    /** Verifica se ja não existe um Avatar definido caso exista sera deletado o atual
     * em seguida sera substituido pelo novo avatar!
     */
    if(user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    /** Parte final onde salva as alterações do novo Avatar. */
    user.avatar = avatarFilename;
    await usuarioRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
