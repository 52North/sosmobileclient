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

      var navigate = el.data('navigate');
      if (navigate) {
        $('.modal').modal('hide');
        window.location.href = navigate;
      }

      //This has to be in another thread due to leaflet + bootstrap issues.
      setTimeout(function() {
        Backbone.Mediator.publish(callback, model); 
      }, 0);
    },

    isoTimespanFromTill: function(from, till) {
      from = moment(from, "YYYY-MM-DD").startOf('day');
      till = moment(till, "YYYY-MM-DD").startOf('day');
      din = from.format("YYYY-MM-DDTHH:mm:ss\\Z") + "/" + till.format("YYYY-MM-DDTHH:mm:ss\\Z");

      var label = Math.abs(from.diff(till, 'days')) + " days";

      var span = {
        'from': from,
        'till': till,
        'din': din,
        'label': label,
        'mode': 'range'
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
      var from = moment().startOf('day');
      var till = moment().endOf('day');
      var label = type;
      var din;
      var mode;

      switch (type) {
        case 'today':
          from = from.startOf('day');
          label = from.format("MMM D.");
          mode = "day";
          break;
        case 'yesterday':
          from = from.subtract('days', 1).startOf('day');
          till = till.subtract('days', 1).endOf('day');
          label = from.format("MMM D.");
          mode = "day";
          break;
        case 'lastWeek':
          from = from.subtract('weeks', 1).startOf('week');
          till = till.subtract('weeks', 1).endOf('week');          
          label = "last week (" + from.week() + ")";
          mode = "week";
          break;
        case 'thisWeek':
          from = from.startOf('week');
          label = "this week (" + from.week() + ")";
          mode = "week";
          break;
        case 'lastMonth':
          from = from.subtract('months', 1).startOf('month');
          till = till.subtract('months', 1).endOf('month');
          label = from.format("MMM/YYYY");
          mode = "month";
          break;
        case 'thisMonth':
          from = from.startOf('month');
          label = from.format("MMM/YYYY");
          mode = "month";
          break;
        case 'thisYear':
          from = from.startOf('year');
          label = "year " + from.format("YYYY");
          mode = "year"
          break;
        case 'lastYear':
          from = from.subtract('months', 1).startOf('month');
          till = till.subtract('months', 1).endOf('month');
          label = "year " + from.format("YYYY");
          mode = "year"
          break;
      }

      din = from.format("YYYY-MM-DDTHH:mm:ss\\Z") + "/" + till.format("YYYY-MM-DDTHH:mm:ss\\Z");

      var span = {
        'from': from,
        'till': till,
        'din': din,
        'label': label,
        'mode': mode
      };
      return span;
    },

    getNearbyPeriode: function(method) {
      var timespan = window.settings.get('timespan');
      var mode = timespan.mode;
      var from = moment(timespan.from);
      var till = moment(timespan.till);

      var newFrom, newTill, newLabel;

      switch (mode) {
        case 'range':
          var diff = till.diff(from); 
          newFrom = from[method](diff).startOf('day');
          newTill = till[method](diff).endOf('day');
          newLabel = Math.abs(from.diff(till, 'days')) + " days";
          break;
        case 'day':
          newFrom = from[method]('days', 1).startOf('day');
          newTill = till[method]('days', 1).endOf('day');
          newLabel = newFrom.format("MMM D.");
          break;
        case 'month':
          newFrom = from[method]('months', 1).startOf('month');
          newTill = till[method]('months', 1).endOf('month');
          newLabel = newFrom.format("MMM/YYYY");
          break;
        case 'week':
          newFrom = from[method]('weeks', 1).startOf('week');
          newTill = till[method]('weeks', 1).endOf('week');
          newLabel = "c-week " + newFrom.week();
          break;
        case 'year':
          newFrom = from[method]('years', 1).startOf('year');
          newTill = till[method]('years', 1).endOf('year');
          newLabel = "year " + newFrom.format("YYYY");
          break;
        default:
          newFrom = from;
          newTill = till;
          newLabel = timespan.label;
          break;
      }

      return {
        'from': newFrom,
        'till': newTill,
        'din': newFrom.format("YYYY-MM-DDTHH:mm:ss\\Z") + "/" + newTill.format("YYYY-MM-DDTHH:mm:ss\\Z"),
        'label': newLabel,
        'mode': mode
      };
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
    },

    listContainsId: function(list, id) {
      return list.any(function(elem) {return elem.get('id') == id || elem.id == id});
    }

  };
})();