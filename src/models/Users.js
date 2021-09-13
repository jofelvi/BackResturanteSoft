module.exports = (sequelize, type) => {

    return sequelize.define('user', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },
            name: {
                type: type.STRING,
            },
            email: {
                type: type.STRING,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            lastName: {
                type: type.STRING,
            },
            password: {
                type: type.STRING,
            },
            role: {
                type: type.STRING,
            },
            storeId: {
                type: type.INTEGER,
            }
        }
    )
}