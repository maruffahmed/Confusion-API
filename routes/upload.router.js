const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const imageFileFiltter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        var err = new Error("You can upload only image file!");
        return cb(err, false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: imageFileFiltter
})

uploadRouter.route("/")
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Get operation not supported on /imageUpload');
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
        res.json(req.file);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /imageUpload');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Delete operation not supported on /imageUpload');
    })


module.exports = uploadRouter;