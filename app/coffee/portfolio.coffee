$(document).ready ->
  
  #selecting filtering option
  $("body").on "click", ".select", (event) ->
    event.preventDefault()
    id = $(this).attr('id');
    console.log(id)
    switch id
      when "all" 
        $(".blackandwhite").stop().fadeTo( "fast" , 0.01)  
        $("#selector .arrow-down").animate ({left:"-150px"})
      when "team"
        $(".blackandwhite").stop().fadeTo( "fast" , 1)
        $(".team").stop().fadeTo( "fast" , 0.01)
        $("#selector .arrow-down").animate ({left:"-50px"})
      when "web"
        $(".blackandwhite").stop().fadeTo( "fast" , 1) 
        $(".web").stop().fadeTo( "fast" , 0.01)      
        $("#selector .arrow-down").animate ({left:"-50px"})
      when "mobile"
        $(".blackandwhite").stop().fadeTo( "fast" , 1)  
        $(".mobile").stop().fadeTo( "fast" , 0.01)      
        $("#selector .arrow-down").animate ({left:"50px"})      
      when "design" 
        $(".blackandwhite").stop().fadeTo( "fast" , 1)
        $(".design").stop().fadeTo( "fast" , 0.01) 
        $("#selector .arrow-down").animate ({left:"150px"})            
  
  #Saturation and desaturation of portfolio  
  $("body").on "mouseenter", ".blackandwhite", ->
    $(this).stop().fadeTo( "fast" , 0.01)
  $("body").on "mouseleave", ".blackandwhite", ->
    $(this).stop().fadeTo( "fast" , 1) 
    
