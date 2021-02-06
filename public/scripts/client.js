const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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

$(document).ready(() => {
  navToggle();

  const renderTweets = function (tweets) {
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
      renderTweets(res);
    });
  }
  loadTweets();
})

// Stretch: toggle new tweet
const navToggle = function () {
  $(".write-tweet")
    .on("click", function () {
      $("section.new-tweet").slideToggle(400, function () {
        $(this).find(".tweet-text").focus();
      });
    });
};

//Top Scroll
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

$(() => {
  $(document).scroll(function () {
    topScroll();
  });
});

$(() => {
  $("section.sliding").hide();
  $("section.new-tweet").hide();
  $("div.to-top").hide();
})

