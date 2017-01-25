/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "<script>alert('uh oh!');</script>Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  tweets.forEach(function(item){
    // return console.log(i)
    return createTweetElement(item)
  })
}
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet) {
  //HTML elements
  let $tweet = $('<article>').addClass('tweet');
  const header = ('<header></header>');
  const paragraph = ('<p></p>');
  const footer = ('<footer></footer>');
  const time = ('<time></time>');
  const iconNav = ('<nav></nav>')
  let iconSocial = ('<i class="fa fa-%data%" aria-hidden="true"></i>');
  const flagIcon = $('<i>').addClass('fa fa-flag').attr('aria-hidden', true)

  //Preformatted variables
  const name = tweet.user.name;
  const handle = tweet.user.handle;
  const avatar = tweet.user.avatars.small;
  let text = tweet.content.text;
  const timeCreated = tweet.created_at;
  text = escape(text)
  //Formatted Variables header
  const $name = $('<h2>').text(name)
  const $handle = $('<h6>').text(handle)
  const $headerName = $(header).append($name).append($handle)
  $tweet = $($tweet).append($headerName)

  //Formatted Variables paragraph
  const $formatParagraph = $(paragraph).text(text)
  $tweet = $($tweet).append($formatParagraph)

  //Formatted Variables footer
  let $formatFooter = $(footer).append($(time).append(toDateTime(timeCreated)))//*TODO: convert time to days ago
  let iconFlag = iconSocial.replace('%data%', 'flag');
  let iconRetweet = iconSocial.replace('%data%', 'retweet');
  let iconHeart = iconSocial.replace('%data%', 'heart')
  let $icons = $(iconNav).addClass('icons').append(iconFlag).append(iconRetweet).append(iconHeart);
  $($formatFooter).append($icons)


  $tweet = $($tweet).append($formatFooter)

  // console.log('new header', $newName);
  // const newHeader = $tweet.append($header);
  //Finally append everything to tweet-container
  $tweet = $('#tweets-container').append($tweet)
  return $tweet
   // console.log('new header', $('#tweets-container').append('<div>hiellll</div>'))

  // return $tweet;
}

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

renderTweets(data);