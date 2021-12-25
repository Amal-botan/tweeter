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
    $('#containertweet').append(tweetdata);
  }
}
  


const createTweetElement = function(tweet) {
  /* Your code for creating the tweet element */
  let $tweet =
  `<article class = "bordertweet">
    <header class = "headertweet">
      <img class = "headeruserphoto" src= ${tweet.user.avatars}></img>
      <span class="headername">${tweet.user.name}</span>
      <span class="headerusername">${tweet.user.handle}</span>
    </header>
    <p class="tweetsentence">${tweet.content.text}</p>
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
  $(".tweetbutton").on('click', function(event) {
    //checking the length of the tweet and giving commands depending on the length
    if ($("#tweet-text").val().length > 140) {
      event.preventDefault();
      alert('Tweets must be less than 140 characters');
    } else if ($("#tweet-text").val().length === 0) {
      event.preventDefault();
      alert('Text feild cannot be empty');
    } else {
        //add an event listener that listens for the submit event
       $(".tweetsubmit").submit(function(event) {
        event.preventDefault();
        //Serialize the form data and send it to the server as a query string.
        $.post('/tweets', $(this).serialize());
        loadTweets();
      });
    }
  }); 
}); 
  