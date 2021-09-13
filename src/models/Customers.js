
module.exports = (sequelize, type) => {

    return sequelize.define('customers', {
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
        lastName: {
            type: type.STRING
        },
        phone: {
            type: type.STRING,
        },
        email: {
            type: type.STRING,
            validate: {
                isEmail: true
            }
            },
        dni: {
            type: type.STRING,
        },
        rolId: {
            type: type.STRING,
            allowNull: false,
        },
        address: {
            type: type.STRING
        },
        city: {
            type: type.STRING
        },
        codePostal: {
            type: type.STRING
        },
        notes: {
            type: type.STRING
        },
        storeId: {
            type: type.INTEGER
        }
    }
)
}


