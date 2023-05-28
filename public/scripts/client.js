/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //Function to dynamicaly create a tweet and return that tweet
  const createTweetElement = function(tweetObj) {
    let $tweet = $(`
    <article class="tweet">

        <header>
          <div class="name-avatar">
            <img class="avatar" src="${tweetObj.user.avatars}"></img> 
            <h4 class="user-name">${tweetObj.user.name}</h4>
          </div>
          <div class="handle">
            ${tweetObj.user.handle}
          </div>
        </header>

        <div class="tweet-content">
        ${tweetObj.content.text}
        </div>

        <footer class="tweet-footer">
          <span class="time-stamp">${timeago.format(tweetObj.created_at)}</span>
          <div class="tweet-response">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>

      </article>`);
    return $tweet;
  };

  //Listener for focus on text input area to hide the label
  $("#tweet-text").on('focus',function(event) {
    event.preventDefault();
    console.log("here");
    const $label = $('label[for="tweet-text"]');
    $label.hide();
  });
  
  //Listerer for tweet submission to post new tweet and load updated tweet container
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const $val = $(this).find("#tweet-text").val();
    const $newTweet = $(this).serialize();
    const $errEmpty = $(this).parent().find("#error-empty");
    const $errLong = $(this).parent().find("#error-too-many-char");
    const $label = $('label[for="tweet-text"]');
    if (!$val.length) {
      $errEmpty.slideDown().delay(4000).slideUp();
    } else if ($val.length > 140) {
      $errLong.slideDown().delay(4000).slideUp();
    } else {
      $.post("/tweets", $newTweet)
        .then(() => {
          loadTweets();
          $(this).find("#tweet-text").val("");
          $(this).find(".counter").val(140);
          $label.show();
        });
    }

  });

  
  const renderTweets = function(tweets) {
    const $container = $('#tweet-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $container.prepend($tweet); //this is the rendering
    }
  };

  const loadTweets = function() {
    $.get("/tweets")
      .then((data) => {
        renderTweets(data);
      });
  };

  //initial call to load tweets when user first visits page
  loadTweets();

});
