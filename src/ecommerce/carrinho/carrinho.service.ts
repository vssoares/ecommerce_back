import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BadRequestError, NotFoundError } from 'src/shared/helpers/api-erros';
import { calcularValorTotalCarrinho } from 'src/ecommerce/utils/utils';
import { ProdutoService } from '../produto/produto.service';

@Injectable()
export class CarrinhoService {
  constructor(
    private db: PrismaService,
    private produtoService: ProdutoService,
  ) {}

  async getCarrinho({ usuario_id, id }: any) {
    usuario_id = +usuario_id;
    id = +id;

    const where = id ? { id } : usuario_id ? { usuario_id } : false;
    if (!where) throw new NotFoundError('Carrinho não encontrado');
    const carrinho = await this.db.carrinho
      .findUnique({
        where,
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
        },
      })
      .catch(() => {
        throw new BadRequestError();
      });

    if (!carrinho) throw new NotFoundError('Carrinho não encontrado');
    // carrinho = limparRelacao(carrinho, 'produtos', 'produto')
    return carrinho;
  }

  async updateCarrinhoValor(id) {
    let carrinho = await this.getCarrinho({ id });
    const valorTotalCarrinho = calcularValorTotalCarrinho(carrinho);
    carrinho = await this.db.carrinho.update({
      where: {
        id: +id,
      },
      data: {
        valor_total: valorTotalCarrinho,
      },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });
    return carrinho;
  }

  async addProdutoCarrinho({ quantidade, produto_id, carrinho_id }) {
    quantidade = +quantidade;
    produto_id = +produto_id;
    carrinho_id = +carrinho_id;
    let preco_unitario = 0;
    let preco_total = 0;

    // Adiciona o produto ao carrinho se não existir, ou atualiza a quantidade somando com a nova
    const carrinhoItem = await this.getProdutoCarrinho({
      produto_id,
      carrinho_id,
    });

    if (!carrinhoItem) {
      const produto = await this.produtoService.getProduto(produto_id);
      preco_unitario = produto.preco;
    } else {
      preco_unitario = carrinhoItem?.preco_unitario;
      quantidade = carrinhoItem?.quantidade + quantidade;
    }

    preco_total = preco_unitario * quantidade;

    await this.db.carrinhoItem.upsert({
      where: {
        carrinho_id_produto_id: { produto_id, carrinho_id },
      },
      create: {
        produto_id,
        carrinho_id,
        quantidade,
        preco_unitario,
        preco_total,
      },
      update: {
        quantidade,
        preco_total,
      },
    });
    return await this.updateCarrinhoValor(carrinho_id);
  }

  async removerProdutoCarrinho({ produto_id, carrinho_id }) {
    // Valida se o produto e o carrinho existem
    // Remove o produto do carrinho
    const carrinhoItem = await this.validarProdutoCarrinho(
      produto_id,
      carrinho_id,
    );
    const quantidade = carrinhoItem?.quantidade;
    const preco = carrinhoItem?.preco_unitario;
    if (quantidade === 1) {
      return await this.removerProdutoCarrinhoTudo({ produto_id, carrinho_id });
    }
    await this.db.carrinhoItem.update({
      where: {
        carrinho_id_produto_id: {
          produto_id: +produto_id,
          carrinho_id: +carrinho_id,
        },
      },
      data: {
        quantidade: {
          decrement: 1,
        },
        preco_total: preco * (quantidade - 1),
      },
    });
    return await this.updateCarrinhoValor(carrinho_id);
  }

  async removerProdutoCarrinhoTudo({ produto_id, carrinho_id }) {
    // Valida se o produto e o carrinho existem
    // Remove o produto do carrinho
    await this.validarProdutoCarrinho(produto_id, carrinho_id);
    await this.db.carrinhoItem.delete({
      where: {
        carrinho_id_produto_id: {
          produto_id: +produto_id,
          carrinho_id: +carrinho_id,
        },
      },
    });

    return await this.updateCarrinhoValor(carrinho_id);
  }

  async limparProdutosCarrinho({ carrinho_id }) {
    await this.db.carrinhoItem.deleteMany({
      where: {
        carrinho_id: +carrinho_id,
      },
    });
    return await this.updateCarrinhoValor(carrinho_id);
  }

  async getProdutoCarrinho({ produto_id, carrinho_id }) {
    const carrinhoItem = await this.db.carrinhoItem.findUnique({
      where: {
        carrinho_id_produto_id: {
          carrinho_id,
          produto_id,
        },
      },
      include: {
        produto: true,
      },
    });
    return carrinhoItem;
  }

  async validarProdutoCarrinho(produto_id, carrinho_id) {
    const carrinhoItem = this.getProdutoCarrinho({ produto_id, carrinho_id });
    if (!carrinhoItem) {
      throw new NotFoundError('Produto não encontrado no carrinho!');
    }
    return carrinhoItem;
  }
}

// this.db.$use(async (params, next) => {
//   if (params?.model && params.action == 'upsert') {
//     // Logic only runs for delete action and Post model
//   }
//   return next(params);
// });
