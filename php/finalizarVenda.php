<?php
header('Content-Type: application/json');

// Configurações do banco
$host = "localhost:3307";
$user = "root";
$senha = "";
$banco = "MerceariaDoBaiano";

// Conexão com o banco
$conn = mysqli_connect($host, $user, $senha, $banco);

if (!$conn) {
    die(json_encode(['success' => false, 'message' => 'Falha na conexão com o banco']));
}

// Recebe os dados JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    die(json_encode(['success' => false, 'message' => 'Dados inválidos']));
}

// Inicia transação
mysqli_begin_transaction($conn);

try {
    // 1. Insere a venda principal
    $queryVendas = "INSERT INTO vendas (cliente_id, total) VALUES (?, ?)";
    $stmt = mysqli_prepare($conn, $queryVendas);
    mysqli_stmt_bind_param($stmt, "id", $input['cliente_id'], $input['total']);
    mysqli_stmt_execute($stmt);
    
    $venda_id = mysqli_insert_id($conn);
    
    // 2. Insere os itens da venda
    foreach ($input['itens'] as $item) {
        $queryItens = "INSERT INTO itens_venda 
                      (venda_id, produto_id, quantidade, preco_unitario, subtotal) 
                      VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $queryItens);
        mysqli_stmt_bind_param($stmt, "iiddd", 
            $venda_id,
            $item['produto_id'],
            $item['quantidade'],
            $item['preco_unitario'],
            $item['subtotal']
        );
        mysqli_stmt_execute($stmt);
    }
    
    // Confirma a transação
    mysqli_commit($conn);
    echo json_encode(['success' => true, 'venda_id' => $venda_id]);
    
} catch (Exception $e) {
    // Desfaz em caso de erro
    mysqli_rollback($conn);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} finally {
    mysqli_close($conn);
}
?>