const Sequelize =  require("sequelize");
const UsersModels = require("../models/Users");
const StoresModels = require("../models/Stores");

const sequelize = new Sequelize(
    'heroku_b90201ee0ffb036',
    'b8062050715171',
    '34fd35be',
    {
        host:'eu-cdbr-west-01.cleardb.com',
        dialect:'mysql',
        pool:{
            max:5,
            min:0,
            require:3000,
            idle: 1000
        }
    }
)

const Users = UsersModels(sequelize, Sequelize)
const Stores = StoresModels(sequelize, Sequelize)

Stores.hasMany(Users, {foreignKey: 'userId', sourceKey: 'id'})
Users.belongsTo(Stores, {foreignKey: 'userId', sourceKey: 'id'})


sequelize.sync({force: false}).then(()=>{
    console.log("tablas sincronizadas")
}).catch((e)=>{
    console.log("error")
})

async function connec () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connec()

module.exports = {
    Users,
    Stores
}