import { useContext } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  
  function temProduto(id) {
    return carrinho.some((itemDoCarrinho) => {
      itemDoCarrinho.id === id;
    });
  }
  
  function adicionarProduto(novoProduto) {
    if (!temProduto()) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === novoProduto.id)
          itemDoCarrinho.quantidade += 1;
        return itemDoCarrinho;
      })
    );
  }

  function removerProduto(id){
    const produto = carrinho.find(item => item.id === id);

    if (produto.quantidade === 1){
      setCarrinho(carrinho.filter(item => item.id !== id))
    }

    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade -= 1;
        return itemDoCarrinho;
      })
    );
  }


  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  }
};
