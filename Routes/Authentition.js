const express = require('express');
const {db} = require("../DbConnect");
const router = express.Router();
const cors = require('cors')
const jwt = require("jsonwebtoken");
const rutasProtegidas = require("../middleware/ProtectRoute");
require('dotenv').config()

router.post("/api/login",  async (req, res ,next)=>{
    if(req.body.usuario === "admin" && req.body.contrasena === "1234") {
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
    }
})

module.exports = router