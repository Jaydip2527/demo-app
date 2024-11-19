const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
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
    tableName: 'book',
    timestamps: { createdAt: true, updatedAt: true }
});

const book = mongoose.model('book', bookSchema);
module.exports = book;
