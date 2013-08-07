BrowserView = Backbone.View.extend({
  initialize: function(){

    svc = new Services();
    //svc.areYouThere();
    svc.fetch();
  },
  render: function() {
    var html = "hello"

    this.$el.html(html);
  }
});