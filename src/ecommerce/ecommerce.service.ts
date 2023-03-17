import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePost } from './dto/post.dto';
import { BadRequestError, NotFoundError } from 'src/shared/helpers/api-erros';

@Injectable()
export class EcommerceService {
  constructor(private db: PrismaService) {}

  async getCarrinho(){
  
  }
  async getProdutos(){
    let produtos
    produtos = await this.db.produto.findMany({
      include: {
        categorias: {
          include: {
            categoria: true
          }
        }
      }
    })
    produtos = produtos.map((produto) => {
      produto.categorias = produto?.categorias.map((categoria) => {
        return categoria.categoria
      });
      return produto
    });

    return produtos
  }
  

}
