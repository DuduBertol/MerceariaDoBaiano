    document.getElementById('form-login').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão

        const user = document.getElementById('user').value.trim();
        const pass = document.getElementById('pass').value.trim();

        if (user === '' || pass === '') {
            alert('Preencha todos os campos, cabra!');
        } else {
            window.location.href = "../html/pagina_inicial.html";
        }
    });
