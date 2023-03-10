import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePost } from './dto/post.dto';
import { BadRequestError, NotFoundError } from 'src/shared/helpers/api-erros';

@Injectable()
export class EcommerceService {
  constructor(private db: PrismaService) {}

  async getCarrinho(){
  
  }

}
