BrowserView = Backbone.View.extend({
  initialize: function(){

    svc = new Services();
    //svc.areYouThere();
    svc.fetch();
  },
  render: function() {
    var compiledTemplate = Handlebars.helpers.getTemplate('hello');
    var html = compiledTemplate({ name : 'World' });

    this.$el.html(html);
  }
});