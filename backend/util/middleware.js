
const requestLogger = (req, res, next) => {
    console.log('-----------------------')
    console.log('DATE: ', new Date())
    console.log('METHOD: ', req.method)
    console.log('BODY: ', req.body)
    console.log('PATH: ', req.path)
    next()
}

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.message == 'jwt malformed') {
        res.status(401).json({ error: 'Authorization failed'})
        return
    }
    const code = error.message.substring(7, 10)
    const message = error.message.substring(13)
    res.status(code).json({ error: message })
    next(error)
}


module.exports = { errorHandler, requestLogger }