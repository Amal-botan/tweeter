//functio to ensure DOM has loaded
$(document).ready(function() {
  // --- our code goes here ---
  console.log("I hear ya!");

  //registering an event handler to the textarea element
  $("#tweet-text").on('keyup', function() {

    //This is used to grab value of the textarea and the length is determined
    let wordCount = 140 - $(this).val().length;

    //code rendered to update the counter on the page
    let wordCounter = $(this).siblings('div').find('.counter');
    wordCounter.html(wordCount);

    if (wordCount >= 0) {
      wordCounter.removeClass("countIsNegative");
    } else if (wordCount < 0) {
      wordCounter.addClass("countIsNegative");
    }

  });

});