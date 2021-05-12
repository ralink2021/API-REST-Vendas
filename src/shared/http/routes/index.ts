/** Arquivo de Rotas do Express */
import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
  return response.json({ message: 'Ola Rafa' });

});

export default router;
