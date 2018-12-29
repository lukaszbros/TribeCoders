(function() {
  $(document).ready(function() {
    var cl, closeMenu, forward, getParameterByName, isMenuOpen, loadContent, openMenu, runHistory, title;
    title = "TribeCoders help you need";
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
          History.pushState(null, title, forward);
          return;
        }
        return $('#main_content').load(state.url, function() {
          var address, pageName, urlArray;
          cl.hide();
          $(this).fadeIn('fast');
          urlArray = state.url.split('/');
          address = urlArray[urlArray.length - 1];
          if ((typeof _gaq !== "undefined" && _gaq !== null)) {
            _gaq.push(['_trackPageview', address]);
          }
          document.title = title;
          if (address === 'base.html') {
            return $('#main-background').fadeIn('fast', function() {
              $('#menu a').removeClass('selected');
              return $('footer a').removeClass('selected');
            });
          } else {
            $('footer').fadeIn('fast');
            pageName = address.substring(0, address.indexOf('.'));
            $('#menu a').removeClass('selected');
            $('footer a').removeClass('selected');
            $('#left-menu-' + pageName).addClass('selected');
            return $('#footer-menu-' + pageName).addClass('selected');
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
      History.pushState(null, title, forward);
    }
    
    //Load page animation function
    loadContent = function(address) {
      var state, urlArray;
      state = History.getState();
      urlArray = state.url.split('/');
      if (urlArray[urlArray.length - 1] === address) {
        return;
      }
      if (address === 'base.html') {
        $('footer').fadeOut('fast', function() {});
        return $('#main_content').fadeOut('fast', function() {
          cl.show();
          return History.pushState(null, title, address);
        });
      } else {
        return $('#main-background').fadeOut('fast', function() {
          return $('#main_content').fadeOut('fast', function() {
            cl.show();
            return History.pushState(null, title, address);
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
    
    //All links
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
    //selecting filtering option
    $("body").on("click", ".select", function(event) {
      var id;
      event.preventDefault();
      id = $(this).attr('id');
      console.log(id);
      switch (id) {
        case "all":
          $(".blackandwhite").stop().fadeTo("fast", 0.01);
          return $("#selector .arrow-down").animate({
            left: "-85px"
          });
        case "team":
          $(".blackandwhite").stop().fadeTo("fast", 1);
          $(".team").stop().fadeTo("fast", 0.01);
          return $("#selector .arrow-down").animate({
            left: "0px"
          });
        case "web":
          $(".blackandwhite").stop().fadeTo("fast", 1);
          $(".web").stop().fadeTo("fast", 0.01);
          return $("#selector .arrow-down").animate({
            left: "85px"
          });
        case "mobile":
          $(".blackandwhite").stop().fadeTo("fast", 1);
          $(".mobile").stop().fadeTo("fast", 0.01);
          return $("#selector .arrow-down").animate({
            left: "80px"
          });
        case "design":
          $(".blackandwhite").stop().fadeTo("fast", 1);
          $(".design").stop().fadeTo("fast", 0.01);
          return $("#selector .arrow-down").animate({
            left: "160px"
          });
      }
    });
    //Saturation and desaturation of portfolio
    $("body").on("mouseenter", ".blackandwhite", function() {
      return $(this).stop().fadeTo("fast", 0.01);
    });
    return $("body").on("mouseleave", ".blackandwhite", function() {
      return $(this).stop().fadeTo("fast", 1);
    });
  });

  $(document).ready(function() {
    var openMobile, openOutsourcing, openWeb;
    openWeb = false;
    openMobile = false;
    openOutsourcing = false;
    $('body').on('click', '.more-team-building', function(event) {
      return $('.content-team-building').animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 'slow', function() {
        if (openWeb) {
          openWeb = false;
          return $('.more-team-building  span').text('more');
        } else {
          openWeb = true;
          return $('.more-team-building  span').text('less');
        }
      });
    });
    $('body').on('click', '.more-web', function(event) {
      return $('.content-web').animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 'slow', function() {
        if (openWeb) {
          openWeb = false;
          return $('.more-web span').text('more');
        } else {
          openWeb = true;
          return $('.more-web span').text('less');
        }
      });
    });
    $('body').on('click', '.more-mobile', function(event) {
      return $('.content-mobile').animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 'slow', function() {
        if (openMobile) {
          openMobile = false;
          return $('.more-mobile span').text('more');
        } else {
          openMobile = true;
          return $('.more-mobile span').text('less');
        }
      });
    });
    return $('body').on('click', '.more-outsourcing', function(event) {
      return $('.content-outsourcing').animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 'slow', function() {
        if (openOutsourcing) {
          openOutsourcing = false;
          return $('.more-outsourcing span').text('more');
        } else {
          openOutsourcing = true;
          return $('.more-outsourcing span').text('less');
        }
      });
    });
  });

}).call(this);

//# sourceMappingURL=../maps/main.js.map
