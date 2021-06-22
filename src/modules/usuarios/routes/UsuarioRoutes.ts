import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsuarioController from '../controllers/UsuarioController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();
const usuarioAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usuarioRouter.get('/', isAuthenticated, usuarioController.index);

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

usuarioRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usuarioAvatarController.update,
);
export default usuarioRouter;
