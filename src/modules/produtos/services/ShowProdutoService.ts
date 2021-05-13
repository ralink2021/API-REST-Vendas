import AppError from '@shared/errors/AppError';
import { ProdutosRepository } from './../typeorm/repositories/ProdutosRepository';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entidades/Produto';

interface IRequest {
  id: string;
}

class ShowProdutoService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute({ id }: IRequest): Promise<Produto> {
    const produtoRepository = getCustomRepository(ProdutosRepository);

    /** Realiza a busca de apenas um Produto pelo ID na Base de Dados */
    const produtos = await produtoRepository.findOne(id);
    if (!produtos) {
      throw new AppError('Produto não Encontrado');
    }
    return produtos;
  }
}

export default ShowProdutoService;
