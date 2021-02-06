
$(document).ready(() => {
  navToggle();
  loadTweets();
  $("section.sliding").hide();
  $("section.new-tweet").hide();
  $("div.to-top").hide();
  $(document).scroll(function () {
    topScroll();
  });

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
        $("#timeline").empty();
        loadTweets();
        $("#tweet-text").val("");
        $(".counter").val(140);
      })
    }
  });
})