(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';var $wrap = $('#content-wrapper');
var links = document.querySelectorAll('a');

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function (e) {
    e.preventDefault();
    var el = e.toElement;
    if (window.location === el.href) {
      return;
    }
    var pageTitle = el.title ? el.title : el.textContent;
    pageTitle = el.getAttribute("rel") === "home" ? pageTitle : pageTitle + " â€” Acme";
    History.pushState(null, pageTitle, el.href);
  });
}

History.Adapter.bind(window, 'statechange', function () {
  var state = History.getState();

  $.get(state.url, function (res) {
    $.each($(res), function (index, elem) {
      if ($wrap.selector !== "#" + elem.id) {
        return;
      }
      $wrap.html($(elem).html());
    });

  });
});

function start() {
  // GLOBAL VARIABLES
  var _document = document;var body = _document.body;

  var navButton = document.getElementById('js--nav-button');
  var navClose = document.getElementById('js--nav-close');
  var nav = document.getElementById('js--global-nav');

  navButton.addEventListener('click', function () {
    nav.classList.add('nav--open');
  });

  navClose.addEventListener('click', function () {
    nav.classList.remove('nav--open');
  });


  // Abstract Modal
  var abstractModal = document.querySelector('.abstract-modal');
  var abstractModalButton = document.getElementById('js--abstract-button');
  var abstractModalClose = document.getElementById('js--abstract-close');

  if (abstractModalButton && abstractModalClose) {
    abstractModalButton.addEventListener('click', function () {
      abstractModal.classList.add('abstract-modal--open');
      body.classList.add('body--no-scroll');
    });

    abstractModalClose.addEventListener('click', function () {
      abstractModal.classList.remove('abstract-modal--open');
      body.classList.remove('body--no-scroll');
    });
  }
}

},{}]},{},[1])
//# sourceMappingURL=jolt.js.map
