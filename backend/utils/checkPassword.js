import bcrypt from "bcrypt";
import UsersModel from "../models/usersModel.js";

const encrypted = async (nip, password) => {
	const userData = await UsersModel.findOne({ where: { nip: nip } });
	const compare = await bcrypt.compare(password, userData.password);

	return { compare, userData };
};

export default encrypted;
