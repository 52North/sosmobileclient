var TimeseriesData = (function() {
  return Backbone.Model.extend({
    storage: new StorageService(),
    subscriptions: {
      'app:exit:immediately': 'abort',
      'timeseries:delete': 'abortIf'
    },

    initialize: function() {
      this.set('synced', false);
    },

    fetch: function() {
      //Caching goes here!

      var timespan = this.get('timespan').din;
      var timeseriesMetaData = this.get('timeseriesMetaData');
      var timeseriesId = timeseriesMetaData.get('id');
      var context = this;

      this.xhr = $.ajax({
        type: "GET",
        url: "http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/timeseries/" + timeseriesId + "/getData",
        data: { timespan: timespan} //, expanded: false}
      }).done(function(data) {
        var values = [];
        _.each(data.values, function(elem) {
          values.push([elem.timestamp, elem.value]);
        }, context)

        //if no data available - meta.set('noData', true) - else set to false!
        if (data.values.length == 0) {
          timeseriesMetaData.set('noCurrentData', true);
        } else {
          timeseriesMetaData.set('noCurrentData', false);
        }

        context.set('values', values);
        context.set('synced', true);
        context.trigger("sync", context);
  
        console.log("##### done " + timeseriesId);
      }).fail(function(xhr, textStatus) {
        console.log("##### fail " + timeseriesId);
        if (xhr.status != 0) { //abort
          context.set('synced', true);
          console.log(xhr);
          Helpers.showErrorMessage('Status ' + xhr.status, 'Could not fetch timeseries data with id: ' + timeseriesId + ".<br/>The server responded with: " + textStatus);
        }

      }).always(function() {
        console.log("##### end " + timeseriesId);
      });
    },

    abort: function() {
      this.set('synced', true);
      this.xhr.abort();
    }
   
  });
})();