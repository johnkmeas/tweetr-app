$(function(){
  $('form textarea').on('keyup', function(event){
    const currentCount =  140 - $(this).val().length;
    const counter = $(this).siblings('.counter');
    counter.css('color', currentCount < 0 ? 'red' : 'black');
    return counter.text(currentCount);
  });
});