//helper functions for modularity

//Note to self: refactor this hacky function
const dateParser = function (date) {
  const dateCreated = new Date(date);
  const currentDate = new Date();
  let output = '';

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (dateCreated.getFullYear() === currentDate.getFullYear()) {
    if (months[dateCreated.getMonth()] === months[currentDate.getMonth()]) {
      if (dateCreated.getDate() === currentDate.getDate()) {
        if (dateCreated.getHours() === currentDate.getHours()) {
          if (dateCreated.getMinutes() === currentDate.getMinutes()) {
            output = `A few seconds ago`;
          } else {
            output = `${currentDate.getMinutes() - dateCreated.getMinutes()} minutes ago`;
          }
        } else {
          output = `${currentDate.getHours() - dateCreated.getHours()} hours ago`;
        }
      } else {
        output = `${months[currentDate.getMonth()] - months[dateCreated.getMonth()]} days ago`;
      }
    } else {
      output = `A while ago`;
    }
  } else {
    output = `${currentDate.getFullYear() - dateCreated.getFullYear()} years ago`;
  }

  return output;
};

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

//take in an array of tweet objects and  prepend them to the #timeline
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    $('#timeline').prepend(createTweetElement(tweet));
  }
}

//Get all tweets and load them to page in order, starting with most recent
const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'JSON',
  }).then((res) => {
    renderTweets(res);
  });
}

//Button scrolls to top of the page
const topScroll = function () {
  $(document).scroll(function () {
    if ($(window).scrollTop() > 200) {
      $("div.to-top")
        .show(300)
        .on("click", function () {
          $(document).off("scroll");
          $("html, body").stop(true, false).animate({ scrollTop: "0" }, 300, () => {
            $("div.to-top").hide(300);
            $(document).scroll(topScroll);
          });
        });
    }
  });
};

//Toggle new tweet area
const navToggle = function () {
  $(".write-tweet")
    .on("click", function () {
      $("section.new-tweet").slideToggle(400, function () {
        $(this).find(".tweet-text").focus();
      });
    });
};