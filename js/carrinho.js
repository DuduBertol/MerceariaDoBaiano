const tbody = document.querySelector('.tabela_carrinho tbody');
const subtotalSpan = document.querySelector('.info_box div span:last-child');
const totalFooter = document.querySelector('.footer_box');

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderizarCarrinho() {
  tbody.innerHTML = '';
  let subtotal = 0;

  if (carrinho.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td colspan="5" style="text-align: center; padding: 20px; font-size: 1.2rem;">
        🛒 Vixe.. Tá faltando dendê nesse balaio, viu?!
      </td>
    `;
    tbody.appendChild(tr);

    subtotalSpan.textContent = 'R$0,00';
    totalFooter.textContent = 'Total: R$0,00';
    return; // Não renderiza mais nada
  }

  carrinho.forEach((item, index) => {
    subtotal += item.total;

    // aq to criando linha da tabela
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>
        <div class="produto">
          <img src="${item.imagem}" alt="${item.nome}">
          <div class="info">
            <div class="name">${item.nome}</div>
            <div class="category">${item.categoria || ''}</div>
          </div>
        </div>
      </td>
      <td>R$${item.precoUnitario.toFixed(2)}</td>
      <td>
        <div class="qty">
          <button class="btn-minus" data-index="${index}"><i class="fa-solid fa-minus"></i></button>
          <span>${item.quantidade}</span>
          <button class="btn-plus" data-index="${index}"><i class="fa-solid fa-plus"></i></button>
        </div>
      </td>
      <td>R$${item.total.toFixed(2)}</td>
      <td>
        <button class="remover_produto" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  subtotalSpan.textContent = `R$${subtotal.toFixed(2)}`;
  totalFooter.textContent = `Total: R$${subtotal.toFixed(2)}`; // aqui pode somar frete se quiser
}

function removerProduto(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderizarCarrinho();
}

function atualizarQuantidade(index, delta) {
  const item = carrinho[index];
  let novaQuantidade = item.quantidade + delta;

  if (novaQuantidade < 1) return;

  item.quantidade = novaQuantidade;

  if (item.tipoPreco === "fixo") {
    item.total = parseFloat((item.precoUnitario * item.quantidade).toFixed(2));
  } else {
    item.total = parseFloat(((item.precoUnitario * item.quantidade) / 1000).toFixed(2));
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderizarCarrinho();
}

tbody.addEventListener('click', (e) => {
  if (e.target.closest('.remover_produto')) {
    const index = e.target.closest('button').dataset.index;
    removerProduto(index);
  } else if (e.target.closest('.btn-plus')) {
    const index = e.target.closest('button').dataset.index;

    const item = carrinho[index];
    const delta = (item.tipoPreco === 'fixo') ? 1 : 100;
    
    atualizarQuantidade(parseInt(index), delta);
  } else if (e.target.closest('.btn-minus')) {
    const index = e.target.closest('button').dataset.index;

    const item = carrinho[index];
    const delta = (item.tipoPreco === 'fixo') ? -1 : -100;
    
    atualizarQuantidade(parseInt(index), delta);
  }
});

// p iniciar a pagina
renderizarCarrinho();
