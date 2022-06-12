const { user } = require("../models/user");
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  const body = req.body;
  console.log(user);
  for (key in user) {
    if (key === "id") continue;
    if (!body.hasOwnProperty(key)) {
      return res.json({ message: key + " is not exist" });
    }
  }
  if (body.password.length <= 3) {
    return res.json({ message: "password length is too small" });
  }
  const emailCheck = /(.)+@gmail\.com$/gm;
  const phoneCheck = /\+380(\d){9}$/gm;
  if (!emailCheck.test(body.email)) {
    return res.json({ message: "email must be from gmail.com" });
  }
  if (!phoneCheck.test(body.phoneNumber)) {
    return res.json({ message: "phone number must be like +380XXXXXXXXX" });
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
