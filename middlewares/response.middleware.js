const responseMiddleware = (err, req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (err instanceof ApiError) {
    console.log(err);
    return res.status(err.status).json({ error: true, message: err.message });
  }
  return res.status(500).json({ message: "Unknown Error!" });
};

class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static badRequest(message) {
    return new ApiError(404, message);
  }
  static validationError(message) {
    return new ApiError(400, message);
  }
}

exports.responseMiddleware = responseMiddleware;

exports.ApiError = ApiError;
