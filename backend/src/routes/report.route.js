import express from "express";
import { Report } from "../models/Report.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const reports = await Report.find();
		res.status(200).json({ success: true, reports });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const report = await Report.create(req.body);
		res.status(201).json({ success: true, report });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

export default router;
