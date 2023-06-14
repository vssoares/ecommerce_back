import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';

@Controller('ecommerce')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) { }

  @Get('carrinho')
  async getCarrinho(@Query() body?: any) {
    const carrinho = await this.carrinhoService.getCarrinhoUser(body?.usuario_id)
    return carrinho
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
