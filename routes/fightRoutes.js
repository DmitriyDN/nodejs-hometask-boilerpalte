const { Router } = require("express");
const FightService = require("../services/fightService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFightValid,
} = require("../middlewares/fight.validation.middleware");

const router = Router();

router.get("/", FightService.getFights, responseMiddleware);
router.post("/", createFightValid, FightService.postFight, responseMiddleware);
router.delete("/:id", FightService.deleteFight, responseMiddleware);

// OPTIONAL TODO: Implement route controller for fights

module.exports = router;
