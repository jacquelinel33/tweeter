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
    <p>${new Date(object.created_at).toLocaleString()}</p>
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

  //use ajax to get data from server
  const loadTweets = (callback) => {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    })
      .then(res => callback(res));
  };

  loadTweets(renderTweets);
  
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
        location.reload();
        $('textarea').val('');
        $('.counter').val('140');
      }
      else {
        $('.error-length').css({ 'display': 'block' });
        $('textarea').val('');
        $('.counter').val('140');
        $('.counter').removeClass("red");
        $('form').on('click', function() {
          $(".error-length").css({ 'display': 'none' });
        });
      }
    }
    else {
      $(".error-empty").css({ 'display': 'block' });
      $('form').on('click', function() {
        $(".error-empty").css({ 'display': 'none' });
      });
    }
  });
});