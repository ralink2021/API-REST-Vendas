import { Request, Response } from 'express';
import CreateProdutoService from '../services/CreateProdutoService';
import DeleteProdutoService from '../services/DeleteProdutoService';
import ListProdutoService from '../services/ListProdutoService';
import ShowProdutoService from '../services/ShowProdutoService';
import UpdateProdutoService from '../services/UpdateProdutoService';

export default class ProdutosController {
  /**Metodo de Listar todos os Produtos da Controller */
  public async index(request: Request, response: Response): Promise<Response> {
    const listProdutos = new ListProdutoService();
    const produtos = await listProdutos.execute();
    return response.json(produtos);
  }
  /**Metodo de Listar apenas um Produto da Controller */
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduto = new ShowProdutoService();
    const produto = await showProduto.execute({ id });
    return response.json(produto);
  }
  /**Metodo de Salvar um Produto da Controller */
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduto = new CreateProdutoService();
    const produto = await createProduto.execute({ name, price, quantity });
    return response.json(produto);
  }
  /**Metodo de Alterar um Produto da Controller */
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduto = new UpdateProdutoService();
    const produto = await updateProduto.execute({
      id,
      name,
      price,
      quantity,
    });
    return response.json(produto);
  }
  /**Metodo de Deletar um Produto da Controller */
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduto = new DeleteProdutoService();
    await deleteProduto.execute({ id });
    return response.json([]);
  }
}
