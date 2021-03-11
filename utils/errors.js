class UserValidationError extends Error{
    constructor(errors){
        super(JSON.stringify({
            statusCode: 400,
            code:"USR-01",
            message:errors
        }));
    }
}

class UserCreationError extends Error{
    constructor(errors){
        super(JSON.stringify({
            statusCode: 400,
            code:"USR-02",
            message:errors
        }))
    }
}


module.exports ={
    UserValidationError,
    UserCreationError
}