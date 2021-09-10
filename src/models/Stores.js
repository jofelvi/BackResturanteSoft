
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


