const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

router.get("/", FighterService.getFighters, responseMiddleware);
router.get("/:id", FighterService.getFighter, responseMiddleware);
router.post(
  "/",
  createFighterValid,
  FighterService.postFighter,
  responseMiddleware
);
router.put(
  "/:id",
  updateFighterValid,
  FighterService.updateFighter,
  responseMiddleware
);
router.delete("/:id", FighterService.deleteFighter, responseMiddleware);

// TODO: Implement route controllers for fighter

module.exports = router;
