const { ApiError } = require("../middlewares/response.middleware");
const { UserRepository } = require("../repositories/userRepository");

class AuthService {
  login(req, res, next) {
    const { email, password } = req.body;
    const user = UserRepository.getOne({ email, password });
    if (!user) {
      return next(ApiError.badRequest("User not found"));
    }
    return res.json(user);
  }
}

module.exports = new AuthService();
