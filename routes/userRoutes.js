const {
    Router
} = require('express');
const UserService = require('../services/userService');
const {
    createUserValid,
    updateUserValid
} = require('../middlewares/user.validation.middleware');
const {
    responseMiddleware
} = require('../middlewares/response.middleware');

const router = Router();

router.post('/', (req, res, next) => {
    try {
        return createUserValid(req, res, next);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/', (req, res, next) => {
    try {
        const result = UserService.search('fighters');
        res.send(result);
    } catch (err) {
        res.err = err;
        console.log(err);
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const result = UserService.delete(req.id);
        res.send(result);
    } catch (err) {
        res.err = err;
        console.log(err);
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const result = UserService.search(req.id);
        res.send(result);
    } catch (err) {
        res.err = err;
        console.log(err);
    } finally {
        next();
    }
}, responseMiddleware);
// TODO: Implement route controllers for user

module.exports = router;