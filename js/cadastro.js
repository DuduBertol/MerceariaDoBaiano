
// Adiciona um ouvinte para o evento de envio do formulário
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    // Impede o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    //CODIGO BANCO
    const formData = new FormData(event.target);
    const params = new URLSearchParams(formData).toString();

    fetch("../php/cadastrar.php?" + params)
    .then(response => response.text())
    .then(data => alert(data))
    //FIM CODIGO BANCO

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim(); // Remove espaços extras
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const nascimento = document.getElementById('nascimento').value;
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar').value;

    // Verifica se algum campo está vazio
    if (!nome || !sobrenome || !nascimento || !senha || !confirmar) {
        alert('Preencha tudo direitinho, cabra!'); // Mensagem de alerta personalizada
        return; // Interrompe a execução do código
    }

    // Verifica se as senhas digitadas são diferentes
    if (senha !== confirmar) {
        alert('As senhas não batem, visse?'); // Mensagem se as senhas não coincidem
        return; // Interrompe a execução
    }

    // Redireciona o usuário para a página de login
    window.location.href = "./login.html";
});
