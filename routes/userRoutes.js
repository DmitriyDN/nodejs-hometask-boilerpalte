const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.get("/", UserService.getUsers);
router.get("/:id", UserService.getUser);
router.post("/", UserService.postUser);
router.put("/:id", UserService.updateUser);
router.delete("/:id", UserService.deleteUser);

// TODO: Implement route controllers for user

module.exports = router;
