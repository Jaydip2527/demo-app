const router = require("express").Router();
const { auth } = require("../middleware");
const multer = require("multer");
const path = require("path");
const bookModel = require('../models/book');
const fs = require("fs");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Import Models
const bookService = require("../controllers/book");
const book = new bookService();

const unlink = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    });
};

router.get("/get", auth, async (req, res, next) => {
    try {
        const result = await book.getAllBooks();
        res.status(200).send({ data: result, message: "Books fetched successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});

router.post("/add", upload.single("image"), async (req, res, next) => {
    try {
        const { filename } = req.file;
        const bookData = req.body;
        // const baseUrl = req.protocol + "://" + req.get("host");
        bookData.image = `uploads/${filename}`;
        const result = await book.storeBookData(bookData);
        res.status(201).send({ data: result, message: "Book created successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});

router.put("/update/:id", upload.single("image"), async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const oldImage = await bookModel.findById(id, { image: 1 });
        if (req.file) {
            if (oldImage.image) {
                const oldImagePath = oldImage.image.split("/").pop();
                const oldImageRemoved = await unlink(path.join(__dirname, `../../uploads/${oldImagePath}`));
                if (!oldImageRemoved) {
                    throw new Error("Failed to remove old image");
                }
            }
            const { filename } = req.file;
            updatedData.image = `uploads/${filename}`;
        } else if (oldImage.image) {
            updatedData.image = oldImage.image;
        }
        const result = await book.updateBook(id, updatedData);
        res.status(200).send({ data: result, message: "Book updated successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});


router.delete("/delete/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await book.deleteBook(id);
        res.status(200).send({ data: result, message: "Book deleted successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});

module.exports = router;
