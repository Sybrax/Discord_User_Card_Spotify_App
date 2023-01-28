const router = require("express").Router();
const AuthRouter = require("@src/routers/auth.router");
const GeneralRouter = require("@src/routers/general.router");
const { checkProcessEnv } = require("@src/middlewares/check.config");

const authRouter = new AuthRouter();
const generalRouter = new GeneralRouter();

router.use("/", checkProcessEnv, authRouter.router);
router.use("/", checkProcessEnv, generalRouter.router);

module.exports = router;
