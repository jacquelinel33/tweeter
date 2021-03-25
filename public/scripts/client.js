/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  //create tweet elements and append to article. Return article.
  const createTweetElement = (object) => {
    const tweet = `<article class="tweet-article">
    <header>
      <img src=${object.user.avatars}"> 
      <span>${object.user.name}</span> 
      <span id="disappear">${object.user.handle}</span>
    </header>
    <div class="tweet-body"> 
    ${object.content.text}
    </div>
    <footer class="tweet-foot">
      <p>${object.created_at}</p>
      <div class="icons">
        <img src="https://raw.githubusercontent.com/mpizzaca/tweeter/master/public/images/flag.png">
        <img src="https://raw.githubusercontent.com/mpizzaca/tweeter/master/public/images/retweet.png">
        <img src="https://raw.githubusercontent.com/mpizzaca/tweeter/master/public/images/heart.png">
      </div>
    </footer>
  </article>`
    return tweet;
  };

  //loop through tweets, calls createTweetElements and takes return value and appends it to tweets container
  const renderTweets = (tweetObjArr) => {
    for (let tweet of tweetObjArr) {
      const generatedTweets = createTweetElement(tweet);
      $('.tweet-container').append(generatedTweets);
    }
  };

  //post request that sends form data to server
  $('form').on('submit', function(event) {
    event.preventDefault();
    const tweetInput = $('textarea').val();
    if (tweetInput) {
      if (tweetInput.length < 140) {
        let tweet = $(this).serialize();
        $.ajax({
          url: "/tweets/",
          method: "POST",
          data: tweet
        })
        loadTweets(renderTweets);
      }
      else {
        $(".error-length").css({'visibility': 'visible'});
      }
    }
    else {
      $(".error-empty").css({'visibility': 'visible'});
    }
  });

  //use ajax to get data from server
  const loadTweets = (callback) => {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    })
      .then(res => callback(res));
  };

  loadTweets(renderTweets);

});