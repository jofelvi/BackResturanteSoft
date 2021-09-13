
module.exports = (sequelize, type) => {

    return sequelize.define('mesas', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        sector: {
            type: type.STRING,
            allowNull: false,
        },
        comenzales: {
            type: type.INTEGER,
            allowNull: false,
        },
        storeId: {
            type: type.INTEGER,
            allowNull: false,
        },
        numberTable: {
            type: type.INTEGER,
            unique: true,
        },
        active: {
            type: type.BOOLEAN,
            defaultValue: true
        },
        timeFrom: {
            type: type.DATE,
        }
    }
)
}


