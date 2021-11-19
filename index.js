const express = require('express'); //importa a biblioteca express pro arquivo
const app = express();              //chama o express
const port = 8080;                  //atribui a porta do servidor
app.use(express.json());            //para reconhecer json

app.get("/", (req, res) => {
    res.send("Dasa Educa - Artigos");
});

const database = require("./models");
database.sequelizeDatabase.sync();
// database.sequelizeDatabase.sync({ force: true }).then(() => { //força a sincronização do BD do zero, não pode usar quando já tiver registro
//     console.log("Drop and re-sync db.");
// });

const router = require("./routes/artigos.routes");
router(app);

app.listen(port, function() {       //vincula e ouve as conexões no host e na porta especificados
    console.log(`Servidor conectado na porta: ${port}`);
});