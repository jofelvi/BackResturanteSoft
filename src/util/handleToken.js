import jwt from "jsonwebtoken";
import moment from "moment";
require('dotenv').config()

export  const createToken = (user) => {

    let res

    const payload = {
        role: user.role,
        nombre: user.name,
        UserId: user.id,
        storeId: user.storeId
    };
    const token = jwt.sign(payload, process.env.KEYTOKEN, {
        expiresIn: 1440
    });
    res = {
        mensaje: 'Autenticación correcta',
        token: token
    };

    return res
}

