import { useContext } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  
  function temProduto(id) {
    return carrinho.some(itemDoCarrinho => 
      itemDoCarrinho.id === id
    );
  }

  function mudarQuantidade (id, quantidade) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade
      return itemDoCarrinho;
    });
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

  function removerProduto(id){
    const produto = carrinho.find(item => item.id === id);

    if (produto.quantidade === 1){
      setCarrinho(carrinho.filter(item => item.id !== id))
    }

    const carrinhoAtualizado = mudarQuantidade(id, -1);
    setCarrinho([...carrinhoAtualizado]);
  }


  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  }
};
