import AbsensiModel from "../models/absensiModel.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
	const absensi = await AbsensiModel.findAll();

	res.status(200).json({
		absensi: absensi,
		metadata: "get all absensi",
	});
});

router.post("/checkin", async (req, res) => {
	const { nip } = req.body;

	const absensi = await AbsensiModel.create({
		users_nip: nip,
		status: "in",
	});

	res.status(200).json({
		data: absensi,
		metadata: "sukses checkin",
	});
});

router.post("/checkout", async (req, res) => {
	const { nip } = req.body;

	const absensi = await AbsensiModel.create({
		users_nip: nip,
		status: "out",
	});

	res.status(200).json({
		data: absensi,
		metadata: "sukses cehckout",
	});
});

export default router;
