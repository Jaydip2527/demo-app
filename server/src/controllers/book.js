const bookModel = require('../models/book');
class bookService{
    async storeBookData(data){
       const book = new bookModel(data);
       const result = await book.save();
       console.log('result', result)
       return result;
    }

    async getAllBooks(){
        const books = await bookModel.find();
        return books;
    }
    
    async deleteBook(id){
        const book = await bookModel.deleteOne({_id:id});
        return book;
    }

    async updateBook(id, updatedData) {
        const book = await bookModel.findByIdAndUpdate(id, updatedData, { new: true });
        return book;
    }
}

module.exports = bookService;