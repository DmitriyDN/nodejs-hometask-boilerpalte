const { ApiError } = require("../middlewares/response.middleware");
const { FightRepository } = require("../repositories/fightRepository");

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  getFights(req, res) {
    const fights = FightRepository.getAll();
    return res.json(fights);
  }
  postFight(req, res) {
    const {
      fighter1,
      fighter2,
      fighter1Shot,
      fighter2Shot,
      fighter1Health,
      fighter2Health,
    } = req.body;
    const newFight = FightRepository.create({
      fighter1,
      fighter2,
      fighter1Shot,
      fighter2Shot,
      fighter1Health,
      fighter2Health,
    });
    return res.json(newFight);
  }
  deleteFight(req, res, next) {
    const { id } = req.params;
    const fight = FightRepository.getOne({ id });
    if (!fight) {
      return next(ApiError.badRequest("Fight with this id not exist"));
    }
    FightRepository.delete(id);
    return res.json({ message: "Fight is deleted", fight });
  }
}

module.exports = new FightersService();
