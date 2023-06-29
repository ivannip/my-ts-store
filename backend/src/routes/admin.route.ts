import { Router } from "express";
import { resetDatabase } from "../controllers/admin.controller";

const router = Router();

router.post("/init", resetDatabase);

export default router