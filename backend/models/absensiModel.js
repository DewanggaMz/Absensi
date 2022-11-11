import db from "../database.config.js";
import { DataTypes } from "sequelize";

const Absensi = db.define("Absensi", {
	users_nip: {
		type: DataTypes.INTEGER,
	},
	status: {
		type: DataTypes.ENUM("in", "out"),
	},
});

export default Absensi;
