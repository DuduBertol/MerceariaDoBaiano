from flask import Flask, request, jsonify, send_from_directory
from ollama import chat
from pydantic import BaseModel
from typing import Literal

app = Flask(__name__)

class Vegetables(BaseModel):
    nome: str
    tipo: str
    origem: str
    mesesdecrescimento: str
    sazonalidade: Literal["Primavera", "Verão", "Outono", "Inverno"]
    sabor: str
    vitaminas: str
    # vitaminas: list[str]
    # existe formato Optional tbm

@app.route('/ask', methods=['POST'])
def ask_vegetable():
    data = request.get_json()

    if not data or 'message' not in data:
        return jsonify({'error': 'Missing "message" field'}), 400

    user_message = data['message']

    # Chamar o modelo
    response = chat(
        messages=[
            {'role': 'system', 'content': 'Você é um especialista em vegetais. Responda apenas com JSON válido no formato especificado.oce'},
            {'role': 'user', 'content': user_message}
        ],
        #role: pode ser "user", "assistant" ou "system"
        #content: o texto da mensagem.
        #Você está simulando uma pergunta do usuário com user_message.
            #user_message = variavel com o que o user perguntou (name="message" no html)
        
        model='gemma3',

        format=Vegetables.model_json_schema(),
        #Vegetables.model_json_schema() vem do Pydantic e 
        # gera um dicionário JSON com a estrutura esperada:
            # Campos obrigatórios
            # Tipos (str, Literal, etc.)
            # Validações
    )

    # Validar e converter para objeto Vegetables
    vegetables = Vegetables.model_validate_json(response.message.content)
        # Aqui pode haver um tratamento de erros try/except para seguranca

    # Retornar como JSON
    return jsonify(vegetables.dict())

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'ollama.html')

if __name__ == '__main__':
    app.run(debug=True)



# curl -X POST http://localhost:5000/ask \
#      -H "Content-Type: application/json" \
#      -d '{"message": "Tell me about Vegetables."}'