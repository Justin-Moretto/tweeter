$(document).ready(function () {
  $('textarea').on("input", function () {
    let charsLeft = 140 - $(this).val().length;
    $(".counter").text(charsLeft)
    
    if (charsLeft < 0) {
      $("#counter").css('color', 'red');
    } else {
      $('#error').hide();
      $("#counter").css('color', 'black');
    }
  })
});
