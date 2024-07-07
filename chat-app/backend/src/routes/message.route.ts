import express from "express";
import { conversation } from "../controllers/message.controller";
const router = express.Router();

router.get("/send", conversation);

export default router;
