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

   @Get('produto')
   async getProduto(@Body() body?: any) {
      const produto = await this.ecommerceService.getProduto(body?.produto_id)
      return produto
   }

}
