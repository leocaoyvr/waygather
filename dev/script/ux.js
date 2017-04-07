/*
/* UX Scripts
/* for user interactions
/* ========================= */

/* Click to Show Target
/* ------------------------- */

$(function() {
  $('.js-show-target').click(function(){
    var tar = $(this).attr('target');

    $(this).hide();
    $('.' + tar).addClass('active');
  });
});