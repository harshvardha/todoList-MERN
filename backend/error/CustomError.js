class CustomError extends Error {
    constructor(errorMessage, errorCode) {
        super(errorMessage)
        this.errorCode = errorCode
    }
}