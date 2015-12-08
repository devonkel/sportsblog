var express = require('express');
var router = express.Router();

Category = require('../models/category.js');
Article = require('../models/article.js');


/* GET Manage Articles page. */
router.get('/articles', function(req, res, next) {
	Article.getArticles(function(err, articles){
		if(err){
			res.send(err);
		} else {
			res.render('manage_articles', 
				{ title: 'Manage Articles' ,
				articles: articles
			});
		}
	});
});

/* GET Manage Categories page. */
router.get('/categories', function(req, res, next) {
	Category.getCategories(function(err, categories){
		if(err) {
			res.send(err);
		} else {
			res.render('manage_categories', {
				title: 'Manage Categories',
				categories: categories
			})
		}
	});
});

/* GET Add Articles page. */
router.get('/articles/add', function(req, res, next) {
	var article = new Article();
	article.title = '';
	article.subtitle = '';
	article.author = '';
	article.body ='';
	Category.getCategories(function(err, categories){
		if(err) {
			res.send(err);
		} else {
			res.render('add_article', {
				title: 'Add Article',
				article: article,
				categories: categories
			})
		}
	});
});

/* GET Add Category page. */
router.get('/categories/add', function(req, res, next) {
  res.render('add_category', { title: 'Create Category' });
});

/* GET Edit Article page. */
router.get('/articles/edit/:id', function(req, res, next) {
  	Article.getArticleById([req.params.id], function(err, article){
		if(err) {
			res.send(err);
		} else {
			Category.getCategories(function(err2, categories){
			if(err2) {
				res.send(err2);
			} else {
				res.render('edit_article', {
					title: 'Edit Article',
					article: article,
					categories: categories
				});
			}});
		}
	});
});

/* GET Edit Category page. */
router.get('/categories/edit/:id', function(req, res, next) {
	Category.getCategoryById([req.params.id], function(err, category){
		if(err) {
			res.send(err);
		} else {
			res.render('edit_category', {
				title: 'Edit Category',
				category: category
			})
		}
	});
});

module.exports = router;