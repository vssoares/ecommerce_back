import { Injectable } from '@nestjs/common';

@Injectable()
export class CarrinhoService {
   
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
