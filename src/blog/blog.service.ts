import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePost } from './dto/post.dto';
import { BadRequestError, NotFoundError } from 'src/shared/helpers/api-erros';

@Injectable()
export class BlogService {
  constructor(private db: PrismaService) {}

  async getAllPosts(){
    const posts = await this.db.post.findMany()
    return posts
  }

  async getUserPosts(user_id: number){
    const posts = await this.db.post.findMany({ where: { author_id: user_id } })
    return posts
  }

  async createPost(postDetail: CreatePost) {
    const { title, content, author_id } = postDetail;

    let authorExists = await this.db.user.findUnique({where: { id: author_id }})
    if (!authorExists) throw new NotFoundError('Autor não existe!')
    
    const post = this.db.post.create({
      data: {
        title, 
        content, 
        author: { connect: { id: author_id } }
      },
    })

    if (!post) throw new BadRequestError('Erro ao cadastrar post')

    return post
  }
}
