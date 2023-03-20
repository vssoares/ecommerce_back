import { Module } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';
import { EcommerceController } from './ecommerce.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { CarrinhoModule } from './carrinho/carrinho.module';

@Module({
  imports: [
    AuthModule, 
    CarrinhoModule
  ],
  controllers: [
    EcommerceController
  ],
  providers: [
    EcommerceService, 
    PrismaService
  ]
})
export class EcommerceModule {}
