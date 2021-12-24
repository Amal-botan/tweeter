/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* Fake data taken from initial-tweets.json */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
      <img class = "headeruserphoto" src= "https://i.imgur.com/73hZDYK.png"></img>
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

$(document).ready(function() {
  $(".tweetsubmit").submit(function(event) {
    event.preventDefault();
    $.post('/tweets', $(this).serialize());
    renderTweets(data);
  });
}); 
  