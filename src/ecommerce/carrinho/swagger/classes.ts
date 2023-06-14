import { ApiProperty, ApiQuery } from '@nestjs/swagger';

export class GetCarrinho {
    @ApiProperty({ name: 'id', required: false })
    id: number;

    @ApiProperty({ name: 'usuario_id', required: false })
    usuario_id: number;
}

export class AddProdutoCarrinho {
    @ApiProperty({ name: 'carrinho_id', required: false })
    carrinho_id: number;

    @ApiProperty({ name: 'produto_id', required: false })
    produto_id: number;

    @ApiProperty({ name: 'quantidade', required: false })
    quantidade: number;

}