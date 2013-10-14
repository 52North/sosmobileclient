var ColorView = (function() {
  return Backbone.View.extend({
    id: 'colorPopup',
    className: 'modal fade',
        attributes: {
      'data-backdrop': 'static'
    },
    template: Handlebars.helpers.getTemplate('colorModal'),
    
    events: {
      'click button': 'changeColor',
      'hidden.bs.modal': 'remove'
    },

    render: function() {
      colors = {
        'defaultColor': this.model.defaultColor(),
        'currentColor': this.model.get('color'),
        'colors': [
          '1abc9c',
          '27ae60',
          '2980b9',
          '8e44ad',
          '2c3e50',
          'f1c40f',
          'd35400',
          'c0392b',
          '7f8c8d'
        ] 
      }

      this.$el.html(this.template(colors));

      $("#temp-modals").html(this.$el);
      this.$el.modal('show');

      return this;
    },

    changeColor: function(event) {
      var color = $(event.currentTarget).data('color');
      
      if (color != this.model.get('color')) {
        this.model.set('color', color);
        var colorMap = window.settings.get('timeseriesColors');
        colorMap[this.model.get('id')] = color;
        window.settings.set('timeseriesColors', colorMap);
        window.settings.save();
      }
      
      //Close
      this.$el.modal('hide');
    }
  });
})();