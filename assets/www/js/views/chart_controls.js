var ChartControlsView = (function() {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'pull-right controls',
    
    events: {
      'click .action': 'perform'
    },
    subscriptions: {
      'chart:zoom:changed': 'highlight'
    },

    render: function() {
      this.btn = $("<a href='#' data-action='chart:view:reset'>");
      this.btn.addClass("action bigTabBtn");

      var icon = $("<i>");
      icon.addClass("icon-undo");

      this.btn.empty().append(icon);

      this.$el.append(this.btn);
      
      return this;
    },

    highlight: function(ranges) {
      this.btn.addClass('highlight');
      var btn = this.btn;
      setTimeout(function() {
        btn.removeClass('highlight');
      }, 1000);
    },

    perform: function(e) {
      Helpers.performElementAction(e, false);
    }
  });
})();