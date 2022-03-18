import express from "express";
import {
  createUserHandler,
  verifyUserHandler,
} from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema, verifyUserSchema } from "../schema/user.schema";

const router = express.Router();

router.get("", (req, res) => res.send("Users Array"));
router.post("", validateResource(createUserSchema), createUserHandler);
router.post(
  "/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

export default router;
