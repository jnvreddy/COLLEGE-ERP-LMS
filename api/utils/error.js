export const errorHandler = (ststusCode, message) => {
    const error = new Error();
    error.ststusCode = statusCode;
    error.message = message;
    return error;
};