const multer = require('multer')
function errorHandler(err, req, res, next) {
    console.log(err,'ni err dari error handler');
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            errorsMessages: err.errors.map(el => ({ message: el.message }))
        })
    } else if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            message: 'Invalid access token'
        })
    } else if (err.status) {
        res.status(err.status).json({ message: err.msg })
    // } else if (err.name == 'MulterError' && err.message == 'File too large') {
    //     res.status(400).json({
    //         message: 'Image too large, please use image with 1mb size'
    //     })
    // }else if (err.name === 'unsupported file format') {
    //     res.status(400).json({
    //         message: 'Unsupported file format, please use file with format png/jpeg'
    //     })
    
    }else if (err.name === 'Not Verify') {
        res.status(400).json({message :'Verify Your Acount'})
    }
    else {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { errorHandler }