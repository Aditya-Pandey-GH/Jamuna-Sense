import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
	{
		reportedBy: {
			type: String,
			required: true,
			trim: true,
		},
		reporterEmail: {
			type: String,
			required: true,
			trim: true,
		},
		issueType: {
			type: String,
			required: true,
			trim: true,
		},
		multimedia: {
			type: String,
			required: true,
			trim: true,
		},
		location: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			// required: true,
			trim: true,
		},
		resolved: {
			type: Boolean,
			required: true,
			default: false,
			// enum: ["pending", "resolved"],
			// default: "pending",
		},
	},
	{ timestamps: true },
);

export const Report = mongoose.model("Report", reportSchema);
