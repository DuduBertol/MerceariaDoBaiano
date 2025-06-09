const tbody = document.querySelector('.tabela_carrinho tbody');
const subtotalSpan = document.querySelector('.info_box div span:last-child');
const totalFooter = document.querySelector('.footer_box');
const finalizarBtn = document.getElementById('finalizarCompra');

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderizarCarrinho() {
  tbody.innerHTML = '';
  let subtotal = 0;

  if (carrinho.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="5" style="text-align: center; padding: 20px; font-size: 1.2rem;">
        🛒 Vixe.. Tá faltando dendê nesse balaio, viu?!
      </td>`;
    tbody.appendChild(tr);
    subtotalSpan.textContent = 'R$0,00';
    totalFooter.textContent = 'Total: R$0,00';
    return;
  }

  carrinho.forEach((item, index) => {
    subtotal += item.total;

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
  totalFooter.textContent = `Total: R$${subtotal.toFixed(2)}`;
}

function removerProduto(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  renderizarCarrinho();
}

function atualizarQuantidade(index, delta) {
  const item = carrinho[index];
  const novaQuantidade = item.quantidade + delta;
  if (novaQuantidade < 1) return;

  item.quantidade = novaQuantidade;
  item.total = item.precoUnitario * item.quantidade;
  salvarCarrinho();
  renderizarCarrinho();
}

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

finalizarBtn.addEventListener('click', async function () {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const clienteId = localStorage.getItem('cliente_id');
  if (!clienteId) {
    alert('Erro: Cliente não identificado. Faça login novamente.');
    return;
  }

  const dadosVenda = {
    cliente_id: parseInt(clienteId),
    total: carrinho.reduce((sum, item) => sum + item.total, 0),
    itens: carrinho.map(item => ({
      produto_id: item.id,
      quantidade: item.quantidade,
      preco_unitario: item.precoUnitario,
      subtotal: item.total
    }))
  };

  try {
    const response = await fetch('../php/finalizarVenda.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosVenda)
    });

    const resultado = await response.json();

    if (resultado.success) {
      alert(`Venda finalizada com sucesso! ID: ${resultado.venda_id}`);
      localStorage.removeItem('carrinho');
      carrinho = [];
      renderizarCarrinho();
      window.location.href = 'pagina_inicial.html';
    } else {
      throw new Error(resultado.message || 'Erro ao finalizar compra');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao finalizar compra: ' + error.message);
  }
});

tbody.addEventListener('click', (e) => {
  if (e.target.closest('.remover_produto')) {
    const index = e.target.closest('button').dataset.index;
    removerProduto(parseInt(index));
  } else if (e.target.closest('.btn-plus')) {
    const index = e.target.closest('button').dataset.index;
    atualizarQuantidade(parseInt(index), 1);
  } else if (e.target.closest('.btn-minus')) {
    const index = e.target.closest('button').dataset.index;
    atualizarQuantidade(parseInt(index), -1);
  }
});

renderizarCarrinho();