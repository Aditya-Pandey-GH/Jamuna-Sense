import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
	try {
		const conn = await mongoose.connect(mongoUri);

		console.log(`MongoDB ✅`);
	} catch (error) {
		console.error("MongoDB ❌");
		console.error(error.message);
		process.exit(1);
	}
};
