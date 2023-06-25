import { Controller, Get, Body } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Produto')
@Controller('ecommerce')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get('produtos')
  async getProdutos() {
    const produtos = await this.produtoService.getProdutos();
    return produtos;
  }

  @Get('produto')
  async getProduto(@Body() body?: any) {
    const produto = await this.produtoService.getProduto(body?.produto_id);
    return produto;
  }
}
