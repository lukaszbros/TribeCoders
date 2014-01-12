(function() {
  'use strict';
  $(document).ready(function() {
    var cl, forward, getParameterByName, highlightMenu, loadContent, runHistory;
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
    runHistory = function(window) {
      var history;
      history = window.History;
      if (!history.enabled) {
        return false;
      }
      return history.Adapter.bind(window, 'statechange', function() {
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
          _gaq.push(['_trackPageview', address]);
          highlightMenu(address);
          return $('footer').fadeIn('fast');
        });
      });
    };
    runHistory(window);
    forward = getParameterByName('forward');
    if (forward && forward !== '') {
      History.pushState(null, null, forward);
    } else {
      History.pushState(null, null, 'home.html');
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
    $('body').on('click', 'a:not(.direct)', function(event) {
      var href;
      event.preventDefault();
      href = $(this).attr('href');
      return loadContent(href);
    });
    return $('body').on('click', '.project', function() {
      return loadContent('portfolio-' + $(this).attr('id') + '.html');
    });
  });

}).call(this);

/*
//# sourceMappingURL=../../app/maps/main.js.map
*/