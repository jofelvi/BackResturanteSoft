const express = require('express')
require('dotenv').config()

//creacion del servidor
const app = express()
app.set('llave', process.env.KEYTOKEN);

app.use(express.json())
app.use(require('./Routes/Usuarios'));
app.use(require('./Routes/Authentition'));

let port = process.env.PORT || 9000;
app.set('port', port);

app.listen(port, () => console.log(`Server Node ${port}`));

