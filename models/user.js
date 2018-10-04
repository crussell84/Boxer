const bcrypt = require("bcrypt-nodejs")

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

    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
    };

    User.hook("beforeCreate", function(user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
  
    return User;
  };