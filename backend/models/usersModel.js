import { DataTypes } from "sequelize";
import db from "../database.config.js";

const Users = db.define("Users", {
	nip: {
		type: DataTypes.INTEGER,
		unique: true,
	},
	nama: {
		type: DataTypes.STRING,
	},
	password: {
		type: DataTypes.STRING,
	},
});

export default Users;
