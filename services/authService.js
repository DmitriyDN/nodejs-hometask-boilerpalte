const { UserRepository } = require("../repositories/userRepository");

class AuthService {
  login(req, res) {
    const { email, password } = req.body;
    const user = UserRepository.getOne({ email, password });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    return res.json(user);
  }
}

module.exports = new AuthService();
