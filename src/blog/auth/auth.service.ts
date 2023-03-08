import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/create-auth.dto';
import { UserLogin } from './dto/user-login.dto';
import { PrismaService } from 'src/prisma.service';
import { BadRequestError, NotFoundError, UnauthorizedError } from 'src/shared/helpers/api-erros';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {

  constructor(private db: PrismaService) {}


  // criar usuario
  async create(createUser: CreateUser) {
    const { name, email, password } = createUser
    
    const userExists = await this.db.user.findUnique({
      where: { email: email }
    });
    if (userExists) throw new BadRequestError('Usuário já existe')

    const hashPassword = await bcrypt.hash(password, 10)
    const user = this.db.user.create({
      data: {
        name,
        email,
        password: hashPassword
      },
    })

    if (!user) throw new BadRequestError('Erro ao cadastrar usuário')

    return user
  }

  // login usuario
  async login(login: UserLogin){
    const { email, password  } = login
    
    const userGet = await this.db.user.findUnique({
      where: { email }
    });
    if (!userGet) throw new NotFoundError("Email não encontrado!")

    const verifyPass = await bcrypt.compare(password, userGet.password)
    if (!verifyPass) throw new UnauthorizedError('Senha inválida!')

    const { password: _, ...user }: any = userGet
    const token = jwt.sign({ user }, 'u721sxt7bchr5upabq00', {
      expiresIn: '8h',
    })
    return { user, token };
  }
}
