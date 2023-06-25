import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { PrismaService } from 'src/config/prisma.service';
import { DadosBasicosModule } from './dados-basicos/dados-basicos.module';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, PrismaService],
  imports: [DadosBasicosModule],
})
export class ClienteModule {}
