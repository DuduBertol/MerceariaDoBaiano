<?php

$host = "localhost:3307";
$user = "root";
$senha = "";
$banco = "MerceariaDoBaiano";

$nome = $_GET['nome'];
$sobrenome = $_GET['sobrenome'];
$nascimento = $_GET['nascimento'];
$senhaCliente = $_GET['senha'];

$conn = mysqli_connect($host, $user, $senha, $banco);
$query = "insert into clientes(nome, sobrenome, data_nasc, senha) values('$nome', '$sobrenome', '$nascimento', '$senhaCliente');";

mysqli_query($conn, $query);

echo "Vocë foi cadastrado com sucesso! Vá para a aba de login";

?>