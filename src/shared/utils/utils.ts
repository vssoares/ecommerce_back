export const limparRelacao = (lista, flagLista, flagListaFilha) => {
   if (!Array.isArray(lista)) {
      lista[flagLista] = lista[flagLista].map((item) => {
         return item[flagListaFilha]
      });
      return lista
   }
   lista = lista.map((itemPai) => {
      itemPai[flagLista] = itemPai[flagLista].map((item) => {
        return item[flagListaFilha]
      });
      return itemPai
   });
   return lista
}

export const calcularValorTotalCarrinho = (carrinho) => {
   let valorTotal = 0
   carrinho.produtos.forEach((produto) => {
     valorTotal += produto.preco * produto.quantidade
   })
   return valorTotal
 }