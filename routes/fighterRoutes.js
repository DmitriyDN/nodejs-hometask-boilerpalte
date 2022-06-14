const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', function(req, res, next) {
    const fighters = FighterService.getAllFighters();
    console.log(fighters);
	if (fighters) {
        res.send(fighters);
    } else {
        const error = {
            error: true,
            message:"Error!"
        };
        res.status(400).send(JSON.stringify(error));
    }	
}, responseMiddleware)

router.get('/:id', function(req, res, next) {
    const fighter = FighterService.getOneFighter(req.params.id);;
    console.log(fighter);

	if (fighter) {
        res.send(fighter);
    } else {
        const error = {
            error: true,
            message:"Fighter not find, error!"
        };
        res.status(404).send(JSON.stringify(error));
    }	
}, responseMiddleware)

router.post('/', createFighterValid, function(req, res) {
    const fighter = FighterService.create(req.body);
    console.log(fighter);
    if (fighter) {
        res.send("Fighter create successful");
    } else {
        const error = {
            error: true,
            message:"Fighter not create, error!"
        };
        res.status(400).send(JSON.stringify(error));
    }	
}, responseMiddleware)

router.put('/:id', updateFighterValid, function(req, res ) {
    const dataToUpdate = req.body;
    const fighter = FighterService.update(req.params.id, dataToUpdate);
    console.log(fighter);
    if (fighter) {
        res.send("Fighter update successful");
    } else {
        const error = {
            error: true,
            message:"Fighter not update, error!"
        };
        res.status(400).send(JSON.stringify(error));
    }	
}, responseMiddleware)

router.delete('/:id', function(req,res){
    const fighter = FighterService.delete(req.params.id);
    console.log(fighter);
    if (fighter) {
        res.send("Fighter delete successful");
    } else {
        const error = {
            error: true,
            message:"Fighter not delete, error!"
        };
        res.status(400).send(JSON.stringify(error));
    }	
}, responseMiddleware)

module.exports = router;