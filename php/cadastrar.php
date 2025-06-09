<?php

$host = "localhost:3307";
$user = "root";
$senha = "";
$banco = "MerceariaDoBaiano";

$nome = $_GET['nome'];
$sobrenome = $_GET['sobrenome'];
$cpf = $_GET['cpf'];
$email = $_GET['email'];
$telefone = $_GET['telefone'];
$endereco = $_GET['endereco'];
$nascimento = $_GET['nascimento'];
$senhaCliente = $_GET['senha'];

$conn = mysqli_connect($host, $user, $senha, $banco);

if (!$conn) {
    die("Erro na conexão com o banco de dados: " . mysqli_connect_error());
}

// Verificações específicas
$erros = [];

$verificaCpf = mysqli_query($conn, "SELECT id FROM clientes WHERE cpf = '$cpf'");
if (mysqli_num_rows($verificaCpf) > 0) {
    $erros[] = "CPF já cadastrado.";
}

$verificaEmail = mysqli_query($conn, "SELECT id FROM clientes WHERE email = '$email'");
if (mysqli_num_rows($verificaEmail) > 0) {
    $erros[] = "E-mail já cadastrado.";
}

$verificaTelefone = mysqli_query($conn, "SELECT id FROM clientes WHERE telefone = '$telefone'");
if (mysqli_num_rows($verificaTelefone) > 0) {
    $erros[] = "Telefone já cadastrado.";
}

if (!empty($erros)) {
    echo implode(" ", $erros); // Retorna as mensagens separadas por espaço
} else {
    // Inserção segura
    $query = "INSERT INTO clientes (nome, sobrenome, cpf, email, telefone, endereco, data_nasc, senha) 
              VALUES ('$nome', '$sobrenome', '$cpf', '$email', '$telefone', '$endereco', '$nascimento', '$senhaCliente')";

    if (mysqli_query($conn, $query)) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro ao cadastrar: " . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>
