$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let inputLength = $(this).val().length;
    let counter = $(".counter");
    const maxLength = 140;
    let updatedLength = maxLength - inputLength;
    counter.text(updatedLength);
    
    if (updatedLength < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });
});

