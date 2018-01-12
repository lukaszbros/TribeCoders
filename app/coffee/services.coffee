$(document).ready ->  
  openWeb=false
  openMobile=false
  openOutsourcing=false
  $('body').on 'click', '.more-team-building', (event) ->
    $('.content-team-building').animate { height: 'toggle', opacity: 'toggle' }, 'slow', ->
      if openWeb
        openWeb=false
        $('.more-team-building  span').text('more');
      else
        openWeb=true
        $('.more-team-building  span').text('less');

  $('body').on 'click', '.more-web', (event) ->    
    $('.content-web').animate { height: 'toggle', opacity: 'toggle' }, 'slow', ->
      if openWeb
        openWeb=false
        $('.more-web span').text('more');        
      else
        openWeb=true
        $('.more-web span').text('less');        
        
  $('body').on 'click', '.more-mobile', (event) ->    
    $('.content-mobile').animate { height: 'toggle', opacity: 'toggle' }, 'slow', ->
      if openMobile
        openMobile=false
        $('.more-mobile span').text('more');        
      else
        openMobile=true
        $('.more-mobile span').text('less');
        
  $('body').on 'click', '.more-outsourcing', (event) ->    
    $('.content-outsourcing').animate { height: 'toggle', opacity: 'toggle' }, 'slow', ->
      if openOutsourcing
        openOutsourcing=false
        $('.more-outsourcing span').text('more');        
      else
        openOutsourcing=true
        $('.more-outsourcing span').text('less');