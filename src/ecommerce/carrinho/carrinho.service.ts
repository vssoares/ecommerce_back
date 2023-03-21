import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotFoundError } from 'src/shared/helpers/api-erros';
import { calcularValorTotalCarrinho } from 'src/shared/utils/utils';
import { ProdutoService } from '../produto/produto.service';

@Injectable()
export class CarrinhoService {

  constructor(
    private db: PrismaService,
    private produtoService: ProdutoService
  ) { }


  async getCarrinho(id) {
    let carrinho = await this.db.carrinho.findUnique({
      where: {
        id: +id
      },
      include: {
        itens: {
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

  async addProdutoCarrinho({ quantidade, produto_id, carrinho_id }) {
    // Valida se o produto e o carrinho existem
    // Adiciona o produto ao carrinho se não existir, ou atualiza a quantidade se já existir
    const produto = await this.produtoService.getProduto(produto_id)
    let a = await this.db.carrinhoItem.upsert({
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
        preco_unitario: produto.preco
      },
      update: {
        quantidade: +quantidade,
      },
    });
    const carrinhoUpdated = this.updateCarrinhoValor(carrinho_id)
    return carrinhoUpdated
  }

  async updateCarrinhoValor(id) {
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
        itens: {
          include: {
            produto: true
          }
        }
      }
    })
    return carrinho
  }
}
