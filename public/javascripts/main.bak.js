$(document).ready(function(){
	$('.category-delete').click(function (event){
		$target = $(event.target)
		$.ajax({
			type: 'DELETE',
			url: '/categories/delete/' + $target.attr('data-category-id'),
			data: {
				_csrf: $target.attr('data-csrf')
			},
			success: function (response){
				$target.parent().parent().remove();
				alert('Category Removed.');
				window.location.href='/manage/categories';
			},
			error: function (error){
				alert('--- ERROR --- (main.js) (.category-delete) '+error);
			}
		})
	});

	$('.article-delete').click(function (event){
		$target = $(event.target)
		$.ajax({
			type: 'DELETE',
			url: '/articles/delete/' + $target.attr('data-article-id'),
			data: {
				_csrf: $target.attr('data-csrf')
			},
			success: function(response){
				$target.parent().parent().remove();
				alert('Article Removed.');
				window.location.href='/manage/articles';
			},
			error: function (error){
				alert('--- ERROR --- (main.js) (.article-delete) '+error);
			}
		})
	});
});