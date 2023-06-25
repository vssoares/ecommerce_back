import { Module } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';
import { EcommerceController } from './ecommerce.controller';
import { AuthModule } from './auth/auth.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { ProdutoModule } from './produto/produto.module';
import { PrismaService } from 'src/config/prisma.service';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [AuthModule, CarrinhoModule, ProdutoModule, ClienteModule],
  controllers: [EcommerceController],
  providers: [EcommerceService, PrismaService],
})
export class EcommerceModule {}
