const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', async (req, res, next) => {
    try {
        const user = await AuthService.login({email: req.body.email})
        if(user.password !== req.body.password){
            res.status(400)
            throw new Error('incorrect password')
        }
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;