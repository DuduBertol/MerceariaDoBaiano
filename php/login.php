<?php
$host = "localhost:3307";
$user = "root";
$senha = "";
$banco = "MerceariaDoBaiano";

$conn = mysqli_connect($host, $user, $senha, $banco);

if (!$conn) {
    die("Erro na conexão: " . mysqli_connect_error());
}

// Recebe os dados
$login = $_POST['user'];
$senhaDigitada = $_POST['pass'];

// Busca pelo nome OU email
$query = "SELECT * FROM clientes WHERE nome = '$login' OR email = '$login'";
$resultado = mysqli_query($conn, $query);

if (mysqli_num_rows($resultado) === 1) {
    $usuario = mysqli_fetch_assoc($resultado);
    
    // Verifica a senha
    if (password_verify($senhaDigitada, $usuario['senha'])) {
        echo "sucesso";
    } else {
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}

mysqli_close($conn);
?>
