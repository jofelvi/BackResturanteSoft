import express from 'express'
import morgan from 'morgan'
const middlewaresToken = require("./middleware/CheckToken")
require('dotenv').config()
require('./database/database')
//creacion del servidor

const app = express()
app.set('llave', process.env.KEYTOKEN);

app.use(express.json())
app.use(morgan("dev"))
app.use(require('./Routes/Usuarios' , middlewaresToken.checkToken));
app.use(require('./Routes/Stores' , middlewaresToken.checkToken));
app.use(require('./Routes/Mesas' , middlewaresToken.checkToken));
app.use(require('./Routes/Customers' , middlewaresToken.checkToken));
app.use(require('./Routes/Authentition'));

let port = process.env.PORT || 8000;
app.set('port', port);

app.listen(port, () => console.log(`Server Node ${port}`));

