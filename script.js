const produtos = [
  { id: 1, nome: "Perfume Avon", categoria: "Avon", preco: 50, estoque: 3 },
  { id: 2, nome: "Creme Natura", categoria: "Natura", preco: 40, estoque: 0 },
  { id: 3, nome: "Kit O Boticário", categoria: "O Boticário", preco: 70, estoque: 5 }
];

let carrinho = [];

function exibirProdutos(lista) {
  const secao = document.getElementById("produtos");
  secao.innerHTML = "";
  lista.forEach(prod => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <h3>${prod.nome}</h3>
      <p>R$ ${prod.preco}</p>
      <p>${prod.estoque > 0 ? `Em estoque: ${prod.estoque}` : `<span style='color:red'>Esgotado</span>`}</p>
      <button onclick="adicionarCarrinho(${prod.id})" ${prod.estoque <= 0 ? "disabled" : ""}>Adicionar</button>
    `;
    secao.appendChild(div);
  });
}

function filtrarCategoria(categoria) {
  if (categoria === "Todos") {
    exibirProdutos(produtos);
  } else {
    const filtrados = produtos.filter(p => p.categoria === categoria);
    exibirProdutos(filtrados);
  }
}

function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (produto.estoque > 0) {
    carrinho.push(produto);
    produto.estoque -= 1;
    atualizarCarrinho();
    exibirProdutos(produtos);
  }
}

function atualizarCarrinho() {
  const ul = document.getElementById("itens-carrinho");
  ul.innerHTML = "";
  carrinho.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} - R$${p.preco}`;
    ul.appendChild(li);
  });
}

function finalizarCompra() {
  alert("Compra realizada!");
  carrinho = [];
  atualizarCarrinho();
}
window.onload = () => exibirProdutos(produtos);
