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

  async getCarrinhoUser(id) {
    let carrinho = await this.db.carrinho.findUnique({
      where: {
        usuario_id: +id
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
    return await this.updateCarrinhoValor(carrinho_id)
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

  async removerProdutoCarrinho({ produto_id, carrinho_id }) {
    // Valida se o produto e o carrinho existem
    // Remove o produto do carrinho
    await this.validarProdutoCarrinho(produto_id, carrinho_id)  
   
    const carrinho = await this.getCarrinho(carrinho_id)
    const quantidadeAtual = carrinho.itens.find(item => item.produto_id === +produto_id).quantidade
    if (quantidadeAtual === 1) {
      return await this.removerProdutoCarrinhoTudo({ produto_id, carrinho_id })
    }
    let produtoDeletado = await this.db.carrinhoItem.update({
      where: {
        carrinho_id_produto_id: {
          produto_id: +produto_id,
          carrinho_id: +carrinho_id
        }
      },
      data: {
        quantidade: {
          decrement: 1
        }
      }
    });
    return  await this.updateCarrinhoValor(carrinho_id)
  }


  async removerProdutoCarrinhoTudo({ produto_id, carrinho_id }) {
    // Valida se o produto e o carrinho existem
    // Remove o produto do carrinho
    await this.validarProdutoCarrinho(produto_id, carrinho_id)  
    let produtoDeletado = await this.db.carrinhoItem.delete({
      where: {
        carrinho_id_produto_id: {
          produto_id: +produto_id,
          carrinho_id: +carrinho_id
        }
      }
    });

    return await this.updateCarrinhoValor(carrinho_id)
  }

  async validarProdutoCarrinho(produto_id, carrinho_id) {
    const produto = await this.produtoService.getProduto(produto_id)
    const carrinho = await this.getCarrinho(carrinho_id)
    const carrinhoItem = carrinho.itens.find(produto => produto.produto_id === +produto_id)
    if (!carrinhoItem) {
      throw new NotFoundError('Produto não encontrado no carrinho')
    }
    return produto
  }

}
