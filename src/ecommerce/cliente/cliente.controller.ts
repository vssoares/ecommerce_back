import { Controller } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cliente')
@Controller('ecommerce')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
}
