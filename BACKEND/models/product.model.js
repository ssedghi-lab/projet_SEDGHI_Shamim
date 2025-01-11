module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        libelle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prix: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'products',
        timestamps: true
    });

    return Product;
};