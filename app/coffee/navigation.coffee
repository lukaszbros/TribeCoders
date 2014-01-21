'use strict' 

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
        highlightMenu(address);
        $('footer').fadeIn 'fast'
      
  runHistory()
  
  forward = getParameterByName('forward')
  if (forward && forward != '')
    History.pushState(null, null, forward)
  else
    #Home page load
    #History.pushState(null, null, 'index.html')
    
  #Select logo text depending on shown address
  #selectLogo = (address)->
  #  address = address.split("/")[-1]
  #  switch address
  #    when 'home.html' then $('#logo .absolut-center').html('Tribity <span class="ux">UX</span> <span class="design">Design</span> <span class="software">Software</span>')
  #    when 'work.html' then $('#logo .absolut-center').html('Tribity<span class="subpage"> - work</span>')
  #    when 'contact.html' then $('#logo .absolut-center').html('Tribity<span class="subpage"> - contact</span>')
  #    when 'company.html' then $('#logo .absolut-center').html('Tribity<span class="subpage"> - company</span>')
        
  highlightMenu = (address) ->
    $('#menu a').removeAttr('style');
    switch address
      when 'about.html' then $('#menu a#about').stop().animate({color: '#e62799'})
      when 'services.html' then $('#menu a#services').stop().animate({color: '#e62799'})
      when 'methodology.html' then $('#menu a#methodology').stop().animate({color: '#00aed9'})
      when 'portfolio.html' then $('#menu a#portfolio').stop().animate({color: '#00c376'})
      else $('#menu a#contact').stop().animate({color: '#e62799'})
        
    
  #Load page animation function
  loadContent = (address) ->
    state = History.getState()
    urlArray = state.url.split('/')
    if (urlArray[urlArray.length-1] == address) 
      return;      
    $('#main_content').fadeOut 'fast', ->
      cl.show()
      History.pushState(null,null,address)

  #Back to home page by clicking logo      
  #$('#logo').click ->
  #  loadContent('home.html');
          
  isMenuOpen = false;
  openMenu = () ->
    $('#menu').animate({left: '0'})
    $('#menu-button').animate({left: '200'})
    isMenuOpen = true    
  closeMenu = () ->
    $('#menu').animate({left: '-190'})
    $('#menu-button').animate({left: '10'})
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
    
  $('body').on 'click', '.project', ->
    loadContent('portfolio-' + $(@).attr('id') + '.html')

  #Load bease page
  loadContent('about.html')  
    
  #Hover efect on logo
  #$('body').on 'mouseenter ', '#logo .absolut-center', () -> $(@).stop().animate({color: "#cccccc"})
  #$('body').on 'mouseleave ', '#logo .absolut-center', ()  -> $(@).stop().animate({color:'#333333'})  
