const {
    Router
} = require('express');
const AuthService = require('../services/authService');
const {
    responseMiddleware
} = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        // TODO: Implement login action (get the user if it exist with entered credentials)
        const result = AuthService.login(req.body)
        res.send(result);
    } catch (err) {
        res.err = err;
        console.log(err);
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;