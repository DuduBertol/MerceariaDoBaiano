<?php
header('Content-Type: application/json');

$host = "localhost:3307";
$user = "root";
$senha = "";
$banco = "MerceariaDoBaiano";

$conn = mysqli_connect($host, $user, $senha, $banco);
if (!$conn) {
    die(json_encode(['success' => false, 'message' => 'Falha na conexão com o banco']));
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['cliente_id']) || !is_numeric($input['cliente_id'])) {
    echo json_encode(['success' => false, 'message' => 'ID do cliente ausente ou inválido.']);
    exit;
}

$cliente_id = (int) $input['cliente_id'];
$total = (float) $input['total'];
$itens = $input['itens'] ?? [];

if ($total <= 0 || empty($itens)) {
    echo json_encode(['success' => false, 'message' => 'Total inválido ou itens ausentes.']);
    exit;
}

mysqli_begin_transaction($conn);

try {
    $queryVendas = "INSERT INTO vendas (cliente_id, total) VALUES (?, ?)";
    $stmt = mysqli_prepare($conn, $queryVendas);
    mysqli_stmt_bind_param($stmt, "id", $cliente_id, $total);
    mysqli_stmt_execute($stmt);

    $venda_id = mysqli_insert_id($conn);

    foreach ($itens as $item) {
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

    mysqli_commit($conn);
    echo json_encode(['success' => true, 'venda_id' => $venda_id]);

} catch (Exception $e) {
    mysqli_rollback($conn);
    echo json_encode(['success' => false, 'message' => 'Erro ao registrar venda: ' . $e->getMessage()]);
} finally {
    mysqli_close($conn);
}
?>
