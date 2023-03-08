import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePost } from './dto/post.dto';

@Controller('blog')
export class BlogController {

   constructor(
      private blogService: BlogService
   ){}

   @Get('posts')
   async getAllPosts(@Body() body?: any) {
   const posts = body?.user_id
      ? await this.blogService.getUserPosts(body?.user_id)
      : await this.blogService.getAllPosts();

   return { status: true, posts };
   }

   @Post('post')
   async createPost(@Body() postDetail: CreatePost){
      const post = await this.blogService.createPost(postDetail)
      return { status: true, post }
   }

}
