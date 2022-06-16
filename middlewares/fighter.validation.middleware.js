const { fighter } = require('../models/fighter');
const validationService = require('../services/validationService')


const createFighterValid = (req, res, next) => {
    try{
        if(!req.body){
            throw new Error('Request body must be is not null')
        }
        for(let key in fighter){
            if(key !== 'id'){
                if(!req.body[key]){
                    if(key !== 'health'){
                        throw new Error(`User with such an ${key} exists`)
                    }
                    req.body.health = fighter.health
                }
            }
        }
        if(Object.keys(fighter).length - 1 !== Object.keys(req.body).length){
            throw new Error('Fighter entity to create is not valid')
        }

        if (!(validationService.isNumber(req.body.power, 1, 100 ))) {
            throw new Error('power must be between 1 and 100')
        }
        if (!(validationService.isNumber(req.body.defense, 1, 10))) {
            throw new Error('defence must be between 1 and 10')
        }
        if (!(validationService.isNumber(req.body.health, 80, 120))) {
            throw new Error('health must be between 80 and 120')
        }
        if (!(validationService.isString(req.body.name))){
            throw new Error('name is not valid')
        }
        next();
    } catch(err) {
        res.status(400).json({error: true, message: err.message})
    }

}

const updateFighterValid = (req, res, next) => {
    try{
        if(!req.body){
            throw new Error('Request body must be is not null')
        }
        for (let key in req.body) {
            if (!fighter.hasOwnProperty(key)) {
                throw new Error(`Fighter data to update isn't valid`)
            }
        }
        if (req.body.name && !(validationService.isString(req.body.name))){
            throw new Error('name isn\'t valid')
        }
        if ((req.body.power || req.body.power === 0) && !(validationService.isNumber(req.body.power, 1, 100 ))) {
            throw new Error('power must be between 1 and 100')
        }
        if ((req.body.defense || req.body.defense === 0) && !(validationService.isNumber(req.body.defense, 1, 10))) {
            throw new Error('defence must be between 1 and 10')
        }
        if ((req.body.health || req.body.health === 0) && !(validationService.isNumber(req.body.health, 80, 120))) {
            throw new Error('health must be between 80 and 120')
        }
        next();
    } catch(err) {
        res.status(400).json({error: true, message: err.message})
    }

}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;