import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';

@Controller('ecommerce')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get('produtos')
  async getProdutos(@Body() body?: any) {
    const produtos = await this.produtoService.getProdutos();
    return produtos;
  }

  @Get('produto')
  async getProduto(@Body() body?: any) {
    const produto = await this.produtoService.getProduto(body?.produto_id);
    return produto;
  }
}
