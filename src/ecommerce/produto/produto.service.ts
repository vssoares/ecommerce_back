import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotFoundError } from 'src/shared/helpers/api-erros';
import { limparRelacao } from 'src/shared/utils/utils';

@Injectable()
export class ProdutoService {

  
  constructor(
    private db: PrismaService
  ) { }

  
  async getProduto(id) {
    let produto = await this.db.produto.findUnique({
      where: {
        id: +id
      },
      include: {
        categorias: {
          include: {
            categoria: true
          }
        }
      }
    })
    if (!produto) throw new NotFoundError('Produto não encontrado')
    produto = limparRelacao(produto, 'categorias', 'categoria')
    return produto
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
    produtos = limparRelacao(produtos, 'categorias', 'categoria')
    return produtos
  }

}
