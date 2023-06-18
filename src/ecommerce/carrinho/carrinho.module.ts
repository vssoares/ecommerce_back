import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { PrismaService } from 'src/prisma.service';
import { ProdutoService } from '../produto/produto.service';

@Module({
  controllers: [CarrinhoController],
  providers: [CarrinhoService, ProdutoService, PrismaService],
})
export class CarrinhoModule {}
