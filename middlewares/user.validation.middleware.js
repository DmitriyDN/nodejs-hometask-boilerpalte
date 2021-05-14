const UserService = require('../services/userService');
const {
    user
} = require('../models/user');
const fields = ['email','firstName', 'lastName', 'password', 'phoneNumber'];
const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
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
        }

        //EMAIL VALIDATION
        const email = req.body.email;
        const emailValidation = UserService.search((user) => {
            return user.email === email;
        });

        if (emailValidation) {
            return res.status(400).json({
                error: true,
                message: 'User with this email address is already registered'
            })
        }
        if (!email.endsWith('@gmail.com')) {
            return res.status(400).json({
                error: true,
                message: 'Use Gmail email address'
            })
        }


        //PHONE NUMBER VALIDATION
        const phoneNumber = req.body.phoneNumber;
        const nums = phoneNumber.slice(4);

        const phoneNumberValidation = UserService.search((user) => {
            return user.phoneNumber === phoneNumber;
        });

        if (phoneNumberValidation) {
            return res.status(400).json({
                error: true,
                message: 'User with this phone number is already registered'
            })
        }

        if (phoneNumber.length !== 13 || !phoneNumber.startsWith('+380') || !Number.isInteger(+nums)) {

            return res.status(400).json({
                error: true,
                message: 'Enter your phone number in format: +380xxxxxxxxx'
            })
        }


        //PASSWORD VALIDATION
        const password = req.body.password;

        if (password.length < 3) {
            return res.status(400).json({
                error: true,
                message: 'Password should be at least 3 characters long'
            })
        }

        const newUser = UserService.createUser(req.body);
        res.send(newUser);
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: true,
            message: 'Something went wrong'
        })
    }

}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;