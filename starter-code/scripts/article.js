var articles = [];

function Article (options) {
  this.title = options.title;
  this.category = options.category;
  this.author = options.author;
  this.authorURL = options.authorURL;
  this.publishedOn = options.publishedOn;
  this.body = options.body;

};

/* This toHtml function is one that we are creating, and it is
being attached to the prototype. Why? */
Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.attr('data-category', this.category);

  $newArticle.find('a[href]').attr('Author Name', this.author);
  $newArticle.find('href').text(this.authorURL);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('.article-body').append(this.body);
  // $newArticle.removeclass('template');
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.removeclass('template');
  return $newArticle;
};

/* This sort method is a standard JavaScript Array function
that will iterate over an array and compare its values,
and then arrange them in ascending or descending order
according to the return value. We are comparing the
publishedOn properties to arrange the blog posts in
descending order (most recent first). */
blogArticles.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.publishedOn)) - (new Date(currentObject.publishedOn));
});

/* The forEach method is another standard JS array function
that behaves like a traditional for loop */
blogArticles.forEach(function(articleObj) {
  articles.push(new Article(articleObj));
});

articles.forEach(function(articleObj) {
  $('#articles').append(articleObj.toHtml());
});
