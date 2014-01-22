(function() {
  $(document).ready(function() {
    var cl, closeMenu, forward, getParameterByName, isMenuOpen, loadContent, openMenu, runHistory;
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
          return $('footer').fadeIn('fast');
        });
      });
    };
    runHistory();
    forward = getParameterByName('forward');
    if (forward && forward !== '') {
      $('#main-background').fadeOut('fast');
      History.pushState(null, null, forward);
    }
    loadContent = function(address) {
      var state, urlArray;
      state = History.getState();
      urlArray = state.url.split('/');
      if (urlArray[urlArray.length - 1] === address) {
        return;
      }
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
        left: '-195'
      });
      $('#menu-button').animate({
        left: '5'
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
      closeMenu();
      return $('#main-background').fadeOut('fast');
    });
    $('body').on('click', '#index-logo', function(event) {
      History.pushState(null, null, 'base.html');
      $('#main_content').fadeOut('fast');
      event.preventDefault();
      closeMenu();
      return $('#main-background').fadeIn('fast');
    });
    $('body').on('mouseenter', '.opacity-hover', function() {
      return $(this).stop().fadeTo("fast", 1);
    });
    $('body').on('mouseleave', '.opacity-hover', function() {
      return $(this).stop().fadeTo("fast", 0.8);
    });
    $('body').on('mouseenter', '.opacity-hover-revert', function() {
      return $(this).stop().fadeTo("fast", 0.7);
    });
    return $('body').on('mouseleave', '.opacity-hover-revert', function() {
      return $(this).stop().fadeTo("fast", 1);
    });
  });

}).call(this);

//# sourceMappingURL=../../app/maps/main.js.map
