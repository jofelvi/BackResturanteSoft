const express = require('express')
const admin = require('firebase-admin')

let serviceAccount = require('./credenciales.json');

//firebase.initializeApp(serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce-pokefish.firebaseio.com"
})

const db = admin.firestore()

module.exports = { db , admin}
