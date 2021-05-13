import AppError from '@shared/errors/AppError';
import { ProdutosRepository } from './../typeorm/repositories/ProdutosRepository';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/model/Produto';

class ListProdutoService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute(): Promise<Produto[]> {
    const produtoRepository = getCustomRepository(ProdutosRepository);

    /** Realiza a busca de todos os Produtos Existentes na Base de Dados */
    const produtos = produtoRepository.find();
    return produtos;
  }
}

export default ListProdutoService;
