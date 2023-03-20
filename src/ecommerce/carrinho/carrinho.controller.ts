import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) { }

  @Get('carrinho')
  async getCarrinho(@Body() body?: any) {
    const carrinho = await this.carrinhoService.getCarrinho(body?.carrinho_id)
    return 1
  }

  @Post('carrinho/produto')
  async addProdutoCarrinho(@Body() body: any) {
    const carrinho = await this.carrinhoService.addProdutoCarrinho(body)
    return carrinho
  }

}
