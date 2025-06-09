<?php
$host = "localhost:3307";
$user = "root";
$senha = "";
$banco = "MerceariaDoBaiano";

$conn = mysqli_connect($host, $user, $senha, $banco);

$email = $_POST['email'];
$senhaDigitada = $_POST['pass'];

$query = "SELECT * FROM clientes WHERE email = '$email'";
$resultado = mysqli_query($conn, $query);

if (mysqli_num_rows($resultado) === 1) {
    $usuario = mysqli_fetch_assoc($resultado);

    if ($senhaDigitada === $usuario['senha']) { // ou use password_verify se for hash
        // Login OK, retorna JSON com sucesso e cliente_id
        echo json_encode([
            'success' => true,
            'cliente_id' => $usuario['id'],
            'message' => 'Logado com sucesso!'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Senha incorreta!'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'E-mail não encontrado!'
    ]);
}

mysqli_close($conn);
?>
