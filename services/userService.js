const { UserRepository } = require("../repositories/userRepository");

class UserService {
  getUsers(req, res) {
    const users = UserRepository.getAll();
    return res.json(users);
  }

  getUser(req, res) {
    const { id } = req.params;
    const user = UserRepository.getOne({ id });
    if (!user) {
      return res.json({ message: "User with id " + id + " not exist" });
    }
    return res.json(user);
  }

  postUser(req, res) {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const findByEmail = UserRepository.getOne({ email });
    const findByNumber = UserRepository.getOne({ phoneNumber });
    if (findByNumber) {
      return res.json({ message: "User with this phone number is not exist" });
    }
    if (findByEmail) {
      return res.json({ message: "User with this email is not exist" });
    }

    const newUser = UserRepository.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    return res.json(newUser);
  }

  updateUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    const user = UserRepository.getOne({ id });
    if (!user) {
      return res.json({ message: "User with this id not exist" });
    }
    const updatedUser = UserRepository.update(id, data);
    return res.json({ message: "Data is successfully updated", updatedUser });
  }

  deleteUser(req, res) {
    const { id } = req.params;
    const user = UserRepository.getOne({ id });
    if (!user) {
      return res.json({ message: "User with this id not exist" });
    }
    const deletedUser = UserRepository.delete(id);
    return res.json({ message: "Data is successfully deleted", deletedUser });
  }
}

module.exports = new UserService();
