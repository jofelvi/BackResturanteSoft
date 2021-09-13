import {Mesas, Stores,} from "../database/database";
import {getStoreIdByToken} from "../middleware/CheckToken";
const express = require('express');
const router = express.Router();
const rutasProtegidas = require("../middleware/ProtectRoute");
const {check, validationResult} = require('express-validator');
const chalk = require('chalk');
const log = console.log;

router.post("/api/mesas",
    [
        check('sector', 'El sector es obligatorio').not().notEmpty(),
        check('comenzales', 'comenzales es obligatorio').not().notEmpty(),
        check('numberTable', 'El numero de mesa es obligatorio').not().notEmpty(),
    ],
    async (req, res, next) => {

        const {sector, comenzales ,numberTable } = req.body
        let storeId = getStoreIdByToken(req)
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(422).json({"errors": errors.array()})
        }
        log(chalk.red("previo al try", storeId))
        try {
            await Mesas.create({
                sector: sector,
                comenzales: comenzales,
                storeId: storeId,
                numberTable: numberTable
            }).then( async (mesasCreated) => {
                log(chalk.green("Mesa creada exitosamente", storeId))
                return res.status(200).json(mesasCreated)
            }).catch((e) => {
                console.log("error al Crear  Mesas", e)
                return res.status(200).json({"Error": e})
            })
        } catch (e) {
            console.log("error", e)
            return res.status(500).json({"error": e})
        }
    });


router.get("/api/mesa", rutasProtegidas, (req, res) => {
    (async () => {

        let storerId = getStoreIdByToken(req)

        try {
            await Mesas.findAll({
                where: {
                    storeId: storerId,
                }
            }).then((rows) => {
                if (rows !== null) {
                    return res.status(200).send({Mesas: rows, counts: rows.length});
                } else {
                    return res.status(200).send({"payload": "id Mesas No encontrado"});
                }
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

router.get("/api/mesasAll",
    rutasProtegidas,
    async (req, res) => {

    try {
        await Mesas.findAll().then((rows) => {
            if (rows !== null) {
                return res.status(200).send({Mesas: rows, count: rows.length });
            } else {
                return res.status(200).send({"payload": "id No encontrado"});
            }
        })
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.put("/api/mesas", rutasProtegidas,
    [
        check('sector', 'El sector es obligatorio').not().notEmpty(),
        check('comenzales', 'comenzales es obligatorio').not().notEmpty(),
        check('numberTable', 'El numero de mesa es obligatorio').not().notEmpty(),
    ],
    async (req, res) => {
    try {
        const {sector, comenzales ,numberTable, id } = req.body
        //let userId = getIdByToken(req)
        let storeId = getStoreIdByToken(req)

        let userUpdate = await Mesas.update({
            sector: sector,
            comenzales: comenzales,
            storeId: storeId,
            numberTable: numberTable
        },{
            where: {
                id: id
            }
        })
        return res.status(200).json({"menssage": "Actualizado exitosamente", "objeto": userUpdate})

    } catch (error) {
        return res.status(500).json({error: error});
    }
});

router.delete("/api/mesa/:mesa_id", rutasProtegidas, async (req, res) => {
    const {mesa_id} = req.params
    if (!mesa_id) {
        return {msg: 'Id no especificado..'};
    }
    try {
        await Mesas.destroy({
            where: {
                id: mesa_id
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

router.delete("/api/mesas/", rutasProtegidas,
    check('ids', 'El Id es obligatorio').not().notEmpty()
    ,async (req, res) => {

    const {ids} = req.body
    if (!ids) {
        return {msg: 'Ids no especificado..'};
    }
    try {
        await Mesas.destroy({
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
