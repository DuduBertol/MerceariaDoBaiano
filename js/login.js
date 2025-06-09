document.getElementById('form-login').addEventListener('submit', function(event) { 
    event.preventDefault();

    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('pass').value.trim();

    if (user === '' || pass === '') {
        alert('Preencha todos os campos, cabra!');
        return;
    }

    // Envia os dados para o PHP via POST
    fetch('../php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'sucesso') {
            window.location.href = "../html/pagina_inicial.html";
        } else {
            alert(data); // Mostra a mensagem do PHP
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar fazer login!');
    });
});
