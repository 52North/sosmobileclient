var TimeserieView = Backbone.View.extend({
  tagName: 'li',
  template: Handlebars.helpers.getTemplate('timeserie-list-entry'),
  
  events: {
    
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});