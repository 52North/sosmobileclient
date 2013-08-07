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