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
          if (address === 'base.html') {
            return $('#main-background').fadeIn('fast', function() {});
          } else {
            return $('footer').fadeIn('fast');
          }
        });
      });
    };
    runHistory();
    forward = getParameterByName('forward');
    if (forward && forward !== '') {
      if (forward === 'base.html') {
        $('#main-background').fadeIn('fast');
        $('footer').fadeOut('fast');
      } else {
        $('#main-background').fadeOut('fast');
        $('footer').fadeIn('fast');
      }
      History.pushState(null, null, forward);
    }
    loadContent = function(address) {
      var state, urlArray;
      state = History.getState();
      urlArray = state.url.split('/');
      if (urlArray[urlArray.length - 1] === address) {
        return;
      }
      console.log(address);
      if (address === 'base.html') {
        $('footer').fadeOut('fast', function() {});
        return $('#main_content').fadeOut('fast', function() {
          cl.show();
          return History.pushState(null, null, address);
        });
      } else {
        return $('#main-background').fadeOut('fast', function() {
          return $('#main_content').fadeOut('fast', function() {
            cl.show();
            return History.pushState(null, null, address);
          });
        });
      }
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
      return closeMenu();
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

  $(document).ready(function() {
    var open;
    open = false;
    return $('body').on('click', '.more', function(event) {
      return $('.content').animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 'slow', function() {
        if (open) {
          open = false;
          return $('.more span').text('more');
        } else {
          open = true;
          return $('.more span').text('less');
        }
      });
    });
  });

}).call(this);

//# sourceMappingURL=../../app/maps/main.js.map
