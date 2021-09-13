import express from 'express'
import morgan from 'morgan'
import middlewaresToken from "./middleware/CheckToken"
import dotenv from 'dotenv'
import './database/database'
dotenv.config()

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

const port = process.env.PORT || 8000;
app.set('port', port);

app.listen(port, () => console.log(`Server Node ACtive in Port ${port}`));

