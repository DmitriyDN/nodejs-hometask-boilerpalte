const { user } = require("../models/user");
const { ApiError } = require("./response.middleware");
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  const body = req.body;

  for (key in user) {
    if (key === "id") continue;
    if (!body.hasOwnProperty(key)) {
      return next(ApiError.validationError(key + " is not exist"));
    }
  }
  if (body.password.length <= 3) {
    return next(ApiError.validationError("password length is too small"));
  }
  const emailCheck = /(.)+@gmail\.com$/gm;
  const phoneCheck = /\+380(\d){9}$/gm;
  if (!emailCheck.test(body.email)) {
    return next(ApiError.validationError("email must be from gmail.com"));
  }
  if (!phoneCheck.test(body.phoneNumber)) {
    return next(
      ApiError.validationError("phone number must be like +380XXXXXXXXX")
    );
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const body = req.body;
  for (key in user) {
    if (body.hasOwnProperty(key)) next();
  }
  return next(
    ApiError.validationError("No one property is not added to update")
  );
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
