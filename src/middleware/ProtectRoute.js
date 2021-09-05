const express = require("express");
const jwt = require("jsonwebtoken");
const rutasProtegidas = express.Router();
require('dotenv').config()


rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, process.env.KEYTOKEN, (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
});

module.exports = rutasProtegidas