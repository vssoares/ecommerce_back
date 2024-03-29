import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import {
  AddProdutoCarrinho,
  GetCarrinho,
  ProdutoCarrinho,
} from './swagger/classes';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Carrinho')
@Controller('ecommerce')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}
  @Get('carrinho')
  async getCarrinho(@Query() body?: GetCarrinho) {
    const carrinho = await this.carrinhoService.getCarrinho(body);
    return carrinho;
  }

  @Patch('carrinho/produto')
  async addProdutoCarrinho(@Body() body: AddProdutoCarrinho) {
    const carrinho = await this.carrinhoService.addProdutoCarrinho(body);
    return carrinho;
  }

  @Patch('carrinho/produto/remover')
  async removerProdutoCarrinho(@Body() body: ProdutoCarrinho) {
    const carrinho = await this.carrinhoService.removerProdutoCarrinho(body);
    return carrinho;
  }

  @Patch('carrinho/produto/remover/tudo')
  async removerProdutoCarrinhoTudo(@Body() body: any) {
    const carrinho = await this.carrinhoService.removerProdutoCarrinhoTudo(
      body,
    );
    return carrinho;
  }

  @Patch('carrinho/limpar')
  @ApiProperty({ name: 'carrinho_id', required: true })
  async limparCarrinho(@Body() body: any) {
    const carrinho = await this.carrinhoService.limparProdutosCarrinho(body);
    return carrinho;
  }
}
