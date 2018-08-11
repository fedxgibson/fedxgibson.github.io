(function () {

  var root = null;
  var hash = '#!'; // Defaults to: '#'
  var router = new Navigo(root, false, hash);
  var main = '#main';

  router
    .on({
      'main': function () {
        loadHTML('home');
      },
      'about': function () {
        loadHTML('about');
      },
      'experience': function () {
        loadHTML('experience');
      },
      'skills': function () {
        loadHTML('skills')
      },
      'contact': function () {
        loadHTML('contact')
      },
      '*': function () {
        loadHTML('home')
      }
    })
    .resolve();

    router.notFound(function (query) {
      // ...
    });

    router.on(function () {
      loadHTML('home');
     });


    function loadHTML(id, data) {
      var data =  {};
      var source = $('#template-' + id).html();
      var template = Handlebars.compile(source);
      $(main).html(template(data));
    }


}());
