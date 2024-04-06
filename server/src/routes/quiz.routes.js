import { Router } from "express";
import { getquestions, submitAnswer } from "../controllers/quiz.js";
const router = Router();

// single route "/" for get and post request
router.route("/").get(getquestions).post(submitAnswer);

export default router;
