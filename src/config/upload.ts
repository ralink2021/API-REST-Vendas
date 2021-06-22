import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

/** Arquivo de Configuração do Multer para a Realização de Uploads de Avatares */
const uploadFolder = path.resolve(__dirname, '..','..','uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {

      /** Nessa linha e criado um Hash para a imagem para evitar duplicidade! */
      const fileHash = crypto.randomBytes(10).toString('hex');

      /** Nessa linha e e realizado a junção do Hash com o nome Original do Arquivo. */
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    }
  })
}
