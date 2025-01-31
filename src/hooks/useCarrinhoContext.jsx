import { useContext, useEffect, useMemo } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidade,
    setQuantidade,
    valorTotal,
    setValorTotal,
  } = useContext(CarrinhoContext);

  function temProduto(id) {
    return carrinho.some((itemDoCarrinho) => itemDoCarrinho.id === id);
  }

  function mudarQuantidade(id, quantidade) {
    return carrinho
      .map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
        return itemDoCarrinho;
      })
      .filter((itemDoCarrinho) => itemDoCarrinho.quantidade !== 0);
  }

  function adicionarProduto(novoProduto) {
    if (!temProduto(novoProduto.id)) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);
    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProduto(id) {
    const produto = carrinho.find((item) => item.id === id);
    // if (produto.quantidade === 1){
    //   return setCarrinho(carrinho.filter(item => item.id !== id))
    // }
    const carrinhoAtualizado = mudarQuantidade(id, -1);
    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProdutoCarrinho(id) {
    const produto = carrinho.filter(
      (itemDoCarrinho) => itemDoCarrinho.id !== id
    );
    setCarrinho(produto);
  }

  const { totalTemp, quantidadeTemp } = useMemo(() => {
    return carrinho.reduce(
      (acumulador, produto) => ({
        quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
        totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
      }),
      {
        quantidadeTemp: 0,
        totalTemp: 0,
      }
    );
  }, [carrinho]);

  useEffect(() => {
    setQuantidade(quantidadeTemp);
    setValorTotal(totalTemp);
  });

  return {
    carrinho,
    setCarrinho,
    quantidade,
    setQuantidade,
    valorTotal,
    setValorTotal,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
  };
};
