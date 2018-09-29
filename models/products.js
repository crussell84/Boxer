module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        itemName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reorderThreshold: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sellPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        costToGet: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        currentlyUsed: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },

    }, {
        paranoid: true
    });

    Product.associate  = function(models) {
        Product.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Product;
};
