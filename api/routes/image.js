import express from "express"
const router = express.Router();
import multer from 'multer';
import path from 'path'


// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB
}).single('image');

// @route   POST api/images
// @desc    Upload image
// @access  Private
router.post('/', auth, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Server Error' });
        }
        console.log(req.file);
        res.json({ fileName: req.file.filename, filePath: req.file.path });
    });
});

// @route   GET api/images
// @desc    Get all images
// @access  Public (for demonstration, you may want to make it private in production)
router.get('/', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Server Error' });
        }
        const images = files.map((file) => ({ fileName: file, filePath: `/uploads/${file}` }));
        res.json(images);
    });
});

module.exports = router;
