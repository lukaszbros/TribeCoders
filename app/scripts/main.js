(function() {
  'use strict';
  $(document).ready(function() {
    var cl, closeMenu, forward, getParameterByName, highlightMenu, isMenuOpen, loadContent, openMenu, runHistory;
    cl = new CanvasLoader('canvasloader-container');
    cl.setColor('#dddddd');
    cl.setShape('spiral');
    cl.setDiameter(121);
    cl.setDensity(21);
    cl.setSpeed(1);
    getParameterByName = function(name) {
      var regex, regexS, results;
      name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
      regexS = '[\\?&]' + name + '=([^&#]*)';
      regex = new RegExp(regexS);
      results = regex.exec(window.location.search);
      if (results === null) {
        return '';
      } else {
        return decodeURIComponent(results[1].replace(/\+/g, ' '));
      }
    };
    runHistory = function() {
      if (!History.enabled) {
        return false;
      }
      return History.Adapter.bind(window, 'statechange', function() {
        var forward, state;
        state = History.getState();
        forward = getParameterByName('forward');
        if (forward && forward !== '') {
          History.pushState(null, null, forward);
          return;
        }
        return $('#main_content').load(state.url, function() {
          var address, urlArray;
          cl.hide();
          $(this).fadeIn('fast');
          urlArray = state.url.split('/');
          address = urlArray[urlArray.length - 1];
          if ((typeof _gaq !== "undefined" && _gaq !== null)) {
            _gaq.push(['_trackPageview', address]);
          }
          highlightMenu(address);
          return $('footer').fadeIn('fast');
        });
      });
    };
    runHistory();
    forward = getParameterByName('forward');
    if (forward && forward !== '') {
      History.pushState(null, null, forward);
    } else {

    }
    highlightMenu = function(address) {
      $('#menu a').removeAttr('style');
      switch (address) {
        case 'about.html':
          return $('#menu a#about').stop().animate({
            color: '#e62799'
          });
        case 'services.html':
          return $('#menu a#services').stop().animate({
            color: '#e62799'
          });
        case 'methodology.html':
          return $('#menu a#methodology').stop().animate({
            color: '#00aed9'
          });
        case 'portfolio.html':
          return $('#menu a#portfolio').stop().animate({
            color: '#00c376'
          });
        default:
          return $('#menu a#contact').stop().animate({
            color: '#e62799'
          });
      }
    };
    loadContent = function(address) {
      var state, urlArray;
      state = History.getState();
      urlArray = state.url.split('/');
      if (urlArray[urlArray.length - 1] === address) {
        return;
      }
      $('footer').fadeOut('fast', function() {});
      return $('#main_content').fadeOut('fast', function() {
        cl.show();
        return History.pushState(null, null, address);
      });
    };
    isMenuOpen = false;
    openMenu = function() {
      $('#menu').animate({
        left: '0'
      });
      $('#menu-button').animate({
        left: '200'
      });
      return isMenuOpen = true;
    };
    closeMenu = function() {
      $('#menu').animate({
        left: '-190'
      });
      $('#menu-button').animate({
        left: '10'
      });
      return isMenuOpen = false;
    };
    $('#menu').on('click', '#menu-button', function(event) {
      event.preventDefault();
      if (isMenuOpen) {
        return closeMenu();
      } else {
        return openMenu();
      }
    });
    $('body').on('click', 'a:not(.direct)', function(event) {
      var href;
      event.preventDefault();
      href = $(this).attr('href');
      loadContent(href);
      return closeMenu();
    });
    $('body').on('click', '.project', function() {
      return loadContent('portfolio-' + $(this).attr('id') + '.html');
    });
    return loadContent('about.html');
  });

}).call(this);

//# sourceMappingURL=../../app/maps/main.js.map
