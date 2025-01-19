module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ref: {
            type: DataTypes.STRING,
            unique: true
        },
        libelle: {
            type: DataTypes.STRING
        },
        prix: {
            type: DataTypes.FLOAT
        }
    }, {
        tableName: 'products',
        timestamps: false
    });

    return Product;
};