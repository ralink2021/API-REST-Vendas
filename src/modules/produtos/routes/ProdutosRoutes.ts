import { Router } from 'express';
import ProdutosController from '../controllers/ProdutosController';
import { celebrate, Joi, Segments } from 'celebrate';
const produtoRouter = Router();
const produtosController = new ProdutosController();

produtoRouter.get('/', produtosController.index);

/** Rota GET com Validação de Dados nos PARAMETROS da Requisição */
produtoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosController.show,
);

/** ROTA POST com Validação de Dados no BODY da Requisição */
produtoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  produtosController.create,
);

/** ROTA PUT com Validação de Dados no BODY da Requisição */
produtoRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosController.update,
);

/** Rota DELETE com Validação de Dados nos PARAMETROS da Requisição */
produtoRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosController.delete,
);

export default produtoRouter;
