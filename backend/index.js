import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 8000;

// Connect DB then start server
connectDB(process.env.MONGO_URI).then(() => {
	app.listen(PORT, () => {
		console.log(`Server ✅ http://localhost:${PORT}`);
	});
});
