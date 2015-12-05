var express = require('express');
var router = express.Router();

Category = require('../models/category.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	Category.getCategories(function(err, categories){
		if(err) {
			res.send(err);
		} else {
			res.render('categories', {
				title: 'Categories',
				categories: categories
			})
		}
	})
});

router.post('/add', function(req, res){
	req.checkBody('title', 'Title is required.').notEmpty();
	req.checkBody('description', 'Description is required.').notEmpty();

	var errors = req.validationErrors();
	if(errors) {
		res.render('add_category', {
			errors: errors,
			title: 'Title Required'
		});
	} else {
		var category = new Category();
		category.title = req.body.title;
		category.description = req.body.description;

		Category.addCategory(category, function(err, category){
			if(err) {
				res.send(err);
			} else {
				var catAdded = 'Category '+category.title+' saved.'
				req.flash('success', catAdded);
				res.redirect('/manage/categories');
			}
		});
	}
});

module.exports = router;