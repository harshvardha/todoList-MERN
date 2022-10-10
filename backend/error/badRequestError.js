const CustomError = require("./CustomError")
class BadRequestError extends CustomError {
    constructor(errorMessage, errorCode) {
        super(errorMessage, errorCode)
    }
}

module.exports = BadRequestError