import { EntityRepository, Repository } from 'typeorm';
import UsuarioToken from '../model/UsuarioToken';

/** Classe Repositorio de Tokens de Usuarios */
@EntityRepository(UsuarioToken)
class UsuarioTokenRepository extends Repository<UsuarioToken> {
  /** Metodo de Busca pelo Token do Usuario */
  public async findByToken(token: string): Promise<UsuarioToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }
  /** Metodo de Criação do Token do Usuario */
  public async generate(user_id: string): Promise<UsuarioToken | undefined> {
    const userToken = await this.create({
        user_id,
    });
    await this.save(userToken);
    return userToken;
  }
}

export default UsuarioTokenRepository;
