$(document).ready(function() {
    start();
});


$(function(){
  'use strict';
  var $body    = $('html, body');
  var options = {
    prefetch: true,
    cacheLength: 2,
    
    onStart: {
      duration: 500, // Duration of our animation
      render: function ($container) {
        
        // Add your CSS animation reversing class
        $container.addClass('is-exiting');
        
        $body.animate({
          scrollTop: 0
        });
        
        // Restart your animation
        smoothState.restartCSSAnimations();
      }
    },
    
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        // Remove your CSS animation reversing class
        $container.removeClass('is-exiting');

        // Inject the new content
        $container.html($newContent);
      }
    },
    
    onAfter: function($container) {
      start();

      ga('set', { 'page': document.location.pathname, 'title': document.title });
      ga('send', 'pageview');
    }
  },
  smoothState = $('#main').smoothState(options).data('smoothState');
});