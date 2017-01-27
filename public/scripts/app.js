/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function(){
  //Render Tweet
  function renderTweets(tweets) {
    tweets.forEach(function(item) {
      var $tweet = createTweetElement(item);
      $('#tweets-container').append($tweet);
    });
  }

  //Escape
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function loadTweets(x) {
    // $('article').remove()
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (morePostsHtml) {
        if(x === true){
          var singleData = [];
          singleData.push(morePostsHtml[morePostsHtml.length - 1]);
          renderTweets(singleData);
        } else {
          renderTweets(morePostsHtml);
        }
      }
    });
  }

  loadTweets();

  function createTweetElement(tweet) {
    //HTML elements
    var $tweet = $('<article>').addClass('tweet');
    var header = $('<header>');
    var paragraph = $('<p>');
    var footer = $('<footer>');
    var time = $('<time>');
    var iconNav = $('<nav>');
    var icony = $('<i>')
    var iconSocial = ('<i class="fa fa-%data%" aria-hidden="true"></i>');
    var flagIcon = $('<i>').addClass('fa fa-%data%').attr('aria-hidden', true);

    //Preformatted variables
    var name = tweet.user.name;
    var handle = tweet.user.handle;
    var avatar = tweet.user.avatars.small;
    var text = tweet.content.text;
    var timeCreated = moment(tweet.created_at).fromNow();
    text = escape(text);

    //Formatted Variables header
    var imageAvatar = $('<img>').attr('src', avatar);
    var $name = $('<h2>').text(name);
    var $handle = $('<h6>').text(handle);
    var $headerName = $(header).append(imageAvatar).append($name).append($handle);
    $tweet.append($headerName);

    //Formatted Variables paragraph
    var $formatParagraph = $(paragraph).text(text);
    $tweet.append($formatParagraph);

    //Formatted Variables footer
    var $formatFooter = $(footer).append($(time).append(timeCreated));//*TODO: convert time to days ago
    var iconFlag = iconSocial.replace('%data%', 'flag');
    var iconRetweet = iconSocial.replace('%data%', 'retweet');
    var iconHeart = iconSocial.replace('%data%', 'heart');
    iconHeart = $(iconHeart).attr('data-likes', 0).text('0');
    var $icons = $(iconNav).addClass('icons').append(iconFlag).append(iconRetweet).append(iconHeart);
    $($formatFooter).append($icons);

    $tweet.append($formatFooter);
    return $tweet;
  }

  //Hides the input field on default
  $('.new-tweet').hide();
  $('.compose').click(function(){
    if ($(".new-tweet").is(':hidden')) {
      $('.new-tweet').slideDown('fast');
      $('textarea').focus();
    } else {
      $('.new-tweet').slideUp('fast');
    }
  });

  $('#tweets-container').on('click', '.fa.fa-heart', function(event){
    //console.log($(this).data('likes'))
    $.ajax({
        url: '/tweets',
        data: 'some words to put in heart',
        method: 'PUT',
        success: function (morePostsHtml) {
          alert('Load was performed.', morePostsHtml);
      }
    });
    // if($(this).data('likes') === 0){
    //   $(this).data('likes', 1);
    //   $(this).css('color', 'red')
    // }else {
    //   $(this).data('likes', 0)
    //   $(this).css('color', '#00a087')
    // }
    // $(this).css('color', 'red')
  })

  //These are for buttons variables and function
  var $button = $('.new-tweet form');

  $button.on('submit', function (event) {

    event.preventDefault();
    var input = $( this ).serialize();
    var text = input.slice(5);

    if(text.length <= 0){
      alert('Oops! You need to write something.');
    }
    else if(text.length > 140){
      alert('You entered too many characters. The limit is 140.');
    } else {
      $.ajax({
        url: '/tweets',
        data: input,
        method: 'POST',
        success: function (morePostsHtml) {
          $($button)[0].reset();
          $('.counter').text('140');
          loadTweets(true);
        }
      });
    }
  });
});