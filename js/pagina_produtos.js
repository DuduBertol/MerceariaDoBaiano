const produtos = [
    // LISTA DOS DEFUMADOS - EMBUTIDOS
    {
        id: 1,
        nome: "Salame Defumado",
        descricao: "Salame artesanal defumado com especiarias.",
        imagem: "../assets/salame.png",
        categoria: "Defumados",
        precoPorKg: 95.90
    },
    {
        id: 2,
        nome: "Bacon Defumado",
        descricao: "Bacon defumado crocante e saboroso.",
        imagem: "../assets/bacon.png",
        categoria: "Defumados",
        precoPorKg: 46.90
    },
    {
        id: 3,
        nome: "Presunto Defumado",
        descricao: "Presunto defumado premium.",
        imagem: "../assets/presunto.png",
        categoria: "Defumados",
        precoPorKg: 38.90
    },
    {
        id: 4,
        nome: "Linguiça Calabresa - 400g",
        descricao: "Linguiça calabresa defumada ideal para pratos típicos.",
        imagem: "../assets/calabresa.png",
        categoria: "Defumados",
        precoFixo: 12.90
    },

    // LISTA DOS DEFUMADOS - QUEIJOS
    {
        id: 5,
        nome: "Mussarela Defumada",
        descricao: "Mussarela defumada ideal para lanches.",
        imagem: "../assets/mussarela.png",
        categoria: "Queijos",
        precoPorKg: 54.90
        
    },
    {
        id: 6,
        nome: "Gouda Defumado",
        descricao: "Gouda com toque defumado e textura cremosa.",
        imagem: "../assets/gouda.png",
        categoria: "Queijos",
        precoPorKg: 88.90
    },
    {
        id: 7,
        nome: "Provolone Defumado",
        descricao: "Queijo provolone defumado, sabor intenso.",
        imagem: "../assets/provolone.png",
        categoria: "Queijos",
        precoPorKg: 113.90
    },
    {
        id: 8,
        nome: "Parmesão Defumado",
        descricao: "Parmesão curado com defumação natural.",
        imagem: "../assets/parmesao.png",
        categoria: "Queijos",
        precoPorKg: 169.90
    },

    // LISTA DOS DEFUMADOS - TEMPEROS
    {
        id: 9,
        nome: "Chimichurri Defumado",
        descricao: "Tempero argentino com toque defumado.",
        imagem: "../assets/chimichurri.png",
        categoria: "Queijos",
        precoPorKg: 79.90
    },
    {
        id: 10,
        nome: "Páprica Defumada",
        descricao: "Páprica doce defumada ideal para carnes.",
        imagem: "../assets/paprica.png",
        categoria: "Queijos",
        precoPorKg: 19.90
    },
    {
        id: 11,
        nome: "Fumaça em Pó",
        descricao: "Aromatizante defumado para churrasco e molhos.",
        imagem: "../assets/fumaca.png",
        categoria: "Queijos",
        precoPorKg: 20.90
    },
    {
        id: 12,
        nome: "Sal de Parrilla Defumado",
        descricao: "Sal grosso com aroma defumado.",
        imagem: "../assets/sal-parrilla.png",
        categoria: "Queijos",
        precoPorKg: 29.90
    },

    // LISTA DAS FRUTAS E VERDURAS
    {
        id: 13,
        nome: "Tomate",
        descricao: "Tomates frescos direto do campo.",
        imagem: "../assets/tomate.png",
        categoria: "Frutas e Verduras",
        precoPorKg: 7.90
    },
    {
        id: 14,
        nome: "Cenoura",
        descricao: "Cenouras crocantes e nutritivas.",
        imagem: "../assets/cenoura.png",
        categoria: "Frutas e Verduras",
        precoPorKg: 6.90
    },
    {
        id: 15,
        nome: "Chuchu",
        descricao: "Chuchu verde claro, leve e saudável.",
        imagem: "../assets/xuxu.png",
        categoria: "Frutas e Verduras",
        precoPorKg: 4.90
    },
    {
        id: 16,
        nome: "Banana",
        descricao: "Bananas maduras e saborosas.",
        imagem: "../assets/banana.png",
        categoria: "Frutas e Verduras",
        precoPorKg: 8.90
    },

    // LISTA DA PADARIA
    {
        id: 17,
        nome: "Pão de Fermentação Natural",
        descricao: "Pão artesanal com longa fermentação.",
        imagem: "../assets/pao-natural.png",
        categoria: "Frutas e Verduras",
        precoFixo: 12.90
    },
    {
        id: 18,
        nome: "Baguete Italiana",
        descricao: "Baguete crocante ao estilo italiano.",
        imagem: "../assets/baguete.png",
        categoria: "Frutas e Verduras",
        precoFixo: 11.90
    },
    {
        id: 19,
        nome: "Ciabatta",
        descricao: "Pão rústico com casca crocante.",
        imagem: "../assets/ciabatta.png",
        categoria: "Frutas e Verduras",
        precoFixo: 7.90
    },
    {
        id: 20,
        nome: "Pão Australiano",
        descricao: "Pão escuro levemente adocicado.",
        imagem: "../assets/australiano.png",
        categoria: "Frutas e Verduras",
        precoFixo: 7.90
    }
];
//Pega o parâmetro id da URL e converte esse id em número inteiro
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

//Usa .find() para buscar o produto que tem o mesmo id passado na URL
const produto = produtos.find(p => p.id === id);

let precoCalculado = null;  // variável global para armazenar preço calculado

if (produto) {
    document.querySelector('.imagem-produto img').src = produto.imagem;
    document.querySelector('.info-produto h1').textContent = produto.nome;
    document.querySelector('.info-produto p').textContent = produto.descricao;

    const calcularPrecoButton = document.querySelector('.info-produto button[type="button"]');
    const precoKg = document.querySelector('.preco-kg');
    const quantidadeInput = document.querySelector('.info-produto input[type="number"]');
    const containerPreco = document.querySelector('.container-preco');

    if (produto.precoFixo) {
        precoKg.textContent = `Preço fixo: R$ ${produto.precoFixo.toFixed(2)}`;
        containerPreco.style.display = 'none';
        precoCalculado = produto.precoFixo;  // já tem preço fixo disponível
    } else {
        calcularPrecoButton.addEventListener('click', function() {
            const quantidadeGramas = parseFloat(quantidadeInput.value);

            if (!isNaN(quantidadeGramas) && quantidadeGramas > 0) {
                precoCalculado = (produto.precoPorKg * quantidadeGramas) / 1000;
                precoKg.textContent = `Preço para ${quantidadeGramas}g: R$ ${precoCalculado.toFixed(2)}`;
            } else {
                precoKg.textContent = "Por favor, insira uma quantidade válida em gramas.";
                precoCalculado = null;  // reseta o preço calculado
            }
        });
    }
} else {
    document.querySelector('.conteudo').innerHTML = "<p>Produto não encontrado.</p>";
}

document.getElementById("btn-voltar").addEventListener("click", function () {
    window.location.href = "./pagina_inicial.html";
});

document.getElementById("btn-baiano").addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5000";
});

document.getElementById("btn-comprar").addEventListener("click", function() {
    if (produto.precoFixo) {
        adicionaAoCarrinho(precoCalculado, 1);
    } else {
        const quantidadeGramas = parseFloat(document.getElementById("quantidade").value);
        if (!precoCalculado) {
            alert("Por favor, calcule o preço antes de adicionar ao balaio.");
            return;
        }
        if (isNaN(quantidadeGramas) || quantidadeGramas <= 0) {
            alert("Digite uma quantidade válida em gramas.");
            return;
        }
        adicionaAoCarrinho(precoCalculado, quantidadeGramas);
    }
});

function adicionaAoCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const quantidadeGramas = parseFloat(document.getElementById("quantidade").value);
    let quantidadeFinal = 1;
    let precoUnitario = 0;
    let total = 0;

    if (produto.precoFixo) {
        precoUnitario = produto.precoFixo;
        total = precoUnitario;
    } else {
        if (isNaN(quantidadeGramas) || quantidadeGramas <= 0) {
            alert("Digite uma quantidade válida em gramas.");
            return;
        }
        precoUnitario = produto.precoPorKg;
        quantidadeFinal = quantidadeGramas;
        total = (precoUnitario * quantidadeGramas) / 1000;
    }

    const indexItemExistente = carrinho.findIndex(item => item.id === produto.id);

    if (indexItemExistente > -1) {
        carrinho[indexItemExistente].quantidade += quantidadeFinal;
        carrinho[indexItemExistente].total += total;

        carrinho[indexItemExistente].total = parseFloat(carrinho[indexItemExistente].total.toFixed(2));
    } else {
        const item = {
            id: produto.id,
            nome: produto.nome,
            imagem: produto.imagem,
            categoria: produto.categoria,
            precoUnitario: precoUnitario,
            quantidade: quantidadeFinal,
            total: parseFloat(total.toFixed(2)),
            tipoPreco: produto.precoFixo ? "fixo" : "porKg"
        };

        carrinho.push(item);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Produto adicionado ao balaio com sucesso!");
    console.log("Carrinho atualizado:", carrinho); // pra testar
}
