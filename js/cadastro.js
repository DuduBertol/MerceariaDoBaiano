document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const params = new URLSearchParams(formData).toString();

    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const nascimento = document.getElementById('nascimento').value;
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar').value;

    if (!nome || !sobrenome || !nascimento || !senha || !confirmar) {
        alert('Preencha tudo direitinho, cabra!');
        return;
    }

    if (senha !== confirmar) {
        alert('As senhas não batem, visse?');
        return;
    }

    fetch("../php/cadastrar.php?" + params)
        .then(response => response.text())
        .then(data => {
            alert(data); // Exibe a mensagem ANTES de qualquer redirecionamento

            if (data.includes("Cadastro realizado com sucesso")) {
                // Redireciona só depois do alert ser fechado
                window.location.href = "./login.html";
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Ocorreu um erro no cadastro.");
        });
});
