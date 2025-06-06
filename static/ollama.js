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

                    <h1>${respjson.nome}</h1>
                    
                    <div class="campo">
                    <p class="title">TIPO</p>
                    <p class="resp">${respjson.tipo}</p>
                    </div>
                    
                    <div class="campo">
                    <p class="title">ORIGEM</p>
                    <p class="resp">${respjson.origem}</p>
                    </div>
                    
                    <div class="campo">
                    <p class="title">ESTACAO</p>
                    <p class="resp">${respjson.sazonalidade}</p>
                    </div>
                    
                    <div class="campo">
                    <p class="title">TEMPO DE CRESCIMENTO</p>
                    <p class="resp">${respjson.mesesdecrescimento}</p>
                    </div>
                    
                    <div class="campo">
                    <p class="title">SABOR</p>
                    <p class="resp">${respjson.sabor}</p>
                    </div>
                    
                    <div class="campo">
                    <p class="title">VITAMINAS</p>
                    <p class="resp">${respjson.vitaminas}</p>
                    </div>
                </div>
                `
                document.getElementById("resposta").innerHTML = composta
            });
            //.catch(console.error());
        });