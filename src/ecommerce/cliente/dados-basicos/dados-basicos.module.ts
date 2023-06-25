import { Module } from '@nestjs/common';
import { DadosBasicosService } from './dados-basicos.service';
import { DadosBasicosController } from './dados-basicos.controller';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [DadosBasicosController],
  providers: [DadosBasicosService, PrismaService],
})
export class DadosBasicosModule {}
