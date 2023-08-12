class CaixaDaLanchonete {

    // Criando o cardápio em formato de objeto literal(padrão key-value)
    cardapio = {
        'cafe' : 3.0,
        'chantily' : 1.50,
        'suco' : 6.20,
        'sanduiche' : 6.50,
        'queijo' : 2.00,
        'salgado' : 7.25,
        'combo1' : 9.50,
        'combo2' : 7.50
    };

    // Armazenando as formas de pagamento em outro objeto literal com as respectivas condições de pagamento
    formaPagamento = {
        'dinheiro' : 0.95,
        'debito' : 1.0, 
        'credito' : 1.03
    };

    // Objeto literal que armazena a compra na execução
    compra = {};

    calcularValorDaCompra(metodoDePagamento, itens) {

        // Iniciando valor da compra
        let valorTotal = 0; 

        // Checando se o array é um array e, caso seja, se é um array não vazio
        if (Array.isArray(itens) && itens.length === 0){
            return 'Não há itens no carrinho de compra!'
        }

        // Conversão dos dados do array para código e quantidade
        // + Checagem de código existente
        // + Checagem de itens não nulos  
        for (const compraStr of itens) {
            let [codigo, quantidade] = compraStr.split(',');
            quantidade = parseInt(quantidade, 10);

            if (!this.cardapio[codigo]) {
                return 'Item inválido!';
            }
            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            // Salvando códigos e quantidades
            this.compra[codigo] = quantidade;

            // Atualizando o valor total
            valorTotal += this.cardapio[codigo] * quantidade;
        }

        // Checagem de dependência de itens principais para queijo e chantily
        if (this.compra['queijo'] && !this.compra['sanduiche']){
            return 'Item extra não pode ser pedido sem o principal';
        }
        if (this.compra['chantily'] && !this.compra['cafe']){
            return 'Item extra não pode ser pedido sem o principal';
        }

        // Na tentativa de manter uma lógica onde primeiro verificaríamos sobre os itens 
        // e depois sobre o pagamento, esta validação ficou por último

        // Checando se a forma de pagamento é válida 
        if (!this.formaPagamento[metodoDePagamento]){
            return 'Forma de pagamento inválida!'
        };

        // Atualizando o valor total com a devida forma de pagamento
        valorTotal *= this.formaPagamento[metodoDePagamento]

        // Retornando o valor total final com toFixed, já corrigido a formatação
        return 'R$ ' + valorTotal.toFixed(2).replace('.',',');
    }

}

export { CaixaDaLanchonete };