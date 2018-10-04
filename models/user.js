
// npm/file linking
const bcrypt = require("bcrypt-nodejs");

// Determines the number of times the pass is hashed. Changing this will invalidate old passwords
// Do not change this
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

	// Used to check if the unhashed password is the same as the hashed one
	User.prototype.validPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	// Hashes the password before being put in the db
	User.hook("beforeCreate", (user) => {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(saltRounds), null);
	});

	return User;
};