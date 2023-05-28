/* eslint-disable no-undef */
{
  $(document).ready(function() {
    $("#tweet-text").on("input", onInput);
  });
  
  const onInput = function() {
    const val = $(this).val();
    const numCharRemaining = 140 - val.length;
    const $form = $(this).closest("form");
    const $counter = $form.find(".counter");
    $counter.text(numCharRemaining);
  
    if (numCharRemaining <= 0) {
      $counter.addClass('red-counter');
    } else {
      $counter.removeClass('red-counter');
    }
  };
}





