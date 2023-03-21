import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';

@Controller('ecommerce')
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

  @Delete('carrinho/produto/remover')
  async removerProdutoCarrinho(@Body() body: any) {
    const carrinho = await this.carrinhoService.removerProdutoCarrinho(body)
    return carrinho
  }

  @Delete('carrinho/produto/remover/tudo')
  async removerProdutoCarrinhoTudo(@Body() body: any) {
    const carrinho = await this.carrinhoService.removerProdutoCarrinhoTudo(body)
    return carrinho
  }

}
