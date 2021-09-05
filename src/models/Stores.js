const UsersModels = require("./Users");

module.exports = (sequelize, type) => {

    return sequelize.define('stores', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        owner: {
            type: type.STRING,
            allowNull: false,
        },
        userId: {
            type: type.INTEGER,
            allowNull: false,
        }
    }
    )
}

//StoresModels.hasMany(UsersModels, {foreignKey: 'userId', sourceKey: 'id'})
//Users.belongsTo(StoresModels, {foreignKey: 'userId', sourceKey: 'id'})
