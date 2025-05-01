<?php
$user = $_GET["user"];
$response = array("resposta" => "Olá Usuário $user");
echo json_encode($response);
?>