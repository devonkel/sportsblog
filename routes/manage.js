var express = require('express');
var router = express.Router();

/* GET Manage Articles page. */
router.get('/articles', function(req, res, next) {
  res.render('manage_articles', { title: 'Manage Articles' });
});

/* GET Manage Categories page. */
router.get('/categories', function(req, res, next) {
  res.render('manage_categories', { title: 'Manage Categories' });
});

/* GET Add Articles page. */
router.get('/articles/add', function(req, res, next) {
  res.render('add_article', { title: 'Create Articles' });
});

/* GET Add Category page. */
router.get('/categories/add', function(req, res, next) {
  res.render('add_category', { title: 'Create Category' });
});

/* GET Edit Articles page. */
router.get('/articles/edit/:id', function(req, res, next) {
  res.render('edit_article', { title: 'Edit Article' });
});

/* GET Edit Category page. */
router.get('/categories/edit/:id', function(req, res, next) {
  res.render('edit_category', { title: 'Edit Category' });
});

module.exports = router;