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

  async addProdutoCarrinho({ quantidade, produto_id, carrinho_id }) {
    // Valida se o produto e o carrinho existem
    // Adiciona o produto ao carrinho se não existir, ou atualiza a quantidade se já existir
    let a = await this.db.produtosOnCarrinho.upsert({
      where: {
        carrinho_id_produto_id: {
          produto_id: +produto_id,
          carrinho_id: +carrinho_id
        }
      },
      create: {
        produto_id: +produto_id,
        carrinho_id: +carrinho_id,
        quantidade: +quantidade,
      },
      update: {
        quantidade: +quantidade,
      },
    });
    const carrinhoUpdated = this.updateCarrinhoValor(carrinho_id)
    return carrinhoUpdated 
  }

  async updateCarrinhoValor(id){
    let carrinho = await this.getCarrinho(id)
    let valorTotalCarrinho = calcularValorTotalCarrinho(carrinho)
    carrinho = await this.db.carrinho.update({
      where: {
        id: +id
      },
      data: {
        valor_total: valorTotalCarrinho
      },
      include: {
        produtos: {
          include: {
            produto: true
          }
        }
      }
    })
    return carrinho
  }
}