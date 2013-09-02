var ColorView = (function() {
  return Backbone.View.extend({
    id: 'colorPopup',
    className: 'modal fade',
    template: Handlebars.helpers.getTemplate('colorModal'),
    
    events: {
      'click button': 'changeColor'
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
        var colorMap = window.settings.get('timeseries_colors');
        colorMap[this.model.get('id')] = color;
        window.settings.set('timeseries_colors', colorMap);
        window.settings.save();
      }
      
      //Close and remove
      this.$el.modal('hide');
      var _this = this
      this.$el.on('hidden.bs.modal', function() {
        _this.remove();
      });
    }
  });
})();