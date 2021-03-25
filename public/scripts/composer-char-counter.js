$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() {
    let inputLength = $(this).val().length;
    let counter = $(this).closest(".new-tweet").find(".counter");
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

// there's a situation where this screen will have two instances of a created tweet box. 