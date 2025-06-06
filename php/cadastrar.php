<?php

$host = "localhost:3307";
$user = "root";
$senha = "";
$banco = "MerceariaDoBaiano";

/* 
cpf
email
telefone
endereço
data_nasc
senhas
*/

$nome = $_GET['nome'];
$sobrenome = $_GET['sobrenome'];
$cpf = $_GET['cpf'];
$email = $_GET['email'];
$telefone = $_GET['telefone'];
$endereco = $_GET['endereco'];
$nascimento = $_GET['nascimento'];
$senhaCliente = $_GET['senha'];

$conn = mysqli_connect($host, $user, $senha, $banco);
$query = "insert into clientes(nome, sobrenome, cpf, email, telefone, endereco, data_nasc, senha) values('$nome', '$sobrenome', '$cpf', '$email', '$telefone', '$endereco', '$nascimento', '$senhaCliente');";

mysqli_query($conn, $query);

echo "Vocë foi cadastrado com sucesso! Vá para a aba de login";

?>