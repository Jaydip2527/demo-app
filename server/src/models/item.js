const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    subtitle: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
},
{
    tableName: 'item',
    timestamps: { createdAt: true, updatedAt: true }
});

const item = mongoose.model('item', itemSchema);
module.exports = item;
