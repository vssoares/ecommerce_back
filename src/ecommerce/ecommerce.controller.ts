import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';
import { CreatePost } from './dto/post.dto';

@Controller('ecommerce')
export class EcommerceController {

   constructor(
      private ecommerceService: EcommerceService
   ){}

   @Get('produtos')
   async getProdutos(@Body() body?: any) {
      const produtos = await this.ecommerceService.getProdutos()
      return produtos
   }

   @Get('produtos/:id')
   async getProduto(@Param('id') id: string) {
      const produto = await this.ecommerceService.getProduto(+id)
      return produto
   }

   @Get('carrinho')
   async getCarrinho(@Body() body?: any) {
      const carrinho = await this.ecommerceService.getCarrinho()
      return carrinho
   }

   @Post('carrinho/produto')
   async addProdutoCarrinho(@Body() body: any) {
      const carrinho = await this.ecommerceService.addProdutosCarrinho(body)
      return carrinho
   }   
   

}
