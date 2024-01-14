const { Router } = require("express");

const { setupWalletController, getWalletDetailsController } = require("../../controllers/v1/walletController");

const router = Router();

router.post("/setup", setupWalletController);
router.get("/:id", getWalletDetailsController);

module.exports = router;
