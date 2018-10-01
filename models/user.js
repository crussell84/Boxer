module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        paranoid: true,
        timestamps: true
    });
  
    User.associate = function(models) {
      User.hasMany(models.Product, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };