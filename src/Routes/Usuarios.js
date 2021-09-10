import {Users} from "../database/database";
const express = require('express');
const router = express.Router();
const rutasProtegidas = require("../middleware/ProtectRoute");
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');



router.get("/api/usuario/:usuario_id", rutasProtegidas, (req, res) => {
    (async () => {
        const {usuario_id} = req.params
        try {
            await Users.findByPk(usuario_id).then((rows) => {
                if (rows !== null) {
                    return res.status(200).send(rows);
                } else {
                    return res.status(200).send({"payload": "id No encontrado"});
                }
            })

        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

router.get("/api/usuarios",
    rutasProtegidas,
    async (req, res) => {
    try {
        const users = await Users.findAll()
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.put("/api/usuario/:usuario_id", rutasProtegidas, async (req, res) => {
    try {
        const {name, lastName, role, email} = req.body
        const {usuario_id} = req.params
        req.body.password = bcrypt.hashSync(req.body.password, 10)

        let userUpdate = await Users.update({
            name: name,
            lastName: lastName,
            password: req.body.password,
            email: email,
            role: role
        }, {
            where: {
                id: usuario_id
            }
        })

        return res.status(200).json({"menssage": "Actualizado exitosamente", "objeto": userUpdate})

    } catch (error) {
        return res.status(500).json({error: error});
    }
});

router.delete("/api/usuario/:usuario_id", rutasProtegidas, async (req, res) => {
    const {usuario_id} = req.params
    if (!usuario_id) {
        return {msg: 'Id no especificado..', payload: 1};
    }
    try {
        await Users.destroy({
            where: {
                id: usuario_id
            }
        }).then(function (deletedRecord) {
            if (deletedRecord === 1) {
                return res.status(200).json({"menssage": "Borrado exitosamente"})
            } else {
                res.status(404).json({message: "Id no encontrado"})
            }
        })
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router