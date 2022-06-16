const { Router } = require('express')
const UserService = require('../services/userService')
const {
  createUserValid,
  updateUserValid,
} = require('../middlewares/user.validation.middleware')
const { responseMiddleware } = require('../middlewares/response.middleware')

const router = Router()

// TODO: Implement route controllers for user

router.get('/', async (req, res,next) => {
    try {
        const users = await UserService.getAllUsers();
        res.data = users;
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);


router.get('/:id',  async (req, res, next) => {
    try {
        const checkId = await UserService.hasName({id: req.params.id})
        if(!checkId){
            res.status(404)
            throw new Error('User not found')
        }
        const user = await UserService.getOneUser({id: req.params.id})
        if(!user){
            res.status(404)
            throw new Error('User not found')
        }
        res.data = user
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);


router.post('/', createUserValid, async (req, res,next) => {
    try {
        req.body.email = req.body.email.toLowerCase()
        const checkName = await UserService.hasName({email: req.body.email, phoneNumber: req.body.phoneNumber})
        if (checkName) {
            res.status(400)
            throw new Error('User with such an email or phone already exists')
        }
        const user = await UserService.create(req.body)
        res.data = user
    } catch (err) {
        res.err = err
    } finally {
        next()
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, async(req, res, next) => {
    try {
        const checkId= await UserService.hasName({id: req.params.id})
        if (!checkId) {
            res.status(404)
            throw new Error('User not found')
        }
        if (req.body.hasOwnProperty('email')){
            req.body.email = req.body.email.toLowerCase()
        }
        const user = await UserService.update({id: req.params.id, updateData: req.body})
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', async (req, res, next) => {
    try {
        const checkId= await UserService.hasName({id: req.params.id})
        if (!checkId) {
            res.status(404)
            throw new Error('User not found')
        }
        const user = await UserService.delete(req.params.id)
        res.data = user
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router
