/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//const $tweet = createTweetElement(tweetData);

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(() => {
  
  const createTweetElement = (tweetData) => {
    return `<article class="tweet">
            <div class="tweeter">
              <div class="profile">
                <i class="far fa-user"></i>
                <div>${tweetData.user.name}</div>
              </div>
              <div>${tweetData.user.handle}</div>
            </div>
            <p class="tweeter">${escape(tweetData.content.text)}</p>
            <footer>
              <div>${tweetData.created_at}</div>
              <div>
                <i class="fa fa-flag"></i>
                <i class="fa fa-retweet"></i>
                <i class="fa fa-heart"></i>
              </div>
            </footer>
            </article>`
  }
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#timeline').prepend(createTweetElement(tweet));
    }
  }

  //submit tweet to the database when submit buttom is clicked
  $('form').on('submit', event => {
    event.preventDefault();
    if (!$('#tweet-text').val()) {
      $('#error').text('You can\'t submit an empty tweet!');
      $('#error').show();
    } else if ($("#tweet-text").val().length > 140) {
      $('#error').text('Tweet is too long! (140 characters max.)');
      $('#error').show();
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('form').serialize()
      }).then(() => {
        loadTweets();
      })
    }
  });

  //Get all tweets and load them to page in order, starting with most recent
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'JSON',
    }).then((res) => {
      $('#timeline').empty();
      renderTweets(res);
    });
  }
  loadTweets();
})