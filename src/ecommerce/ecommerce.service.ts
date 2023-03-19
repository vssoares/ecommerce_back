import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePost } from './dto/post.dto';
import { BadRequestError, NotFoundError } from 'src/shared/helpers/api-erros';

@Injectable()
export class EcommerceService {
  constructor(private db: PrismaService) { }

  async getCarrinho() {

  }
  async getProdutos() {
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

  async getProduto(id: number) {
    let produto
    produto = await this.db.produto.findUnique({
      where: {
        id: id
      },
      include: {
        categorias: {
          include: {
            categoria: true
          }
        }
      }
    })
    produto.categorias = produto?.categorias.map((categoria) => {
      return categoria.categoria
    });
    return produto
  }

  async addProdutosCarrinho(body: any) {
    const { produtoId, quantidade } = body
    const produto = await this.db.produto.findUnique({
      where: {
        id: produtoId
      }
    })
    if (!produto) {
      throw new NotFoundError('Produto não encontrado')
    }

    await this.db.carrinho.update({
      where: {
        id: body.carrinho_id
      },
      data: {
        produtos: {
          update: {
            where: {
              id: item.id
            },
            data: {
              quantidade: item.quantidade + quantidade
            }
          }
        }
      }
    })

    return await this.getCarrinho()
  }

}
