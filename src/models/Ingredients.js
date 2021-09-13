module.exports = (sequelize, type) => {

    return sequelize.define('ingredients', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },
            storeId: {
                type: type.INTEGER,
            },
            name: {
                type: type.STRING,
                allowNull: false,
            },
            description: {
                type: type.STRING,
                allowNull: true,
            },
            categoryId: {
                type: type.STRING,
                allowNull: false,
            },
            supplierId: {
                type: type.STRING,
                allowNull: false,
            },
            formatoId: {
                type: type.STRING,
                allowNull: false,
            },
            presentation: {
                type: type.STRING,
                allowNull: true,
            },
            quantity: {
                type: type.INTEGER,
                allowNull: false,
            },
            stockMin: {
                type: type.INTEGER,
                allowNull: false,
            },
            stockMax: {
                type: type.STRING,
                allowNull: false,
            },
            active: {
                type: type.BOOLEAN,
                allowNull: true,
            },
            image: {
                type: type.STRING,
                allowNull: true,
            },
            alergenos: {
                type: type.JSON,
                allowNull: true,
            },
            priceUnit: {
                type: type.INTEGER,
                allowNull: false,
            },
        }
    )
}



