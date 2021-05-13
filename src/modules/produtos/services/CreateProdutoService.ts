import AppError from '@shared/errors/AppError';
import { ProdutosRepository } from './../typeorm/repositories/ProdutosRepository';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/model/Produto';

/** Interface com os atributos que sera passado na requisição */
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProdutoService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute({ name, price, quantity }: IRequest): Promise<Produto> {
    const produtoRepository = getCustomRepository(ProdutosRepository);

    /** Verifica se ja existe um produto cadastrado com o mesmo nome na Base de Dados */
    const produtoExist = await produtoRepository.findByName(name);
    if (produtoExist) {
      throw new AppError('Ja existe um Produto Cadastrado com esse nome!');
    }
    /** Prepara o Objeto Produto para Salvar */
    const produto = produtoRepository.create({
      name,
      price,
      quantity,
    });

    /** Executa a Função de Salvar os Dados no Banco de Dados */
    await produtoRepository.save(produto);
    return produto;
  }
}

export default CreateProdutoService;
