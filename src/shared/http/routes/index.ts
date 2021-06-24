import { Router } from 'express';
/** Arquivo de Rotas do Express */
import produtoRouter from '@modules/produtos/routes/ProdutosRoutes';
import usuarioRouter from '@modules/usuarios/routes/UsuarioRoutes';
import sessionsRouter from '@modules/usuarios/routes/SessionsRoutes';
import passwordRouter from '@modules/usuarios/routes/PasswordRoutes';

const router = Router();

router.use('/produtos', produtoRouter);
router.use('/usuarios', usuarioRouter);
router.use('/sessions', sessionsRouter)
router.use('/password', passwordRouter)

export default router;
