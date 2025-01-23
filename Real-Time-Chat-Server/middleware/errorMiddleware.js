const errorHandler = (err,req,res,next)=> {
    const statusCode = res.statusCode? res.statusCode : 500
    res.status(statusCode)
    res.json({
        errorMessage:err.message
    })
}

module.exports = {
    errorHandler
}