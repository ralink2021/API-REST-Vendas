import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsuarioController from '../controllers/UsuarioController';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/', usuarioController.index);

usuarioRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usuarioController.create,
);
export default usuarioRouter;
