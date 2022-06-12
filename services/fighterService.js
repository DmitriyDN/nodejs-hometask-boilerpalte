const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  // TODO: Implement methods to work with fighters
  getFighters(req, res) {
    const fighters = FighterRepository.getAll();
    return res.json(fighters);
  }
  getFighter(req, res) {
    const { id } = req.params;
    const fighter = FighterRepository.getOne({ id });
    if (!fighter) {
      return res.json({ message: "User with id " + id + " not exist" });
    }
    return res.json(fighter);
  }

  postFighter(req, res) {
    const { name, health, power, defense } = req.body;
    const findByName = FighterRepository.getOne({ name });

    if (findByName) {
      return res.json({ message: "Fighter with this name is exist" });
    }

    const newFighter = FighterRepository.create({
      name,
      health,
      power,
      defense,
    });

    return res.json(newFighter);
  }

  updateFighter(req, res) {
    const { id } = req.params;
    const data = req.body;
    const fighter = FighterRepository.getOne({ id });
    if (!fighter) {
      return res.json({ message: "Fighter with this id not exist" });
    }
    const updatedFighter = FighterRepository.update(id, data);
    return res.json({
      message: "Data is successfully updated",
      updatedFighter,
    });
  }

  deleteFighter(req, res) {
    const { id } = req.params;
    const fighter = FighterRepository.getOne({ id });
    if (!fighter) {
      return res.json({ message: "Fighter with this id not exist" });
    }
    const deletedFighter = FighterRepository.delete(id);
    return res.json({
      message: "Data is successfully deleted",
      deletedFighter,
    });
  }
}

module.exports = new FighterService();
