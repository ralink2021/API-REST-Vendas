/** Arquivo de Rotas do Express */
import produtoRouter from '@modules/produtos/routes/ProdutosRoutes';
import { Router } from 'express';

const router = Router();

router.use('/produtos', produtoRouter);

export default router;
