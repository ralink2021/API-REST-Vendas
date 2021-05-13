import { EntityRepository, Repository } from 'typeorm';
import Produto from '../entidades/Produto';

@EntityRepository(Produto)
export class ProdutosRepository extends Repository<Produto> {
  /** Metodo de Busca pelo Nome do Produto */
  public async findByName(name: string): Promise<Produto | undefined> {
    const produto = this.findOne({
      where: { name },
    });
    return produto;
  }
}
