const produtos = [
    // LISTA DOS DEFUMADOS - EMBUTIDOS
    {
        id: 1,
        nome: "Salame Defumado",
        descricao: "Salame artesanal defumado com especiarias.",
        imagem: "../assets/salame.png",
        precoPorKg: 95.90
    },
    {
        id: 2,
        nome: "Bacon Defumado",
        descricao: "Bacon defumado crocante e saboroso.",
        imagem: "../assets/bacon.png",
        precoPorKg: 46.90
    },
    {
        id: 3,
        nome: "Presunto Defumado",
        descricao: "Presunto defumado premium.",
        imagem: "../assets/presunto.png",
        precoPorKg: 38.90
    },
    {
        id: 4,
        nome: "Linguiça Calabresa",
        descricao: "Linguiça calabresa defumada ideal para pratos típicos.",
        imagem: "../assets/calabresa.png",
        precoFixo: 12.90
    },

    // LISTA DOS DEFUMADOS - QUEIJOS
    {
        id: 5,
        nome: "Mussarela Defumada",
        descricao: "Mussarela defumada ideal para lanches.",
        imagem: "../assets/mussarela.png",
        precoPorKg: 54.90
        
    },
    {
        id: 6,
        nome: "Gouda Defumado",
        descricao: "Gouda com toque defumado e textura cremosa.",
        imagem: "../assets/gouda.png",
        precoPorKg: 88.90
    },
    {
        id: 7,
        nome: "Provolone Defumado",
        descricao: "Queijo provolone defumado, sabor intenso.",
        imagem: "../assets/provolone.png",
        precoPorKg: 113.90
    },
    {
        id: 8,
        nome: "Parmesão Defumado",
        descricao: "Parmesão curado com defumação natural.",
        imagem: "../assets/parmesao.png",
        precoPorKg: 169.90
    },

    // LISTA DOS DEFUMADOS - TEMPEROS
    {
        id: 9,
        nome: "Chimichurri Defumado",
        descricao: "Tempero argentino com toque defumado.",
        imagem: "../assets/chimichurri.png",
        precoPorKg: 79.90
    },
    {
        id: 10,
        nome: "Páprica Defumada",
        descricao: "Páprica doce defumada ideal para carnes.",
        imagem: "../assets/paprica.png",
        precoPorKg: 19.90
    },
    {
        id: 11,
        nome: "Fumaça em Pó",
        descricao: "Aromatizante defumado para churrasco e molhos.",
        imagem: "../assets/fumaca.png",
        precoPorKg: 20.90
    },
    {
        id: 12,
        nome: "Sal de Parrilla Defumado",
        descricao: "Sal grosso com aroma defumado.",
        imagem: "../assets/sal-parrilla.png",
        precoPorKg: 29.90
    },

    // LISTA DAS FRUTAS E VERDURAS
    {
        id: 13,
        nome: "Tomate",
        descricao: "Tomates frescos direto do campo.",
        imagem: "../assets/tomate.png",
        precoPorKg: 7.90
    },
    {
        id: 14,
        nome: "Cenoura",
        descricao: "Cenouras crocantes e nutritivas.",
        imagem: "../assets/cenoura.png",
        precoPorKg: 6.90
    },
    {
        id: 15,
        nome: "Xuxu",
        descricao: "Xuxu verde claro, leve e saudável.",
        imagem: "../assets/xuxu.png",
        precoPorKg: 4.90
    },
    {
        id: 16,
        nome: "Banana",
        descricao: "Bananas maduras e saborosas.",
        imagem: "../assets/banana.png",
        precoPorKg: 8.90
    },

    // LISTA DA PADARIA
    {
        id: 17,
        nome: "Pão de Fermentação Natural",
        descricao: "Pão artesanal com longa fermentação.",
        imagem: "../assets/pao-natural.png",
        precoFixo: 12.90
    },
    {
        id: 18,
        nome: "Baguete Italiana",
        descricao: "Baguete crocante ao estilo italiano.",
        imagem: "../assets/baguete.png",
        precoFixo: 11.90
    },
    {
        id: 19,
        nome: "Ciabatta",
        descricao: "Pão rústico com casca crocante.",
        imagem: "../assets/ciabatta.png",
        precoFixo: 7.90
    },
    {
        id: 20,
        nome: "Pão Australiano",
        descricao: "Pão escuro levemente adocicado.",
        imagem: "../assets/australiano.png",
        precoFixo: 7.90
    }
];
//Pega o parâmetro id da URL e converte esse id em número inteiro
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

//Usa .find() para buscar o produto que tem o mesmo id passado na URL
const produto = produtos.find(p => p.id === id);

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
    } else {
        calcularPrecoButton.addEventListener('click', function() {
            const quantidadeGramas = parseFloat(quantidadeInput.value);
            
            if (!isNaN(quantidadeGramas) && quantidadeGramas > 0) {
                const precoTotal = (produto.precoPorKg * quantidadeGramas) / 1000;
                precoKg.textContent = `Preço para ${quantidadeGramas}g: R$ ${precoTotal.toFixed(2)}`;
            } else {
                precoKg.textContent = "Por favor, insira uma quantidade válida em gramas.";
            }
        });
    }
} else {
    document.querySelector('.conteudo').innerHTML = "<p>Produto não encontrado.</p>";
}


document.getElementById("btn-voltar").addEventListener("click", function () {
    window.location.href = "./pagina_inicial.html";
});