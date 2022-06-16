const { ApiError } = require("./response.middleware");
const { fight } = require("../models/fight");

const createFightValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  const body = req.body;

  for (key in fight) {
    if (key === "id") continue;
    if (!body.hasOwnProperty(key)) {
      return next(ApiError.validationError(key + " is not exist"));
    }
  }
  if (body.fighter1Shot < 0 || body.fighter2Shot < 0) {
    return next(ApiError.validationError("Shots must be bigger 0 or equal 0"));
  }
  if (
    body.fighter1Health < 0 ||
    body.fighter1Health > 100 ||
    body.fighter2Health < 0 ||
    body.fighter2Health > 100
  ) {
    return next(
      ApiError.validationError(
        "health must be bigger 0 or equal and smaller than 100"
      )
    );
  }

  next();
};

exports.createFightValid = createFightValid;
