//functio to ensure DOM has loaded
$(document).ready(function() {
  // --- our code goes here ---
  console.log("I hear ya!");

  //registering an event handler to the textarea element 
  $("#tweet-text").on('keyup', function() {

    //console.log(this);

    //This is used to grab value of the textarea and the length is determined
    let wordcount = 140 - $(this).val().length;

    //console.log(wordcounter);

    //code rendered to update the counter on the page
    let wordcounter = $(this).siblings('div').find('.counter');
    wordcounter.html(wordcount);

    if (wordcount >= 0) {
      wordcounter.removeClass("countIsNegative");
    } else if (wordcount < 0) {
      wordcounter.addClass("countIsNegative");
    }

  })

});