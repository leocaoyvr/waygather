/*
/* UX Scripts
/* for user interactions
/* ========================= */

/* Click to Hide this Item
/* ------------------------- */

$(function() {
  $('.js-click-to-hide').click(function() {
    $(this).hide();
  });
});

/* Click to Show Target
/* ------------------------- */

$(function() {
  $('.js-show-target').click(function(){
    var tar = $(this).attr('target');

    $('.' + tar).addClass('active');
    return false;
  });
});

/* Click to Switch Among Tabs
/* ------------------------- */

$(function() {
  $('.js-tab-hd').click(function(){
    if(!$(this).hasClass('active')) {
      var tabTar = '.' + $(this).attr('target');
      var tabParent = $(this).parents('.js-tab-parent');

      console.log(tabTar);

      $(tabParent).find('.js-tab-hd').removeClass('active');
      $(this).addClass('active');

      $(tabParent).find('.js-tab-bd').removeClass('active');
      $(tabParent).find(tabTar).addClass('active');
    }
  });
});

/* Click to Close Modal
/* ------------------------- */

$(function() {
  $('.js-modal-close').click(function() {
    $(this).parents('.modal-outer').removeClass('active');
  });
});