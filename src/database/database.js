const Sequelize =  require("sequelize");
const UsersModels = require("../models/Users");
const StoresModels = require("../models/Stores");
const MesasModels = require("../models/Mesas");
const CustomersModels = require("../models/Customers");
const chalk = require('chalk');
const log = console.log;

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
        },
        logging: false
    }
)

const Users = UsersModels(sequelize, Sequelize)
const Stores = StoresModels(sequelize, Sequelize)
const Mesas = MesasModels(sequelize, Sequelize)
const Customers = CustomersModels(sequelize, Sequelize)

Stores.hasMany(Users, {foreignKey: 'userId', sourceKey: 'id'})
Users.belongsTo(Stores, {foreignKey: 'storeId', sourceKey: 'id'})
Mesas.belongsTo(Stores, {foreignKey: 'storeId', sourceKey: 'id'})
Mesas.belongsTo(Stores, {foreignKey: 'storeId', sourceKey: 'id'})
Customers.belongsTo(Stores, {foreignKey: 'storeId', sourceKey: 'id'})

sequelize.sync({force: false}).then(()=>{
    log(chalk.yellow("Tablas sincronizadas"))
}).catch((e)=>{
    log(chalk.red("Error en la creacion de tablas"))
})

async function connec () {
    try {
        await sequelize.authenticate();
        log(chalk.green("Connection has been established successfully."))
    } catch (error) {
        log(chalk.red("Unable to connect to the database", error))
    }
}
connec()

module.exports = {
    Users,
    Stores,
    Mesas,
    Customers
}