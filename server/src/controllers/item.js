const itemModel = require('../models/item');
class itemService{
    async storeItemData(data){
       const item = new itemModel(data);
       const result = await item.save();
       console.log('result', result)
       return result;
    }

    async getAllItems(){
        const items = await itemModel.find();
        return items;
    }
    
    async deleteItem(id){
        const item = await itemModel.deleteOne({_id:id});
        return item;
    }

    async updateItem(id, updatedData) {
        const item = await itemModel.findByIdAndUpdate(id, updatedData, { new: true });
        return item;
    }
}

module.exports = itemService;