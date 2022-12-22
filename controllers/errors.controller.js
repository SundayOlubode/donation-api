exports.get500Errors = (error, req, res, next) => {
    if(!error.httpStatusCode){
        error.httpStatusCode = 500
    }
    res.status(error.httpStatusCode)
        .json({message: error.message})
  
}