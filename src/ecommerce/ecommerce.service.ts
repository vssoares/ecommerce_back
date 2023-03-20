import { Injectable } from '@nestjs/common';
import { Carrinho } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { NotFoundError } from 'src/shared/helpers/api-erros';
import { calcularValorTotalCarrinho, limparRelacao } from 'src/shared/utils/utils';

@Injectable()
export class EcommerceService {
  constructor(private db: PrismaService) { }

  async getCarrinho(id){
    let carrinho = await this.db.carrinho.findUnique({
      where: {
        id: +id
      },
      include: {
        produtos: {
          include: {
            produto: true
          }
        }
      }
    })

    if (!carrinho) throw new NotFoundError('Carrinho não encontrado')
    // carrinho = limparRelacao(carrinho, 'produtos', 'produto')
    return carrinho
  }

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