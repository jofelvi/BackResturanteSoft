const express = require('express');
const router = express.Router();
const {Users} = require("../database/database");
const bcrypt = require('bcrypt');
const moment = require('moment')
const {check} = require("express-validator");
const {validationResult} = require("express-validator");
const {createToken} = require("../util/handleToken");
require('dotenv').config()

router.post("/api/login",  async (req, res ,next)=>{
    try {
        const user = await Users.findOne({ where: {email: req.body.email}})
        if (user){
            const checKPass = bcrypt.compareSync(req.body.password, user.password)
            if (checKPass){
                let token = createToken(user)
                res.json(token)
            }else{
                res.json({ mensaje: "Contraseña incorrecta"})
            }
        }else {
            res.json({ mensaje: "Usuario incorrecto"})
        }
    }catch(e){
        console.log("error", e)
        return res.status(500).json({ "error": e})
    }
})

router.post("/api/createusuario",
    [   check('name', 'El nombre es obligatorio').not().notEmpty(),
        check('lastName', 'El Apellido es obligatorio').not().notEmpty(),
        check('password', 'El password es obligatorio').not().notEmpty(),
        check('role', 'El rol es obligatorio').not().notEmpty(),
        check('email', 'El email es obligatorio y debe tener un formato valido').isEmail().notEmpty()],
    async (req, res, next) => {

        const {name, lastName, role, email} = req.body
        req.body.password = bcrypt.hashSync(req.body.password, 10)

        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(422).json({"errors": errors.array()})
        }

        try {
            await Users.create({
                name: name,
                lastName: lastName,
                password: req.body.password,
                email: email,
                role: role
            }).then( async (userCreated) => {
                let user = createToken(userCreated)
                return res.status(200).json(user)
            }).catch((e) => {
                console.log("error al guardar", e)
                return res.status(200).json({"Error": e})
            })
        } catch (e) {
            console.log("error", e)
            return res.status(500).json({"error": e})
        }
    })

module.exports = router