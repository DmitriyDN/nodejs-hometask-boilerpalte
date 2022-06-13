const responseMiddleware = (req, res, next) => {
    // TODO: Implement middleware that returns result of the query

    if (req.query) {
        return req.query
    }
    else {
        const error = {
            error: true,
            message: 'Can not get paramets!'
        };
        return error;
    }
     next();
 }
 
 exports.responseMiddleware = responseMiddleware;