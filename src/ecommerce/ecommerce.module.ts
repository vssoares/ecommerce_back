import { Module } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';
import { EcommerceController } from './ecommerce.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [EcommerceController],
  providers: [EcommerceService, PrismaService]
})
export class EcommerceModule {}
