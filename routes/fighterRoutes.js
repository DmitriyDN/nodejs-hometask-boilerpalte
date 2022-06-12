const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

router.get("/", FighterService.getFighters);
router.get("/:id", FighterService.getFighter);
router.post("/", createFighterValid, FighterService.postFighter);
router.put("/:id", updateFighterValid, FighterService.updateFighter);
router.delete("/:id", FighterService.deleteFighter);

// TODO: Implement route controllers for fighter

module.exports = router;
