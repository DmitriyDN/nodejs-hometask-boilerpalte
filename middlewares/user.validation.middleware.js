const { user } = require('../models/user');


const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
  
    const error = validUser({...req.body}, user);
    const isNotExistEmail = true;
    error.message += isNotExistEmail ? '' : ' Email already exіsts';
    if (!error.error && isNotExistEmail) {
        next()
    } else {
        res.status(401).send(JSON.stringify(error));
    }
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    const error = validUser(req.body, user);
    if (!error.error) {
        next()
    } else {
        res.status(401).send(JSON.stringify(error));
    }
}


const validUser = (reqBody, modelUser) => {
    const error = {
        error: false,
        message: ''
    }
    for ( var prop in reqBody ) {
        if (modelUser[prop] !== undefined) {
            switch(prop) {
                case 'email':
                    if ( !(/@gmail.com$/.test(reqBody[prop])) ) {
                        error.error = true;
                        error.message += ` ${prop} is not valid`;
                    }
                    break;
                case 'firstName':
                    if (reqBody[prop].length < 1) {
                        error.error = true;
                        error.message += ` ${prop}  is not valid`;
                    }
                    break;
                case 'phoneNumber':
                    if ( !(/\+380\d{9}/.test(reqBody[prop])) ) {
                        error.error = true;
                        error.message += ` ${prop}  is not valid`;
                    }
                    break;
                case 'password': 
                    if (reqBody[prop].length < 3) {
                        error.error = true;
                        error.message += ` ${prop}  is not valid`;
                    }
                    break;
                default: 
                    break;
            }
        } else {
            error.error = true;
            error.message = 'field dose not in model of User!'
            return error;
        }
    }
    
    return error;
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;