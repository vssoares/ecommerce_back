import { Injectable } from '@nestjs/common';
import { Carrinho } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { NotFoundError } from 'src/shared/helpers/api-erros';
import {
  calcularValorTotalCarrinho,
  limparRelacao,
} from 'src/ecommerce/utils/utils';

@Injectable()
export class EcommerceService {
  constructor(private db: PrismaService) {}
}
