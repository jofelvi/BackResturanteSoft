import jwt from "jsonwebtoken";
import moment from "moment";

const checkToken = (req, res, next)=>{

    if (!req.headers['access-token']){
        res.json({ mensaje: "Falta ingresar acdes token"})
    }

    const token = req.headers['access-token']
    let payload = {}

    try {
        payload = jwt.decode(token,  process.env.KEYTOKEN)
    } catch(e){
        return res.json({ mensaje: "Token invalido"})
    }

    if(payload.expiredAt < moment().unix()){
        return res.json({ mensaje: "Token a expirado"})
    }

    req.usuarioId = payload.usuarioId

    next()
}

const getIdByToken = (req)=>{

    const token = req.headers['access-token']
    let payload = jwt.decode(token,  process.env.KEYTOKEN)
    console.log("decode token", payload)
    return payload.UserId
}

module.exports = {
    checkToken:checkToken,
    getIdByToken: getIdByToken
}

