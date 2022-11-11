import express from "express";
import UsersModel from "../models/usersModel.js";
import bcrypt from "bcrypt";
import passwordCheck from "../utils/checkPassword.js";
const router = express.Router();

router.get("/", async (req, res) => {
	const users = await UsersModel.findAll();

	res.status(200).json({
		data: users,
		metadata: "get all users",
	});
});

router.post("/", async (req, res) => {
	try {
		const { nip, nama, password } = req.body;
		const encryptedPassword = await bcrypt.hash(password, 10);
		const users = await UsersModel.create({
			nip,
			nama,
			password: encryptedPassword,
		});

		res.status(201).json({
			registered: users,
			metadata: "created",
		});
	} catch (error) {
		res.status(400).json({
			error: "data invalid",
		});
	}
});

router.put("/", async (req, res) => {
	try {
		const { nip, nama, password, passwordBaru } = req.body;

		const check = await passwordCheck(nip, password);
		const encryptedPassword = await bcrypt.hash(passwordBaru, 10);

		if (!check.compare) throw "data invalid";

		const users = await UsersModel.update(
			{
				nama,
				password: encryptedPassword,
			},
			{ where: { nip: nip } }
		);

		res.status(200).json({
			users: { updated: users[0] },
			metadata: "updated users",
		});
	} catch (error) {
		res.status(400).json({
			error: "invalid data",
		});
	}
});

router.post("/login", async (req, res) => {
	const { nip, password } = req.body;
	try {
		const check = await passwordCheck(nip, password);

		if (!check.compare) throw "data invalid";
		res.status(200).json({
			users: check.userData,
			metadata: "login successs",
		});
	} catch (e) {
		res.status(400).json({
			error: "data invalid",
		});
	}
});

export default router;
