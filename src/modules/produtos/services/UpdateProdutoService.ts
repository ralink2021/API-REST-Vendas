import AppError from '@shared/errors/AppError';
import { ProdutosRepository } from './../typeorm/repositories/ProdutosRepository';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entidades/Produto';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProdutoService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Produto> {
    const produtoRepository = getCustomRepository(ProdutosRepository);

    const produtos = await produtoRepository.findOne(id);
    if (!produtos) {
      throw new AppError('Produto não Encontrado');
    }

    const produtoExist = await produtoRepository.findByName(name);
    if (produtoExist) {
      throw new AppError('Ja existe um Produto com esse nome!');
    }

    produtos.name = name;
    produtos.price = price;
    produtos.quantity = quantity;

    await produtoRepository.save(produtos);
    return produtos;
  }
}

export default UpdateProdutoService;
