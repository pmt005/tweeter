/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


  //Creates a new tweet element (article) and feeds it information from the tweet data//
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
          <span class="time-stamp">${(tweetObj.created_at)}</span>
          <div class="tweet-response">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>

      </article>`);
    return $tweet;
  };

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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  /*
    //Adds new tweet when clicking submit//
    const $button = $("#tweet-button");
    $($button).on('click', function(event) {
      event.preventDefault();
      console.log("MADE IT HERE");
      const $newTweet = $("#new-tweet-form").serialize();
      $.post("/tweets/", $newTweet, () => {
        $($newTweet).find("#tweet-text").val("");
        console.log("MADE IT TO HERE");
      });
    });
    */

  //Adds new tweet when clicking submit//
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const newTweet = $(this).serialize();
    $.post("/tweets/", newTweet, () => {
      const $content = $(this).find("#tweet-text").val();
      console.log("Made it here");
      console.log($content);

      
    });
  });

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('#tweet-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet);
    }
  };
  renderTweets(data);
});

