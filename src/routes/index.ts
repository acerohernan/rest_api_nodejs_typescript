import express from "express";

import user from "./user.routes";
import auth from "./auth.routes";

const router = express.Router();

router.use("/api/users", user);
router.use(auth);

export default router;
