const {
    fighter
} = require('../models/fighter');
const FighterService = require('../services/fighterService')

const fields = ['name', 'power', 'defense'];

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    try {
        //DATA EXISTANCE VALIDATION
        const missingFieldValidation = fields.find((item) => {
            return req.body[item] == null || req.body[item] == '' || req.body[item] == undefined

        });
        if (missingFieldValidation) {
            return res.status(400).json({
                error: true,
                message: `Please enter your ${missingFieldValidation}`
            })
        };
        //NAME VALIDATION
        const name = req.body.name;
        const namelValidation = FighterService.search((fighter) => {
            return fighter.name === name;
        });
        if (namelValidation) {
            return res.status(400).json({
                error: true,
                message: 'Fighter with this name is already registered'
            })
        }
        //DEFENSE VALIDATION
        const defense = req.body.defense;
        if (defense >= 10 || defense <= 1) {
            return res.status(400).json({
                error: true,
                message: `Defense should be from 1 to 10`
            })
        };
        //POWER VALIDATION
        const power = req.body.power;
        if (power >= 100 || power <= 1) {
            return res.status(400).json({
                error: true,
                message: `Power should be from 1 to 100`
            })
        }

        const newFighter = FighterService.createFighter(req.body);
        res.send(newFighter);
        next();

    } catch (err) {

    }
    next();
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;