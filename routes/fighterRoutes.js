const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', async (req, res, next) => {
    try {
        const fighters = await FighterService.getAllFighters();
        res.data = fighters;
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);


router.get('/:id', async (req, res, next) => {
    try {
        if(!FighterService.hasName({id: req.params.id})){
            res.status(404)
            throw new Error('Fighter not found')
        }
        const fighter = await FighterService.search({id: req.params.id})
        res.data = fighter
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);


router.post('/', createFighterValid, async (req, res, next) => {
    try {
        req.body.name = req.body.name.toUpperCase()
        const checkFighter = await FighterService.hasName({name: req.body.name})
        if (checkFighter) {
            res.status(400)
            throw new Error('Such a fighter already exists')
        }

        const fighter = await FighterService.create(req.body)
        res.data = fighter
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);


router.put('/:id', updateFighterValid, async (req, res, next) => {
    try {
        if(req.body.hasOwnProperty('name')){
            req.body.name = req.body.name.toUpperCase()
        }
        if(!FighterService.hasName({id: req.params.id})){
            res.status(404)
            throw new Error('Fighter not found')
        }

        const fighter = await FighterService.update({id: req.params.id, updateData: req.body})
        res.data = fighter;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);


router.delete('/:id', async (req, res, next) => {
    try {
        if(!FighterService.hasName({id: req.params.id})){
            res.status(404)
            throw new Error('Fighter not found')
        }

        const fighter = await FighterService.delete(req.params.id)
        res.data = fighter
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;