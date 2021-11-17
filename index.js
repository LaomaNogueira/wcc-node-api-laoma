const express = require('express'); //importa a biblioteca express pro arquivo
const app = express();              //chama o express
const port = 8080;                  //atribui a porta do servidor
app.use(express.json());            //para reconhecer json

app.listen(port, function() {       //vincula e ouve as conexões no host e na porta especificados
    console.log(`Servidor conectado na porta: ${port}`);
});