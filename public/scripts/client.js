$(document).ready(function() {
  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();
    const tweetInput = $('textarea').val();
    if (tweetInput) {
      if (tweetInput.length < 140) {
        let tweet = $(this).serialize();
        console.log(tweet);
        $.ajax({
          url: "/tweets",
          method: "POST",
          data: tweet
        }).then(() => loadTweets());
        
        $('textarea').val('');
        $('.counter').val('140');
      } else {
        $('.error-length').slideDown("slow", function(){})
        $('textarea').val('');
        $('.counter').val('140');
        $('.counter').removeClass("red");
        $('form').on('click', function() {
          $(".error-length").css({
            'display': 'none'
          });
        });
      }
    } else {
      $('.error-empty').slideDown("slow", function(){})
      // $(".error-empty").css({
      //   'display': 'block'
      // });
      $('form').on('click', function() {
        $(".error-empty").css({
          'display': 'none'
        });
      });
    }
  });
});

const escape = function(str) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML
}
const createTweetElement = (object) => {
  const tweet = `
  <article class="tweet-article">
    <header>
      <img src=${object.user.avatars}"> 
      <span>${object.user.name}</span> 
      <span id="disappear">${object.user.handle}</span>
    </header>
    <div class="tweet-body"> 
      ${escape(object.content.text)}
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

const renderTweets = (tweetObjArr) => {
  let tweetsContainer = $('.tweet-container');
  for (let tweet of tweetObjArr) {
    let generatedTweets = createTweetElement(tweet);
    tweetsContainer.append(generatedTweets);
  }
};

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET', dataType: "json" })
    .then((res) => {
      renderTweets(res);
    });
};
