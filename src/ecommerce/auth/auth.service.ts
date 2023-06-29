import { Injectable } from '@nestjs/common';
import { UserLogin } from './dto/user-login.dto';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from 'src/shared/helpers/api-erros';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/config/prisma.service';
import { JwtService } from '@nestjs/jwt';

const ACCESS_TOKEN_SECRET = 'u721sxt7bchr5upabq00';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwtService: JwtService) {}

  // criar usuario
  async create(createUser) {
    const { name, email, password, celular, cpf, sexo, data_nascimento } =
      createUser;
    const userSchema = { name, email, celular, cpf, sexo, data_nascimento };

    const { cep, rua, numero, complemento, bairro, cidade, uf } = createUser;
    const enderecoSchema = {
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
    };

    const userExists = await this.db.usuario.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });
    if (userExists) throw new BadRequestError('Usuário já existe');

    const hashPassword = await bcrypt.hash(password, 10);
    const usuario = this.db.usuario.create({
      data: {
        ...userSchema,
        password: hashPassword,
        enderecos: {
          create: enderecoSchema,
        },
        carrinho: {
          create: {},
        },
      },
      include: {
        enderecos: true,
        carrinho: true,
      },
    });

    if (!usuario) throw new BadRequestError('Erro ao cadastrar usuário');

    return usuario;
  }

  // login usuario
  async login(login: UserLogin) {
    const { email, password } = login;

    console.log(login);

    const userExists = await this.db.usuario.findUnique({
      where: { email },
    });
    if (!userExists) throw new NotFoundError('Email não encontrado!');

    const verifyPass = await bcrypt.compare(password, userExists.password);
    if (!verifyPass) throw new UnauthorizedError('Senha inválida!');

    const { password: _, ...user }: any = userExists;
    const payload = { ...user };
    const token = {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
    return { user, token };
  }

  async delete(id: number) {
    try {
      const usuarioDeletado = await this.db.usuario.delete({
        where: { id },
      });
      return usuarioDeletado;
    } catch (error) {
      throw new UnauthorizedError('Senha inválida!');
    }
  }
}
