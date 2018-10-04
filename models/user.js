const bcrypt = require("bcrypt-nodejs");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
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

	User.associate = (models) => {
		User.hasMany(models.Product, {
			onDelete: "cascade"
		});
	};

	User.prototype.validPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	User.hook("beforeCreate", (user) => {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(saltRounds), null);
	});

	return User;
};