const multer = require('multer')
function errorHandler(err, req, res, next) {
    console.log(err, 'ni err dari error handler');
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
    } else if (err.message == 'File too large') {
        res.status(400).json({
            message: 'Image too large, please use image with 1mb size'
        })
    } else if (err.name === 'unsupported file format') {
        res.status(400).json({
            message: 'Unsupported file format, please use file with format png/jpeg'
        })
    } else if (err.message == 'Request failed with status code 403') {
        res.status(403).json({ message: 'Not enough permissions from linkedin' })
    } else if (err.message == 'Request failed with status code 401') {
        // console.log('masuk');
        res.status(401).json({ message: 'Invalid access token linkedin' })
    } else if (err.message == 'Request failed with status code 400') {
        // console.log('masuk');
        res.status(400).json({message: 'linkedin parameter is missing'})
    } else if (err.name === 'Not Verify') {
        res.status(400).json({message :'Verify Your Acount'})
    }
    else if (err.name === 'not found') {
        res.status(401).json({message :'Not found'})
    }
    else {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { errorHandler }