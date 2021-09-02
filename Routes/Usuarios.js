const express = require('express');
const {db} = require("../DbConnect");
const router = express.Router();
const cors = require('cors')
const rutasProtegidas = require("../middleware/ProtectRoute");

router.post("/api/usuario", rutasProtegidas ,  async (req, res ,next)=>{

   try {
       await db.collection("Users")
           .doc("/" + req.body.id + "/")
           .create({
               id: req.body.id,
               name: req.body.name
           })

       return res.status(200).json({ "menssage": "ok"})
   }catch(e){
       console.log("error", e)
       return res.status(500).json({ "error": e})
   }
})

router.get("/api/usuario/:usuario_id", rutasProtegidas ,(req, res) => {
    (async () => {
        try {
            const doc = db.collection("Users").doc(req.params.usuario_id);
            const item = await doc.get();
            const response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

router.get("/api/usuarios", rutasProtegidas , async (req, res) => {
    try {
        let query = db.collection("Users");
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;

        const response = docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
        }));

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.put("/api/usuario/:usuario_id",rutasProtegidas , async (req, res) => {
    try {
        const document = db.collection("Users").doc(req.params.usuario_id);
        await document.update({
            name: req.body.name,
        });
        return res.status(200).json({ "menssage": "Actualizado exitosamente"})
    } catch (error) {
        return res.status(500).json({error: error});
    }
});

router.delete("/api/usuario/:usuario_id",rutasProtegidas ,  async (req, res) => {
    try {
        const doc = db.collection("Users").doc(req.params.usuario_id);
        await doc.delete();
        return res.status(200).json({ "menssage": "Borrado exitosamente"})
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router