import express from "express";
import {
  createUserHandler,
  forgotPasswordHanlder,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../schema/user.schema";

const router = express.Router();

router.get("", (req, res) => res.send("Users Array"));
router.post("", validateResource(createUserSchema), createUserHandler);
router.post(
  "/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);
router.post(
  "/forgot-password",
  validateResource(forgotPasswordSchema),
  forgotPasswordHanlder
);

router.post(
  "/reset-password/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.get("/me", getCurrentUserHandler);

export default router;
