import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { PrismaService } from 'src/config/prisma.service';
import { BadRequestError, NotFoundError } from 'src/shared/helpers/api-erros';

@Injectable()
export class DadosBasicosService {
  constructor(private db: PrismaService) {}

  async getDadosBasicos(id: number) {
    if (isNaN(id)) {
      throw new BadRequestError('Id não é um número!');
    }

    const usuario = await this.db.usuario
      .findUnique({ where: { id } })
      .catch(() => {
        throw new BadRequestError(
          'Ocorreu algum erro interno ao buscar usuário!',
        );
      });
    if (!usuario) throw new NotFoundError('Usuário Não encontrado!');

    delete usuario?.password;
    return usuario;
  }
}
