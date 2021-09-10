import {Stores, Users} from "../database/database";
import {getIdByToken} from "../middleware/CheckToken";
import sequelize from "sequelize";
const express = require('express');
const router = express.Router();
const rutasProtegidas = require("../middleware/ProtectRoute");
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const { QueryTypes } = require('sequelize');

router.post("/api/stores",
    [
        check('name', 'El nombre es obligatorio').not().notEmpty(),
        check('owner', 'El Dueño es obligatorio').not().notEmpty(),
    ],
    async (req, res, next) => {

        const {name, owner} = req.body
        let userId = getIdByToken(req)
        console.log("id usuario del store", req.usuarioId)
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(422).json({"errors": errors.array()})
        }
        const Creator = Stores.hasMany(Users, {foreignKey: 'userId', sourceKey: 'id'})

        try {
            await Stores.create({
                name: name,
                owner: owner,
                userId: [{
                    id: userId
                }]},{
                include: [ Creator ]
            }).then( async (storeCreated) => {
                return res.status(200).json(storeCreated)
            }).catch((e) => {
                console.log("error al guardar storeCreated", e)
                return res.status(200).json({"Error": e})
            })
        } catch (e) {
            console.log("error", e)
            return res.status(500).json({"error": e})
        }
    });


router.get("/api/stores", rutasProtegidas, (req, res) => {
    (async () => {
        let Id = getIdByToken(req)
        try {
            await Stores.findAll({
                where: {
                    userId: Id,
                },

            }).then((rows) => {
                if (rows !== null) {
                    return res.status(200).send({stores: rows, idUser: Id});
                } else {
                    return res.status(200).send({"payload": "id No encontrado"});
                }
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

router.get("/api/storesAll",
    rutasProtegidas,
    async (req, res) => {
    try {
        const users = await Stores.findAll()
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.put("/api/stores", rutasProtegidas,
    [
        check('name', 'El nombre es obligatorio').not().notEmpty(),
        check('owner', 'El Dueño es obligatorio').not().notEmpty(),
        check('id', 'El Id es obligatorio').not().notEmpty(),
    ],
    async (req, res) => {
    try {
        const {name, owner, id} = req.body
        let userId = getIdByToken(req)

        let userUpdate = await Stores.update({
            name: name,
            owner: owner,
            //userId: userId
        }, {
            where: {
                id: id
            }
        })

        return res.status(200).json({"menssage": "Actualizado exitosamente", "objeto": userUpdate})

    } catch (error) {
        return res.status(500).json({error: error});
    }
});

router.delete("/api/store/:store_id", rutasProtegidas, async (req, res) => {
    const {store_id} = req.params
    if (!store_id) {
        return {msg: 'Id no especificado..'};
    }
    try {
        await Stores.destroy({
            where: {
                id: store_id
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

router.delete("/api/stores/", rutasProtegidas,
    check('ids', 'El Id es obligatorio').not().notEmpty()
    ,async (req, res) => {

    const {ids} = req.body
    if (!ids) {
        return {msg: 'Ids no especificado..'};
    }
    try {
        await Stores.destroy({
            where: {
                id: ids
            }
        }).then(function (deletedRecord) {
            if (deletedRecord >= 1) {
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


/*
await Stores.findOne({
    include:[{
        model: Users,
        where:{"userId": userId }
    }]
}).then((rows) => {
    if (rows !== null) {
        return res.status(200).send(rows);
    } else {
        return res.status(200).send({"payload": "id No encontrado"});
    }
})
*/
