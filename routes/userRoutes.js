const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.get("/", UserService.getUsers, responseMiddleware);
router.get("/:id", UserService.getUser, responseMiddleware);
router.post("/", createUserValid, UserService.postUser, responseMiddleware);
router.put("/:id", updateUserValid, UserService.updateUser, responseMiddleware);
router.delete("/:id", UserService.deleteUser, responseMiddleware);

// TODO: Implement route controllers for user

module.exports = router;
