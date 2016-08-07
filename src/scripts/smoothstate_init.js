/* global start, smoothState, ga */

$(document).ready(() => {
  start();
});


$(() => {
  const $body = $('html, body');
  const options = {
    prefetch: true,
    cacheLength: 2,
    allowFormCaching: false,
    forms: 'form',
    loadingClass: 'is-loading',
    blacklist: '.no-smoothState',

    onStart: {
      duration: 650, // Duration of our animation
      render($container) {
        // Add your CSS animation reversing class
        $container.addClass('is-exiting');

        console.log('animating!');

        $body.animate({
          scrollTop: 0,
        });
        // Restart your animation
        smoothState.restartCSSAnimations();
      },
    },
    onReady: {
      duration: 0,
      render($container, $newContent) {
        // Remove your CSS animation reversing class
        $container.removeClass('is-exiting');

        // Inject the new content
        $container.html($newContent);
      },
    },

    onAfter() {
      start();

      ga('set', { page: document.location.pathname, title: document.title });
      ga('send', 'pageview');
    },
  };

  const smoothState = $('#content-wrapper').smoothState(options).data('smoothState');
});
