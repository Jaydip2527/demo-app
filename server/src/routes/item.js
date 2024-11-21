const router = require("express").Router();
const { auth } = require("../middleware");
const multer = require("multer");
const path = require("path");
const itemModel = require('../models/item');
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
const itemService = require("../controllers/item");
const item = new itemService();

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
        const result = await item.getAllItems();
        res.status(200).send({ data: result, message: "Items fetched successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});

router.post("/add", upload.single("image"), async (req, res, next) => {
    try {
        const { filename } = req.file;
        const itemData = req.body;
        // const baseUrl = req.protocol + "://" + req.get("host");
        itemData.image = `uploads/${filename}`;
        const result = await item.storeItemData(itemData);
        res.status(201).send({ data: result, message: "Item created successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});

router.put("/update/:id", upload.single("image"), async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const oldImage = await itemModel.findById(id, { image: 1 });
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
        const result = await item.updateItem(id, updatedData);
        res.status(200).send({ data: result, message: "Item updated successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});


router.delete("/delete/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await item.deleteItem(id);
        res.status(200).send({ data: result, message: "Item deleted successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});

module.exports = router;
