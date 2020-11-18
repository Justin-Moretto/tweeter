$(document).ready(function() {
  console.log('DOM ready');
  $('#tweet-text').keydown(handleKeyUp);
});

const handleKeyUp = function() {
  const length = $(this).val().length;
  const charLimit = 140;
  const charsLeft = charLimit - length;
  const charText = $('.counter').text(charsLeft);

  if (charsLeft < 0) {
    $("#counter").css('color', 'red');
  } else {
    $("#counter").css('color', 'black');
  }

}

