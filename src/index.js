const express = require('express'); //importa a biblioteca express pro arquivo
const app = express();              //chama o express
const port = 8080;                  //atribui a porta do servidor
app.use(express.json());            //para reconhecer json

app.get("/", function(req, res) {
    res.send("Minha primeira requisição");
});

app.get("/com-parametros", function(req, res) {
    if (req.query.nome === "Laoma") {
        res.send("Laoma chamou requisição");
    }
    res.send("Com parâmetros funciona! Sabadou!" + req.query.nome + req.query.sobrenome);
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Meu post funciona!");
})

app.put("/:id", (req, res) => {
    console.log(req.body, req.params.id);
    res.send("Meu put funciona!" + req.params.id);
})

app.delete("/:id", (req, res) => {
    console.log(req.params.id);
    res.send("Meu delete funciona!" + req.params.id);
})

app.listen(port, function() {       //vincula e ouve as conexões no host e na porta especificados
    console.log(`Servidor conectado na porta: ${port}`);
});