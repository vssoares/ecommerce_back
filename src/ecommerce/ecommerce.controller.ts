import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';
import { CreatePost } from './dto/post.dto';

@Controller('ecommerce')
export class EcommerceController {

   constructor(
      private ecommerceService: EcommerceService
   ){}

   @Get('carrinho')
   async getCarrinho(@Body() body?: any) {
      const carrinho = await this.ecommerceService.getCarrinho()
      return carrinho
   }

}
