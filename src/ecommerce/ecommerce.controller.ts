import { Controller } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';

@Controller('ecommerce')
export class EcommerceController {
  constructor(private ecommerceService: EcommerceService) {}
}
