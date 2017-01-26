/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json
$(function(){
  function renderTweets(tweets) {
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
    tweets.forEach(function(item){
      return createTweetElement(item)
    })
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
    var $button = $('.new-tweet form');
      $button.submit(function (event) {

        event.preventDefault();
        var input = $( this ).serialize();
        var text = input.slice(5)
        console.log( input.length )
        if(text.length <= 0){
          alert('Error, tweet is empty')
        }
        else if(text.length > 140){
          alert('Error, characters exceed 140')
        } else {
          console.log('Button clicked, performing ajax call...');
          $.ajax({
            url: '/tweets',
            data: input,
            method: 'POST',
            success: function (morePostsHtml) {
              console.log('POST Success: ', morePostsHtml);
              //$button.replaceWith(morePostsHtml);
              $($button)[0].reset();
              $('.counter').text('140')
              loadTweets(true);
            }
          });
        }
      });

  $( ".new-tweet" ).hide()
  $('.compose').click(function(){
    if ( $( ".new-tweet" ).is( ":hidden" ) ) {
      $( ".new-tweet" ).slideDown( "fast" )
      $('textarea').focus();
    } else {
      $( ".new-tweet" ).slideUp( "fast" );
    }
  })
  function loadTweets(x) {
    // $('article').remove()
      $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function (morePostsHtml) {
          if(x === true){
            var singleData = []
            singleData.push(morePostsHtml[morePostsHtml.length - 1])

            renderTweets(singleData)
          } else {
            renderTweets(morePostsHtml)
          }
        }
      });
  }
  loadTweets()

  function createTweetElement(tweet) {
    //HTML elements
    let $tweet = $('<article>').addClass('tweet');
    const header = $('<header>');

    const paragraph = $('<p>');
    const footer = $('<footer>');
    const time = $('<time>');
    const iconNav = $('<nav>')
    let iconSocial = ('<i class="fa fa-%data%" aria-hidden="true"></i>');
    const flagIcon = $('<i>').addClass('fa fa-%data%').attr('aria-hidden', true)

    //Preformatted variables
    const name = tweet.user.name;
    const handle = tweet.user.handle;
    const avatar = tweet.user.avatars.small;
    let text = tweet.content.text;
    const timeCreated = moment(tweet.created_at).fromNow();
    text = escape(text)

    //Formatted Variables header
    var imageAvatar = $('<img>').attr('src', avatar);
    const $name = $('<h2>').text(name)
    const $handle = $('<h6>').text(handle)
    const $headerName = $(header).append(imageAvatar).append($name).append($handle)
    $tweet = $($tweet).append($headerName)

    //Formatted Variables paragraph
    const $formatParagraph = $(paragraph).text(text)
    $tweet = $($tweet).append($formatParagraph)

    //Formatted Variables footer
    let $formatFooter = $(footer).append($(time).append(timeCreated))//*TODO: convert time to days ago
    let iconFlag = iconSocial.replace('%data%', 'flag');
    let iconRetweet = iconSocial.replace('%data%', 'retweet');
    let iconHeart = iconSocial.replace('%data%', 'heart')
    let $icons = $(iconNav).addClass('icons').append(iconFlag).append(iconRetweet).append(iconHeart);
    $($formatFooter).append($icons)


    $tweet = $($tweet).append($formatFooter)
    $tweet = $('#tweets-container').append($tweet)
    console.log()
    return $tweet
  }
});