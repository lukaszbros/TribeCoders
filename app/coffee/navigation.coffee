$(document).ready ->  
  cl = new CanvasLoader('canvasloader-container')
  cl.setColor('#dddddd')
  cl.setShape('spiral')
  cl.setDiameter(121)
  cl.setDensity(21) 
  cl.setSpeed(1)
  
  getParameterByName = (name) ->
    name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]')
    regexS = '[\\?&]' + name + '=([^&#]*)'
    regex = new RegExp(regexS)
    results = regex.exec(window.location.search)
    if(results == null)
      return ''
    else
      return decodeURIComponent(results[1].replace(/\+/g, ' '))
  
  runHistory = ()->
    return false unless History.enabled
    History.Adapter.bind window,'statechange', ->
      state = History.getState()
      forward = getParameterByName('forward')
      if (forward && forward != '')
        History.pushState(null, null, forward)
        return;  
      $('#main_content').load state.url, ->        
        cl.hide()
        $(@).fadeIn('fast')      
        urlArray = state.url.split('/')
        address = urlArray[urlArray.length-1]
        if (_gaq?)
          _gaq.push(['_trackPageview', address])     
        $('footer').fadeIn 'fast'
      
  runHistory()
  
  forward = getParameterByName('forward')
  if (forward && forward != '')
    $('#main-background').fadeOut 'fast'
    History.pushState(null, null, forward)
    
  #Load page animation function
  loadContent = (address) ->
    state = History.getState()
    urlArray = state.url.split('/')
    if (urlArray[urlArray.length-1] == address) 
      return;      
    $('#main_content').fadeOut 'fast', ->
      cl.show()
      History.pushState(null,null,address)
          
  isMenuOpen = false;
  openMenu = () ->
    $('#menu').animate({left: '0'})
    $('#menu-button').animate({left: '200'})
    isMenuOpen = true    
  closeMenu = () ->
    $('#menu').animate({left: '-195'})
    $('#menu-button').animate({left: '5'})
    isMenuOpen = false
    
  $('#menu').on 'click', '#menu-button', (event) ->
    event.preventDefault()
    if isMenuOpen
      closeMenu()
    else
      openMenu()
      
  #All links
  $('body').on 'click', 'a:not(.direct)', (event) ->
    event.preventDefault()
    href = $(@).attr('href')
    loadContent(href)
    closeMenu()
    $('#main-background').fadeOut 'fast'
    
  $('body').on 'click', '#index-logo', (event) ->
    History.pushState(null,null,'base.html')
    $('#main_content').fadeOut 'fast'
    event.preventDefault()
    closeMenu()
    $('#main-background').fadeIn 'fast'
   
  $('body').on 'mouseenter', '.opacity-hover', ->
      $(this).stop().fadeTo( "fast" , 1)
  $('body').on 'mouseleave', '.opacity-hover', ->
      $(this).stop().fadeTo( "fast" , 0.8)
      
  $('body').on 'mouseenter', '.opacity-hover-revert', ->
      $(this).stop().fadeTo( "fast" , 0.7)
  $('body').on 'mouseleave', '.opacity-hover-revert', ->
      $(this).stop().fadeTo( "fast" , 1)

