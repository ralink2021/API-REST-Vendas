import { EntityRepository, Repository } from 'typeorm';
import Usuario from '../model/Usuario';

/** Classe Repositorio de USUARIOS */
@EntityRepository(Usuario)
class UsuarioRepository extends Repository<Usuario> {
  /** Metodo de Busca pelo Nome do Usuario */
  public async findByName(name: string): Promise<Usuario | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });
    return user;
  }
  /** Metodo de Busca pelo ID do Usuario */
  public async findById(id: string): Promise<Usuario | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });
    return user;
  }
  /** Metodo de Busca pelo Email do Usuario */
  public async findByEmail(email: string): Promise<Usuario | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

export default UsuarioRepository;
