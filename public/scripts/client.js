/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    createTweetElement(tweet);
  }
}


const createTweetElement = (tweetData) => {
  return `<article class="tweet">
          <div class="tweeter">
            <div>${tweetData.user.name}</div>
            <div>${tweetData.user.handle}</div>
          </div>
          <p class="tweeter">${tweetData.content.text}</p>
          <footer>
            <div>10 days ago</div>
            <div>Flag, Retweet, Like</div>
          </footer>
          </article>`
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like

$(document).ready(() => {
  $('#timeline').append($tweet);
})