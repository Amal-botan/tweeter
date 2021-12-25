/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//This function can be responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
const renderTweets = function(tweets) {
   // loops through tweets
  for (const tweet in tweets) {
    // calls createTweetElement for each tweet
    const tweetdata = createTweetElement(tweets[tweet]);
      // takes return value and appends it to the tweets container
    $('#containertweet').prepend(tweetdata);
  }
}
  
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  /* Your code for creating the tweet element */
  let $tweet =
  `<article class = "bordertweet">
    <header class = "headertweet">
      <img class = "headeruserphoto" src= ${tweet.user.avatars}></img>
      <span class="headername">${tweet.user.name}</span>
      <span class="headerusername">${tweet.user.handle}</span>
    </header>
    <p class="tweetsentence">${escape(tweet.content.text)}</p>
    <span class = "tweetline"></span>
    <footer class = "footertweet">
      <a> ${timeago.format(tweet.created_at)} </a>
      <div class = "tweetbuttons">
        <button class = "btn"><i class="fa-solid fa-flag"></i></button>
        <button class = "btn"><i class="fa-solid fa-retweet"></i></button>
        <button class = "btn"><i class="fa-solid fa-heart"></i></button>
      </div>
    </footer>
  </article>`
  return $tweet;

}

// a function called loadTweets that is responsible for fetching tweets from the http://localhost:8080/tweets page. using Ajax
function loadTweets() {
  $.ajax('/tweets', {method: 'GET'})
  .then(function(data) {
    renderTweets(data);
  });
}

$(document).ready(function() {
//upon clicking the tweetbutton
  $(".tweetsubmit").submit(function(event) {
    event.preventDefault();
    //checking the length of the tweet and giving commands depending on the length
    if ($("#tweet-text").val().length > 140) {
      $(".errormessage").html(`<i class="fa-solid fa-triangle-exclamation"></i> &nbsp Error: Your tweet is over 140 characters! &nbsp <i class="fa-solid fa-triangle-exclamation"></i>`).slideDown().delay(3000).slideUp(500);
    } else if ($("#tweet-text").val().length === 0) {
      $(".errormessage").html(`<i class="fa-solid fa-triangle-exclamation"></i> &nbsp Error: Your tweet can't be empty! &nbsp <i class="fa-solid fa-triangle-exclamation"></i>`).slideDown().delay(3000).slideUp(500);
      // return;
    } else {
      $(".errormessage").html(``);
        //add an event listener that listens for the submit event
        //Serialize the form data and send it to the server as a query string.
        $.post('/tweets', $(this).serialize()).then(function() {
          //calling ajax to get the last submission
            $.ajax('/tweets', {method: 'GET'}).then(function(data) {
              //getting the last tweet
                const tweetdata = createTweetElement(data[data.length-1]);
                $('#containertweet').prepend(tweetdata);
          });
        });
    }
  }); 
}); 
//loading all of the tweets at the front of the page
loadTweets();