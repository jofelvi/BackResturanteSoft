const express = require('express');
const {db} = require("../DbConnect");
const router = express.Router();
const cors = require('cors')
const jwt = require("jsonwebtoken");
const rutasProtegidas = require("../middleware/ProtectRoute");
require('dotenv').config()

router.post("/api/login",  async (req, res ,next)=>{

    try {
        const payload = {
            check:  true,
            role: "admin",
            nombre: "jonathan",
            UserId: "124552"
        };
        const token = jwt.sign(payload, process.env.KEYTOKEN, {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    }catch(e){
        console.log("error", e)
        return res.status(500).json({ "error": e})
    }

  /*  if(req.body.email !== "" && req.body.password !== "") {
        await db.collection("Users").where("email", "==", req.body.email ).where( "password", "==" ,req.body.password)

        const payload = {
            check:  true,
            role: "admin",
            nombre: "jonathan",
            UserId: "124552"
        };
        const token = jwt.sign(payload, process.env.KEYTOKEN, {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }*/
})

module.exports = router