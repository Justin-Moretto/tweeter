//helper functions for modularity

//takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = (tweetData) => {
  let timeAgo = dateParser(tweetData.created_at);
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
            <div> Tweeted ${timeAgo}</div>
            <div>
              <i class="fa fa-flag"></i>
              <i class="fa fa-retweet"></i>
              <i class="fa fa-heart"></i>
            </div>
          </footer>
          </article>`
}

