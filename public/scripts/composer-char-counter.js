$(function(){
  $('form textarea').on('keyup', function(event){
    const currentCount =  140 - $(this).val().length;
    const counter = $(this).siblings('.counter');
    counter.css('color', currentCount < 0 ? 'red' : 'black');
    // if ( currentCount < 0 ){
    //   counter.css('color', 'red');
    // } else {
    //   counter.css('color', 'black');
    // }
    return counter.text(currentCount);
  });
});