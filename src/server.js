import express from 'express'
import morgan from 'morgan'
import sequelize from "sequelize";
require('dotenv').config()
require('./database/database')
//creacion del servidor
const app = express()
app.set('llave', process.env.KEYTOKEN);

app.use(express.json())
app.use(morgan("dev"))
app.use(require('./Routes/Usuarios'));
app.use(require('./Routes/Authentition'));

let port = process.env.PORT || 8000;
app.set('port', port);



app.listen(port, () => console.log(`Server Node ${port}`));

