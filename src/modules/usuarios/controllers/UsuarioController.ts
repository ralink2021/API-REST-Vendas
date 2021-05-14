import { Request, Response } from 'express';
import CreateUsuarioService from '../services/CreateUsuarioService';
import ListUsuarioService from '../services/ListUsuarioService';
export default class UsuarioController {
  /** Metodo de Listagem que sera Passado no Arquivo de Rotas Usuario */
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsuario = new ListUsuarioService();
    const usuarios = await listUsuario.execute();
    return response.json(usuarios);
  }

  /** Metodo de Cadastro que sera Passado no Arquivo de Rotas Usuario */
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, email, password } = request.body;
    const createUsuario = new CreateUsuarioService();
    const usuarios = await createUsuario.execute({ nome, email, password });
    return response.json(usuarios);
  }
}
