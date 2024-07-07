import express from "express";
import authrouter from "./routes/auth.route";
import messagerouter from "./routes/message.route";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use("/api/auth", authrouter);
app.use("/api/message", messagerouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
