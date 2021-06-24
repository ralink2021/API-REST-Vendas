import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';
import UsuarioTokenRepository from '../typeorm/repositories/UsuarioTokenRepository';
import EtherealMail from '@config/mail/EtherealMail'

/** Interface com os atributos que sera passado na requisição */
interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  /**Metodo Execute que sera chamado na Controller */
  public async execute({ email }: IRequest): Promise<void> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);
    const usuarioTokenRepository = getCustomRepository(UsuarioTokenRepository);

    const user = await usuarioRepository.findByEmail(email);
    if(!user){
      throw new AppError('Usuario não Existente!');
    }

    const token = await usuarioTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..','views', 'forgot_password.hbs')

    await EtherealMail.sendMail({
      to: {
        name: user.nome,
        email: user.email,

      },
      subject: '[API VENDAS - RECUPERAÇÃO DE SENHA]',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.nome,
          link: `http://localhost:3000/reset_password?token=${token?.token}`,
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService;
