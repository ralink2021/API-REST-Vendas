import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
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
    //console.log(token);

    await EtherealMail.sendMail({
      to: {
        name: user.nome,
        email: user.email,

      },
      subject: '[API VENDAS - RECUPERAÇÃO DE SENHA]',
      templateData: {
        template: `Ola {{name}}: Solicitação de Redefinição de Senha Recebida {{token}}`,
        variables: {
          name: user.nome,
          token: token?.token,
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService;
