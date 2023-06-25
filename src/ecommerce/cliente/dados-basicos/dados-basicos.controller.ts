import { Controller, Get, Query } from '@nestjs/common';
import { DadosBasicosService } from './dados-basicos.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Cliente')
@Controller('ecommerce/cliente/dados-basicos')
export class DadosBasicosController {
  constructor(private readonly dadosBasicosService: DadosBasicosService) {}

  @Get('')
  @ApiProperty({ name: 'usuario_id', required: true })
  async getDadosBasicos(@Query('usuario_id') usuario_id: number) {
    return await this.dadosBasicosService.getDadosBasicos(+usuario_id);
  }
}
