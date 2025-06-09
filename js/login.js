document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('pass').value.trim();

    if (email === '' || pass === '') {
        alert('Preencha todos os campos, cabra!');
        return;
    }

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('pass', pass);

    fetch("../php/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    })
    .then(response => response.json())  // Alterado para json()
    .then(data => {
        if (data.success) {
            // Armazena cliente_id e email no localStorage
            localStorage.setItem('cliente_id', data.cliente_id);
            localStorage.setItem('email', email);

            alert(data.message || 'Logado com sucesso!');
            window.location.href = "../html/pagina_inicial.html";
        } else {
            alert(data.message || 'Falha no login.');
        }
    })
    .catch(error => {
        console.error("Erro no login:", error);
        alert("Ocorreu um erro no login.");
    });
});
