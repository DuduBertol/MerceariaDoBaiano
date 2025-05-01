var meuform = document.getElementById("mform");
        meuform.addEventListener("submit", e => {
            e.preventDefault();
            const formData = new FormData(meuform);
            const data = Object.fromEntries(formData.entries());

            fetch("http://127.0.0.1:5000/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(respjson => {

                var composta = `
                <div>
                    <p>NOME - ${respjson.nome}</p>
                    
                    <p>TIPO - ${respjson.tipo}</p>
                    
                    <p>ORIGEM - ${respjson.origem}</p>
                    
                    <p>ESTACAO - ${respjson.sazonalidade}</p>
                    
                    <p>TEMPO DE CRESCIMENTO - ${respjson.mesesdecrescimento}</p>
                    
                    <p>SABOR - ${respjson.sabor}</p>
                    
                    <p>VITAMINAS - ${respjson.vitaminas}</p>
                </div>
                `
                document.getElementById("resposta").innerHTML = composta
            });
        });