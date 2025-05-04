const produtos = [
    // LISTA DOS DEFUMADOS - EMBUTIDOS
    {
        id: 1,
        nome: "Salame Defumado",
        descricao: "Salame artesanal defumado com especiarias.",
        imagem: "../assets/salame.png",
        precoPorKg: 95
    },
    {
        id: 2,
        nome: "Bacon Defumado",
        descricao: "Bacon defumado crocante e saboroso.",
        imagem: "../assets/bacon.png",
        precoPorKg: 46
    },
    {
        id: 3,
        nome: "Presunto Defumado",
        descricao: "Presunto defumado premium.",
        imagem: "../assets/presunto.png",
        precoPorKg: 38
    },
    {
        id: 4,
        nome: "Linguiça Calabresa",
        descricao: "Linguiça calabresa defumada ideal para pratos típicos.",
        imagem: "../assets/calabresa.png",
        precoPorKg: 32
    },
    {
        id: 5,
        nome: "Copa Lombo Defumado",
        descricao: "Corte nobre defumado lentamente.",
        imagem: "../assets/copa-lombo.png",
        precoPorKg: 75
    },

    // LISTA DOS DEFUMADOS - QUEIJOS
    {
        id: 6,
        nome: "Provolone Defumado",
        descricao: "Queijo provolone defumado, sabor intenso.",
        imagem: "../assets/provolone.png",
        precoPorKg: 113
    },
    {
        id: 7,
        nome: "Mussarela Defumada",
        descricao: "Mussarela defumada ideal para lanches.",
        imagem: "../assets/mussarela.png",
        precoPorKg: 54
    },
    {
        id: 8,
        nome: "Gouda Defumado",
        descricao: "Gouda com toque defumado e textura cremosa.",
        imagem: "../assets/gouda.png",
        precoPorKg: 88
    },
    {
        id: 9,
        nome: "Parmesão Defumado",
        descricao: "Parmesão curado com defumação natural.",
        imagem: "../assets/parmesao.png",
        precoPorKg: 169
    },

    // LISTA DOS DEFUMADOS - TEMPEROS
    {
        id: 10,
        nome: "Chimichurri Defumado",
        descricao: "Tempero argentino com toque defumado.",
        imagem: "../assets/chimichurri.png",
        precoPorKg: 79
    },
    {
        id: 11,
        nome: "Páprica Defumada",
        descricao: "Páprica doce defumada ideal para carnes.",
        imagem: "../assets/paprica.png",
        precoPorKg: 19
    },
    {
        id: 12,
        nome: "Fumaça em Pó",
        descricao: "Aromatizante defumado para churrasco e molhos.",
        imagem: "../assets/fumaca.png",
        precoPorKg: 20
    },
    {
        id: 13,
        nome: "Sal de Parrilla Defumado",
        descricao: "Sal grosso com aroma defumado.",
        imagem: "../assets/sal-parrilla.png",
        precoPorKg: 29
    },

    // LISTA DAS FRUTAS E VERDURAS
    {
        id: 14,
        nome: "Tomate",
        descricao: "Tomates frescos direto do campo.",
        imagem: "../assets/tomate.png",
        precoPorKg: 7
    },
    {
        id: 15,
        nome: "Cenoura",
        descricao: "Cenouras crocantes e nutritivas.",
        imagem: "../assets/cenoura.png",
        precoPorKg: 6
    },
    {
        id: 16,
        nome: "Xuxu",
        descricao: "Xuxu verde claro, leve e saudável.",
        imagem: "../assets/xuxu.png",
        precoPorKg: 4
    },
    {
        id: 17,
        nome: "Banana",
        descricao: "Bananas maduras e saborosas.",
        imagem: "../assets/banana.png",
        precoPorKg: 8
    },
    {
        id: 18,
        nome: "Maçã",
        descricao: "Maçãs vermelhas doces e crocantes.",
        imagem: "../assets/maca.png",
        precoPorKg: 16
    },

    // LISTA DA PADARIA
    {
        id: 19,
        nome: "Pão de Fermentação Natural",
        descricao: "Pão artesanal com longa fermentação.",
        imagem: "../assets/pao-natural.png",
        precoPorKg: 12
    },
    {
        id: 20,
        nome: "Baguete Italiana",
        descricao: "Baguete crocante ao estilo italiano.",
        imagem: "../assets/baguete.png",
        precoPorKg: 22
    },
    {
        id: 21,
        nome: "Ciabatta",
        descricao: "Pão rústico com casca crocante.",
        imagem: "../assets/ciabatta.png",
        precoPorKg: 26
    },
    {
        id: 22,
        nome: "Pão Australiano",
        descricao: "Pão escuro levemente adocicado.",
        imagem: "../assets/australiano.png",
        precoPorKg: 59
    },
    {
        id: 23,
        nome: "Pão Brioche",
        descricao: "Pão fofo com sabor amanteigado.",
        imagem: "../assets/brioche.png",
        precoPorKg: 33
    }
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const produto = produtos.find(p => p.id === id);

if (produto) {
    document.querySelector('.imagem-produto img').src = produto.imagem;
    document.querySelector('.info-produto h1').textContent = produto.nome;
    document.querySelector('.info-produto p').textContent = produto.descricao;

    const calcularPrecoButton = document.querySelector('.info-produto button[type="button"]'); // botão de calcular preço
    const precoKg = document.querySelector('.preco-kg'); // onde o preço será exibido
    const quantidadeInput = document.querySelector('.info-produto input[type="number"]'); // campo de quantidade em gramas

    calcularPrecoButton.addEventListener('click', function() {
        const quantidadeGramas = parseFloat(quantidadeInput.value);
        
        if (!isNaN(quantidadeGramas) && quantidadeGramas > 0) {
            const precoTotal = (produto.precoPorKg * quantidadeGramas) / 1000; // preço para a quantidade q o usuario quer
            precoKg.textContent = `Preço para ${quantidadeGramas}g: R$ ${precoTotal.toFixed(2)}`;
        } else {
            precoKg.textContent = "Por favor, insira uma quantidade válida em gramas.";
        }
    });
} else {
    document.querySelector('.conteudo').innerHTML = "<p>Produto não encontrado.</p>";
}