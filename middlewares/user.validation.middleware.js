const { user } = require('../models/user');
const validationService = require('../services/validationService')

const createUserValid = (req, res, next) => {
    try{
        if(!req.body){
            throw new Error('Request body must be is not null')
        }
        for(let key in user){
            if(key !== 'id'){
                if(!req.body[key]){
                    throw new Error(`User with such an ${key} exists`)
                }
            }
        }
        if(Object.keys(user).length - 1 !== Object.keys(req.body).length){
            throw new Error('User entity to create isn\'t valid')
        }
        if (!(validationService.isPhoneNumber(req.body.phoneNumber))) {
            throw new Error('Phone number format +380XXXXXXXXX')
        }
        if (!(validationService.isEmail(req.body.email))) {
            throw new Error('email must be gmail')
        }
        if (!(validationService.isString(req.body.password, 3))){
            throw new Error('pass is not valid')
        }
        if (!(validationService.isString(req.body.firstName))){
            throw new Error('first name is not valid')
        }
        if (!(validationService.isString(req.body.lastName))){
            throw new Error('last name is not valid')
        }
        next();
    }  catch (err) {
        res.status(400).json({error: true, message: err.message})
    }
}

const updateUserValid = (req, res, next) => {
    try{
        if(!req.body){
            throw new Error('Request body must be is not null')
        }
        for(let key in req.body){
                if(!user.hasOwnProperty(key)){
                    throw new Error(`User data to update isn't valid`)
                }
        }
        if (req.body.firstName &&  !(validationService.isString(req.body.firstName))){
            throw new Error('first name is not valid')
        }
        if (req.body.lastName && !(validationService.isString(req.body.lastName))){
            throw new Error('second name is not valid')
        }
        if (req.body.phoneNumber && !(validationService.isPhoneNumber(req.body.phoneNumber))) {
            throw new Error('Phone number format +380XXXXXXXXX')
        }
        if (req.body.email && !(validationService.isEmail(req.body.email))) {
            throw new Error('email must be gmail')
        }
        if (req.body.password && !(validationService.isString(req.body.password, 3))){
            throw new Error('pass is not valid')
        }
        next();
    } catch(err) {
        res.status(400).json({error: true, message: err.message})
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;