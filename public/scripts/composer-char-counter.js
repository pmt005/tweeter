/* eslint-disable no-undef */
$(document).ready(function() {
  console.log("READY TO CODE");
  const $tweetText = $("#tweet-text");

  $tweetText.on("input", function() {
    const val = $tweetText.val();
    const numCharRemaining = 140 - val.length;
    console.log(`The number of characters remaining: ${numCharRemaining}`);
    const counter = $(this).parent().children("#new-tweet-footer").children(".counter");
    counter.text(numCharRemaining);

    if (numCharRemaining <= 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }







  });

});
