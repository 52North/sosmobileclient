(function() {
  Handlebars.registerHelper('getTemplate', function(name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
      $.ajax({
        url : 'js/views/templates/' + name + '.hbs',
        success : function(data) {
          if (Handlebars.templates === undefined) {
            Handlebars.templates = {};
          }
          Handlebars.templates[name] = Handlebars.compile(data);
        },
        dataType: "text",
        async : false
      });
    }
    return Handlebars.templates[name];
  });

  Handlebars.registerHelper('ifGt', function(v1, v2, options) {
    if(v1 > v2) {
      return options.fn(this)
    }
    else {
      return options.inverse(this)
    }
  });

  Handlebars.registerHelper('if_eq', function(v1, v2, options) {
    if(v1 == v2) {
      return options.fn(this)
    }
    else {
      return options.inverse(this)
    }
  });
})();