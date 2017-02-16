$(function(){
  $('form textarea').on('input', function(event){
    const currentCount =  140 - $(this).val().length;
    const counter = $(this).closest('form').find('.counter');
    counter.css('color', currentCount < 0 ? 'red' : 'black');
    counter.text(currentCount);
  });
});