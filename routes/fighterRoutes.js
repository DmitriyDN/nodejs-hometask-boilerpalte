const {
    Router
} = require('express');
const FighterService = require('../services/fighterService');
const {
    responseMiddleware
} = require('../middlewares/response.middleware');
const {
    createFighterValid,
    updateFighterValid
} = require('../middlewares/fighter.validation.middleware');
const { createFighter } = require('../services/fighterService');

const router = Router();

// TODO: Implement route controllers for fighter

router.post('/', (req, res, next) => {
    try {
        const result = createFighterValid(req, res, next);
        res.send(result);
    } catch (err) {
        res.err = err;
        console.log(err);
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/', (req, res, next) => {
    try {
        const result = FighterService.search('fighters');
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
        const result = FighterService.delete(req.id);
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
        const result = FighterService.search(req.id);
        res.send(result);
    } catch (err) {
        res.err = err;
        console.log(err);
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;