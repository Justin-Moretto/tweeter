/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//const $tweet = createTweetElement(tweetData);




$(document).ready(() => {
  
  const createTweetElement = (tweetData) => {
    return `<article class="tweet">
            <div class="tweeter">
              <div>${tweetData.user.name}</div>
              <div>${tweetData.user.handle}</div>
            </div>
            <p class="tweeter">${tweetData.content.text}</p>
            <footer>
              <div>${tweetData.created_at}</div>
              <div>Flag, Retweet, Like</div>
            </footer>
            </article>`
  };
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#timeline').prepend(createTweetElement(tweet));
    }
  }

  //submit tweet to the database when submit buttom is clicked
  $('form').on('submit', event => {
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $('form').serialize()
    }).then(() => {
      loadTweets();
    })
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