import {Stores, Customers} from "../database/database";
import {getIdByToken, getStoreIdByToken} from "../middleware/CheckToken";
const express = require('express');
const router = express.Router();
const rutasProtegidas = require("../middleware/ProtectRoute");
const {check, validationResult} = require('express-validator');
const chalk = require('chalk');
const log = console.log;

router.post("/api/customer",
    [
        check('name', 'El nombre es obligatorio').not().notEmpty(),
        check('lastName', 'El Apellido es obligatorio').not().notEmpty(),
        check('phone', 'El password es obligatorio').not().notEmpty(),
        check('rolId', 'El rol es obligatorio').not().notEmpty(),
        check('email', 'El email es obligatorio y debe tener un formato valido').isEmail().notEmpty(),
        check('address', 'La address es obligatorio').not().notEmpty(),
        check('city', 'La city es obligatorio').not().notEmpty(),
        check('codePostal', 'El codePostal es obligatorio').not().notEmpty(),
        check('notes', 'notes es obligatorio').not().notEmpty(),
        check('dni', 'dni es obligatorio').not().notEmpty(),
    ],
    async (req, res, next) => {

        const {name, lastName, phone,rolId, email, address, city, codePostal , notes, dni} = req.body
        let storeId = getStoreIdByToken(req)

        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(422).json({"errors": errors.array()})
        }

        try {
            await Customers.create({
                name: name,
                lastName: lastName,
                phone: phone,
                rolId: rolId,
                email: email,
                address: address,
                city: city,
                codePostal: codePostal,
                notes: notes,
                storeId: storeId,
                dni: dni
            }).then( async (storeCreated) => {
                log(chalk.green("Customer Creado Exitosamente", storeId))
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


router.get("/api/customer/:id_customer", rutasProtegidas, (req, res) => {
    (async () => {
        let Id = getIdByToken(req)
        const { id_customer } = req.params

        try {
            await Customers.findOne({
                where: {
                    id: id_customer
                }
            }).then((rows) => {
                if (rows !== null) {
                    log(chalk.green("Customer obtenido Exitosamente"))
                    return res.status(200).send({Customer: rows, idUser: Id});
                } else {
                    return res.status(200).send({"payload": "id No encontrado"});
                }
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

router.get("/api/customerAll",
    rutasProtegidas,
    async (req, res) => {
    try {
        const users = await Customers.findAll()
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.put("/api/customer/:id_customer", rutasProtegidas,
    [
        check('name', 'El nombre es obligatorio').not().notEmpty(),
        check('lastName', 'El Apellido es obligatorio').not().notEmpty(),
        check('phone', 'El password es obligatorio').not().notEmpty(),
        check('rolId', 'El rol es obligatorio').not().notEmpty(),
        check('email', 'El email es obligatorio y debe tener un formato valido').isEmail().notEmpty(),
        check('address', 'La address es obligatorio').not().notEmpty(),
        check('city', 'La city es obligatorio').not().notEmpty(),
        check('codePostal', 'El codePostal es obligatorio').not().notEmpty(),
        check('notes', 'notes es obligatorio').not().notEmpty(),
        check('dni', 'dni es obligatorio').not().notEmpty(),
    ],
    async (req, res) => {

    const { id_customer } = req.params

    try {
        const {name, lastName, phone,rolId, email, address, city, codePostal , notes, dni, id} = req.body
        let storeId = getStoreIdByToken(req)

        let customersUpdate = await Customers.update({
            name: name,
            lastName: lastName,
            phone: phone,
            rolId: rolId,
            email: email,
            address: address,
            city: city,
            codePostal: codePostal,
            notes: notes,
            storeId: storeId,
            dni: dni
        }, {
            where: {
                id: id
            }
        })
        return res.status(200).json({"menssage": "Actualizado exitosamente", "customersUpdate": customersUpdate})

    } catch (error) {
        return res.status(500).json({error: error});
    }
});

router.delete("/api/customer/:customer_id", rutasProtegidas, async (req, res) => {
    const {customer_id} = req.params
    if (!customer_id) {
        return {msg: 'Id no especificado..'};
    }
    try {
        await Customers.destroy({
            where: {
                id: customer_id
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

router.delete("/api/customer/", rutasProtegidas,
     check('ids', 'El Id es obligatorio').not().notEmpty()
    ,async (req, res) => {

    const {ids} = req.body
    if (!ids) {
        return {msg: 'Ids no especificado..'};
    }
    try {
        await Customers.destroy({
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
