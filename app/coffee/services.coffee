$(document).ready ->  
  open=false
  
  $('body').on 'click', '.more', (event) ->    
    $('.content').animate { height: 'toggle', opacity: 'toggle' }, 'slow', ->
      if open
        open=false
        $('.more span').text('more');        
      else
        open=true
        $('.more span').text('less');        
    