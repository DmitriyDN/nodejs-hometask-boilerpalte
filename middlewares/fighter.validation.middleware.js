const { fighter } = require("../models/fighter");
const { ApiError } = require("./response.middleware");

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  const body = req.body;

  for (key in fighter) {
    if (key === "id") continue;
    if (!body.hasOwnProperty(key)) {
      if (key === "health") {
        req.body.key = fighter.key;
      } else {
        return next(ApiError.validationError(key + " is not exist"));
      }
    }
    if (body.power < 1 || body.power > 100) {
      return next(
        ApiError.validationError("power must be bigger 1 and smaller than 100")
      );
    }
    if (body.health < 80 || body.health > 120) {
      return next(
        ApiError.validationError(
          "health must be bigger 80 and smaller than 120"
        )
      );
    }
    if (body.defense < 1 || body.defense > 10) {
      return next(
        ApiError.validationError("defense must be bigger 1 and smaller than 10")
      );
    }
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  const body = req.body;
  for (key in fighter) {
    if (body.hasOwnProperty(key)) next();
  }
  return next(
    ApiError.validationError("No one property is not added to update")
  );
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
