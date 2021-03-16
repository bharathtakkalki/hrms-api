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

class InternalServerError extends Error{
    constructor(error){
        super(JSON.stringify({
            statusCode:500,
            code:error.code,
            message:error.message
        }))
    }
}

class DatabaseConnectionError extends Error{
    constructor(error){
        super(JSON.stringify({
            statusCode:500,
            code:"DB-01",
            message:error,
        }))
    }
}


module.exports ={
    UserValidationError,
    UserCreationError,
    InternalServerError,
    DatabaseConnectionError
}