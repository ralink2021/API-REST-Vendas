import { Router } from 'express';
/** Arquivo de Rotas do Express */
import produtoRouter from '@modules/produtos/routes/ProdutosRoutes';
import usuarioRouter from '@modules/usuarios/routes/UsuarioRoutes';

const router = Router();

router.use('/produtos', produtoRouter);
router.use('/usuarios', usuarioRouter);

export default router;
