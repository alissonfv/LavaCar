const express = require('express')
const cors = require('cors')

const app = express();
const port = 9000;
const usuariosRouter = require('./routes/usuarios')

app.use(cors());
app.use(express.json());
app.use('/usuarios', usuariosRouter);

app.listen(port, () =>{
    console.log(`O servidor esta rodadando na porta ${port}`);
});