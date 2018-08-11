(function() {

    $.fatNav();
}());

var PageTransitions = (function() {

  var $main = $( '#main' ),
  $pages = $main.children( 'div.pt-page' ),
  animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  },
  animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
  support = Modernizr.cssanimations,
  $currPage = $('#home-page'),
  $nextPage,
  endCurrPage = false,
  endNextPage = false,
  outClass = 'pt-page-scaleDownUp',
  inClass = 'pt-page-scaleUp pt-page-delay300';

  function init() {
    $pages.each( function() {
      var $page = $( this );
      $page.data( 'originalClassList', $page.attr( 'class' ) );
    } );

    $currPage.addClass( 'pt-page-current' );

    $('#main a, #nav-bar a').on('click', function (event) {
      var link = $(this).attr('data-link');
      var pageName = link.split('-')[0];
      $nextPage = $('#' + pageName + '-page');
      $nextPage.addClass( 'pt-page-current' );
      changePage();
    });
  }

  function changePage() {

    $currPage.addClass( outClass ).on( animEndEventName, function() {
      $currPage.off( animEndEventName );
      endCurrPage = true;
      if( endNextPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

    $nextPage.addClass( inClass ).on( animEndEventName, function() {
      $nextPage.off( animEndEventName );
      endNextPage = true;
      if( endCurrPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

    if( !support ) {
      onEndAnimation( $currPage, $nextPage );
    }
  }

  function onEndAnimation( $outpage, $inpage ) {
    endCurrPage = false;
    endNextPage = false;
    resetPage( $outpage, $inpage );
    $currPage = $nextPage;
  }

  function resetPage( $outpage, $inpage ) {
    $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
    $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
  }

  init();

  return {
    init: init,
    changePage: changePage
  }

}());
