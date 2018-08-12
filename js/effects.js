(function () {

  var animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  };
  var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];


  $( document ).ready(function() {
    var typewriter1 = $('#typewriter1');
    var typewriter2 = $('#typewriter2');
    typewriter1.addClass('type-cursor');
    typewriter2.css({width: '0'});
    console.log(animEndEventName)

    typewriter1.on(animEndEventName, function(){
      setTimeout( function(){
        typewriter1.removeClass('type-cursor slogan1');
        typewriter2.addClass('type-cursor slogan2');
      }, 1000)
    });

    typewriter2.on(animEndEventName, function(){
      setTimeout( function(){
        typewriter2.removeClass('type-cursor slogan2');
      }, 3000)
      typewriter2.css({width: '35%'});
    });

    typewriter1.addClass('slogan1');

  });
}());
