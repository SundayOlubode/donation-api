exports.get500Errors = (error, req, res, next) => {

    res.status(error.httpStatusCode)
        .json({message: error.message})
  
}