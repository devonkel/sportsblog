var mongoose = require('mongoose');

//Category Schema
var categorySchema = mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	created_dt: {
		type: Date,
		default: Date.now
	}
});

var Category = module.exports = mongoose.model("Category", categorySchema);

//Get Categories
module.exports.getCategories = function(callback, limit){
	Category.find(callback).limit(limit).sort([['title', 'ascending']]);
};

//Get single category
module.exports.getCategoryById = function(id, callback){
	Category.findById(id, callback);	
};

//Add a category
module.exports.addCategory = function(category, callback){
	Category.create(category, callback);
};

//Update a category
module.exports.updateCategory = function(query, update, options, callback){
	Category.findOneAndUpdate(query, update, options, callback);
};
