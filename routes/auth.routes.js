const express = require("express");
const authControllers = require("../controllers/auth.controller");
const {
   protectRoute,
   authLimiter,
   validateLogin,
   validateSignup,
} = require("../middlewares/auth");

const router = express.Router();

router.use(authLimiter);

router.post("/signup", validateSignup, authControllers.handleUserSignup);

router.post("/login", validateLogin, authControllers.handleUserLogin);

router.post("/refresh-token", authControllers.handleRefreshAccessToken);

router.use(protectRoute);

router.post("/logout", authControllers.handleUserLogout);

router.put("/update", authControllers.handleUpdateUser);

router.get("/current-user", authControllers.handleGetCurrentUser);

module.exports = router;
