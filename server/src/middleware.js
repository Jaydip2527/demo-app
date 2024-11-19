const jwt = require('jsonwebtoken');
exports.auth = (req,res,next) => {
    // console.log(' req.header',  req.header('Authorization'))
    const token = req.header('Authorization')?.replace('Bearer',"").trim();
    const userData = jwt.verify(token, process.env.JWT_SECRET);   
    res.locals.userEmail = userData?.email;
    res.locals.userId = userData?.id;
    next();
}

exports.errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json( err.message || 'An unexpected error occurred');
    // next();
}