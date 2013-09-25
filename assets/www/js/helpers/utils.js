var Helpers = (function() {
  var errorId = 0;
  
  window.ratio = $(document).width() / $(document).height(); 
    
  $(window).resize(function() {
    var newRatio = $(document).width() / $(document).height();
    
    if (newRatio != window.ratio) {
      window.ratio = newRatio;
      Backbone.Mediator.publish("screen:change:ratio", ratio);
      //console.log(window.ratio);
    }
  });

  return  {

    generateStationsUrl: function(provider) {
      if (!provider) {
        var provider = "PEGELONLINE";
      }
      return "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v0/services/" + provider.toString() + "/stations.json?show=expanded";
    },

    showErrorMessage: function(title, message) {
      var id = 'error' + errorId++;
      var template = Handlebars.helpers.getTemplate('errorMessage');
      var html = template({
        id: id,
        icon: 'icon-warning-sign',
        title: title,
        message: message
      });
      $('#temp-modals').append(html);
      var modal = $('#' + id);
      modal.modal('show');

      modal.on('hidden.bs.modal', function () {
        modal.remove();
      });
    },

    /**
     *  Finds the topmost/leftmost and the bottommost/rightmost station
     */
    boundingBoxFromStations: function(stationCollection) {
      if (stationCollection.length != 0) {
        var firstElemCoord = stationCollection.at(0).get('geometry').coordinates;
        var topmost = firstElemCoord[1];
        var bottommost = firstElemCoord[1];
        var leftmost = firstElemCoord[0];
        var rightmost = firstElemCoord[0];

        stationCollection.each(function(element) {
          var geom = element.get('geometry').coordinates; //[longitue, latitude] = [x,y]

          if (geom[0] > rightmost) {
            rightmost = geom[0];
          }
          if (geom[0] < leftmost) {
            leftmost = geom[0];
          }
          if (geom[1] > topmost) {
            topmost = geom[1];
          }
          if (geom[1] < bottommost) {
            bottommost = geom[1];
          }
        });
        return [[parseFloat(bottommost), parseFloat(leftmost)], [parseFloat(topmost), parseFloat(rightmost)]];
      }
    },

    performElementAction: function(event, model) {
      event.preventDefault();
      event.stopPropagation();
      var el = $(event.currentTarget);
      var callback = el.data('action');

      Backbone.Mediator.publish(callback, model);

      navigate = el.data('navigate');
      if (navigate) {
        $('.modal').modal('hide');
        window.location.href = navigate;
      }
    },

    isoTimespanFromTill: function(from, till) {
      var from = moment(from).format("YYYY-MM-DD");
      var till = moment(till).format("YYYY-MM-DD");
      var din = from.format("YYYY-MM-DD") + "T00:00:00Z/" + till.format("YYYY-MM-DD") + "T23:59:59Z";
      var label = din;

      var span = {
        'from': from,
        'till': till,
        'din': din,
        'label': label
      };
      return span;
    },

    isoTimespan: function(type) {
      /*
        a) Start and end, such as "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z"
        b) Start and duration, such as "2007-03-01T13:00:00Z/P1Y2M10DT2H30M"
        c) Duration and end, such as "P1Y2M10DT2H30M/2008-05-11T15:30:00Z"
      */
      //return obj: {from, till, din, label}
      var from = moment();
      var till = moment();
      var label = type;
      var din;
      
      switch (type) {
        case 'today':
          from = from.startOf('day');
          label = from.format("MMM D.");
          break;
        case 'yesterday':
          from = from.subtract('days', 1).startOf('day');
          till = till.subtract('days', 1).endOf('day');
          label = from.format("MMM D.");
          break;
        case 'lastWeek':
          from = from.subtract('weeks', 1).startOf('week');
          till = till.subtract('weeks', 1).endOf('week');          
          label = "last week (" + from.week() + ")";
          break;
        case 'thisWeek':
          from = from.startOf('week');
          label = "this week (" + from.week() + ")";
          break;
        case 'lastMonth':
          from = from.subtract('months', 1).startOf('month');
          till = till.subtract('months', 1).endOf('month');
          label = from.format("MMM YYYY");
          break;
        case 'thisMonth':
          from = from.startOf('month');
          label = from.format("MMM YYYY");
          break;
        case 'thisYear':
          from = from.startOf('year');
          label = "year " + from.format("YYYY");
          break;
        case 'lastYear':
          from = from.subtract('months', 1).startOf('month');
          till = till.subtract('months', 1).endOf('month');
          label = "year " + from.format("YYYY");
          break;
      }
      
      din = from.format("YYYY-MM-DD") + "T00:00:00Z/" + till.format("YYYY-MM-DD") + "T23:59:59Z";
      
      var span = {
        'from': from.format('YYYY-MM-DD'),
        'till': till.format('YYYY-MM-DD'),
        'din': din,
        'label': label
      };
      return span;
    },

    addDateOfTimeseries: function(id) {
      var addDates = window.settings.get('timeseriesAddDates');
      var value = addDates[id];
      if (value) {
        return new Date(value); 
      } else {
        return new Date(0);
      }
    },

    updateAddDate: function(id) {
      var addDates = window.settings.get('timeseriesAddDates');
      addDates[id] = new Date().getTime();
      window.settings.set('timeseriesAddDates', addDates);
      window.settings.save();
    }

  };
})();