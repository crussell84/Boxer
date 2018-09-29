module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the Author model a name of type STRING
      userToken: DataTypes.STRING
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