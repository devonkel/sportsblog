var express = require('express');
var router = express.Router();

Article = require('../models/article.js');
Category = require('../models/category.js');

/* Articles page. */
router.get('/', function (req, res, next) {
	Article.getArticles({}, function (err, articles){
		if(err){
			res.send(err);
		} else {
			res.render('articles', { 
				title: 'All Articles',
				articles: articles
			});
		}
	});
});

/* Show article. */
router.get('/show/:id', function (req, res, next) {
	Article.getArticleById(req.params.id, function(err, article){
		if(err){
			res.send(err);
		} else {
			res.render('article', { 
				article: article
			});
		}
	});
});

router.get('/category/:cat', function (req, res, next) {
  	Article.getArticles({category:req.params.cat}, function (err, articles){
		if(err){
			console.log(err);
			res.send(err);
		} else {
			res.render('articles', { 
				"title": req.params.cat,
				"articles": articles
			});
		}
	});
});

router.post('/add', function (req, res){
	req.checkBody('title', 'Title is required.').notEmpty();
	req.checkBody('subtitle', 'Subtitle is required.').notEmpty();
	req.checkBody('category', 'Category is required.').notEmpty();
	req.checkBody('author', 'Author is required.').notEmpty();
	req.checkBody('body', 'Article Body is required.').notEmpty();

	var errors = req.validationErrors();
	if(errors) {
		console.log('=== Add article validation error');
		var article = new Article();
		article.title = req.body.title;
		article.subtitle = req.body.subtitle;
		article.category = req.body.category;
		article.author = req.body.author;
		article.body = req.body.body;
		Category.getCategories(function (err2, categories){
			if(err2){
				res.send(err2);
			} else {
				res.render('add_article', {
					errors: errors,
					title: 'Add Article',
					article: article,
					categories: categories
				})
			}
		});
	} else {
		var article = new Article();

		article.title = req.body.title;
		article.subtitle = req.body.subtitle;
		article.category = req.body.category;
		article.author = req.body.author;
		article.body = req.body.body;

		Article.addArticle(article, function (err, article){
			if(err) {
				console.log('=== Error === Error in articles.js - AddArticle.');
				res.send(err);
			} else {
				var artAdded = 'Article '+article.title+' saved.';
				req.flash('success', artAdded);
				res.redirect('/manage/articles');
			}
		});
	}
});

router.post('/edit/:id', function (req, res){
	req.checkBody('title', 'Title is required.').notEmpty();
	req.checkBody('subtitle', 'Subtitle is required.').notEmpty();
	req.checkBody('author', 'Author is required.').notEmpty();
	req.checkBody('category', 'Category is required.').notEmpty();
	req.checkBody('body', 'Article Body is required.').notEmpty();

	var errors = req.validationErrors();
	if(errors) {
		res.render('edit_article', {
			errors: errors,
			title: 'Edit Article'
		});
	} else {
		var article = new Article();
		var query = {_id: [req.params.id]};
		var update = {
			title: req.body.title, 
			subtitle: req.body.subtitle,
			category: req.body.category,
			author: req.body.author,
			body: req.body.body
		};

		Article.updateArticle(query, update, {}, function (err, article){
			if(err) {
				res.send(err);
			} else {
				var artAdded = 'Article '+article.title+' updated to '+req.body.title
				req.flash('success', artAdded);
				res.redirect('/manage/articles');
			}
		});
	}
});

router.post('/comments/add/:id', function (req, res, next){
	req.checkBody('comment_subject', 'Comment Subject is required.').notEmpty();
	req.checkBody('comment_author', 'Comment Author is required.').notEmpty();
	req.checkBody('comment_body', 'Comment Body is required.').notEmpty();
	req.checkBody('comment_email', 'Comment Email is required.').notEmpty();

	var errors = req.validationErrors();
	if(errors) {
		Article.getArticleById([req.params.id], function (err, article){
			if(err){
				console.log(err);
				res.send(err);
			} else {
				res.render('article',{
					"errors": errors,
					"article": article, 
					"comment_subject": req.body.comment_subject,
					"comment_author": req.body.comment_author,
					"comment_body": req.body.comment_body,
					"comment_email": req.body.comment_email
				});
			}
		});
	} else {
		var article = new Article();
		var query = {_id: [req.params.id]};
		var comment = {
			"comment_subject": req.body.comment_subject,
			"comment_author": req.body.comment_author,
			"comment_body": req.body.comment_body,
			"comment_email": req.body.comment_email
		};

		Article.addComment(query, comment, function (err, article) {
			if(err) {
				res.send(err);
			} else {
				Article.getArticleById([req.params.id], function (err2, article){
					if(err2){
						console.log(err2);
						res.send(err2);
					} else {
						res.render('article',{
							"article": article,
							successMsg: 'Your comment was added.'
						});
					}
				});
			}
		});
	}
});

router.delete('/delete/:id', function (req, res){
	var query = {_id: [req.params.id]};
	console.log('+++ About to delete Article with ID: ', query);
	Article.remove(query, function (err){
		if(err) {
			res.send(err);
		} else {
			res.status(204).send();
		}
	});
});

module.exports = router;