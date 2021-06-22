/**
 * Neomi | Responsive App Landing Page.
 * Author: perleTheme Template
 * Copyright: 2017;
 * This is a premium product available exclusively here : https://themeforest.net/user/perletheme
 */

/**
 TABLE OF CONTENTS
 --------------------------------
 *. 01 - Pre Loader .................
 *. 02 - Variables ..................
 *. 03 - Pre Loader Styles ..........
 *. 04 - SideNav Setup ..............
 *. 05 - Materialize Setup ..........
 *. 06 - Fading Header ..............
 *. 07 - Scroll It Plugin Setup .....
 *. 08 - Owl Carousel Plugin Setup ..
 *. 09 - AOS Plugin Setup ...........
 *. 10 - Numbers Counter Plugin .....
 *. 11 - Match Height Plugin Setup ..
 *. 12 - Section Title Animation ....
 *. 13 - Appending Line Break .......
 *. 14 - Count Down Demo Setup ......
 *. 15 - Coming Soon Demo Setup .....
 *. 16 - Parallax Background Setup ..
 --------------------------------
 */

(function ($) {
  "use strict";
  
  var $window = $(window);
  
  //Fading Out Pre Loader
  $window.on("load", function () {
    $("#pre-loader").fadeOut("500");
    AOS.refresh();
  });
  
  $(document).ready(function () {
    
    var $icon4 = $("#hamburger-menu"),
        $socialHamburger = $('#social-hamburger'),
        $buttonCollapse = $(".button-collapse"),
        header = $("#main-header"),
        height = header.outerHeight(),
        offset = height / 2,
        navColor = $("#nav-color"),
        range = 200,
        didScroll,
        lastScrollTop = 0,
        delta = 5,
        $mainNav = $("#main-nav"),
        $mainNavHeight = $mainNav.outerHeight(),
        scrollTop;
    
    
    /*----- Close SideNav when on resize width-----*/
    
    $window.on('resize', function () {
      $buttonCollapse.sideNav("hide");
      AOS.refresh();
    });
    
    //Toggle Social Hamburger Icon on click
    $socialHamburger.on('click', function () {
      $(this).toggleClass('open')
    });
    
    
    /*----- Materialize JS Setup-----*/
    
    // SideNav Initialize
    $buttonCollapse.sideNav({
      draggable: true,
      closeOnClick: true,
      //Toggle the hamburger icon
      onOpen: function () {
        $icon4.addClass("open");
      },
      onClose: function () {
        $icon4.removeClass("open");
      }
    });
    
    // SideNav DropDown Initialize
    $(".dropdown-button").dropdown({
      belowOrigin: true,
      constrainWidth: false
    });
    
    // Header Slider Initialize
    $(".slider").slider();
    
    // FAQ Collapsible Initialize
    $(".collapsible").collapsible();
    
    // Download section Tabs Initialize
    $('ul.tabs').tabs({
      swipeable: true
    });
    $('.modal').modal();
    //Inputs Initialize
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false, // Close upon selecting a date,
      container: undefined, // ex. 'body' will append picker to body
    });
    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button,
      container: undefined, // ex. 'body' will append picker to body
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: function(){} //Function for after opening timepicker
    });
    $('.counter_input').characterCounter();
    $('input.autocomplete').autocomplete({
      data: {
        "Apple": '//logo.clearbit.com/apple.com',
        "Microsoft": '//logo.clearbit.com/microsoft.com',
        "Google": '//logo.clearbit.com/google.com',
        "Facebook": '//logo.clearbit.com/facebook.com',
        "Samsung": '//logo.clearbit.com/samsung.com'
      },
      limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function(val) {
        // Callback function when value is autcompleted.
      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });
    
    
    /*----- Fade Header and NavColor on Scroll-----*/
    
    $window.on("scroll", function () {
      didScroll = true;
      scrollTop = $(this).scrollTop();
      if (scrollTop > 1000) {
        navColor.css({"opacity": 1});
        return;
      }
      var calc = 1 - (offset - scrollTop + range) / range + 1;
      if (calc < 1) {
        navColor.css({"opacity": calc});
      } else {
        navColor.css({"opacity": 1});
      }
    });
    
    // Set nav bar opacity to 0 if on top of page
    if ($(document).scrollTop() === 0) {
      navColor.css({"opacity": 0});
    }
    
    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 200);
    
    function hasScrolled() {
      if (Math.abs(lastScrollTop - scrollTop) <= delta) {
        return;
      }
      if (scrollTop > lastScrollTop && scrollTop > $mainNavHeight) {
        $mainNav.removeClass("nav-down").addClass("nav-up");
      } else {
        if (scrollTop + $(window).height() < $(document).height()) {
          $mainNav.removeClass("nav-up").addClass("nav-down");
        }
      }
      lastScrollTop = scrollTop;
    }
    
    
    /*----- ScrollIt JS Setup-----*/
    
    $.scrollIt({
      easing: "ease-out",
      topOffset: -1
    });
    
    
    /*----- Owl Carousal Setup-----*/
    
    //Owl Main for the Slider Demo
    var $owlMainHeader = $('.owl-main-header');
    $owlMainHeader.owlCarousel({
      loop: true,
      responsiveClass: true,
      dots: true,
      center: true,
      autoplay: false,
      items: 1,
      nav: true,
      navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
      animateOut: "fadeOut",
      animateIn: "fadeIn"
    });
    
    $window.on('focus', function () {
      $owlMainHeader.trigger('next.owl.carousel');
    });
    
    // Initialize Header Carousel
    $(".owl-header").owlCarousel({
      loop: true,
      responsiveClass: true,
      items: 1,
      nav: false,
      dots: true,
      autoplay: true,
      margin: 30,
      animateOut: "bounceOutRight",
      animateIn: "bounceInLeft"
    });
    
    // Features Owl Carousal initialize
    var $owlFeatures = $(".owl-features"),
        $featureLinks = $(".feature-link");
    
    function highLightFeature($singleFeatureLink) {
      $featureLinks.removeClass("active");
      $singleFeatureLink.addClass("active");
    }
    
    // Initialize Features Carousel
    $owlFeatures.owlCarousel({
      loop: false,
      responsiveClass: true,
      autoplay: false,
      items: 1,
      nav: false,
      dots: false,
      animateOut: "fadeOutDown",
      animateIn: "fadeInUp"
    });
    
    //Highlight the current link when owl changes
    $owlFeatures.on("changed.owl.carousel", function (event) {
      //Fix the current link
      var current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
      var allItems = event.item.count;
      if (current > allItems || current === 0) {
        current = allItems - (current % allItems);
      }
      current--;
      var $featureLink = $(".feature-link:nth(" + current + ")");
      highLightFeature($featureLink);
      $featureLink.trigger('click');
    });
    
    //Highlight the current link when feature clicked
    $featureLinks.on("click", function () {
      var $item = $(this).data("owl-item");
      $owlFeatures.trigger("to.owl.carousel", $item);
      highLightFeature($(this));
    });
    
    // Download Owl Carousal initialize
    var $owlDownload = $(".owl-download"),
        $downloadLinks = $(".owl-download-link");
    
    function highLightDownloadLink($singleDownloadLink) {
      $downloadLinks.removeClass("active");
      $singleDownloadLink.addClass("active");
    }
    
    // Initialize Features Carousel
    $owlDownload.owlCarousel({
      loop: false,
      responsiveClass: true,
      margin: 0,
      autoplay: false,
      items: 1,
      nav: false,
      dots: false
    });
    
    //Highlight the current link when owl changes
    $owlDownload.on("changed.owl.carousel", function (event) {
      //Fix the current link
      var current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
      var allItems = event.item.count;
      if (current > allItems || current === 0) {
        current = allItems - (current % allItems);
      }
      current--;
      var $downloadLink = $(".owl-download-link:nth(" + current + ")");
      highLightDownloadLink($downloadLink);
      $downloadLink.trigger('click');
    });
    
    //Highlight the current link when feature clicked
    $downloadLinks.on("click", function () {
      var $item = $(this).data("owl-item");
      $owlDownload.trigger("to.owl.carousel", $item);
      highLightDownloadLink($(this));
    });
    
    // video Owl Carousal initialize
    var $owlVideo = $(".owl-video"),
        $videoLinks = $(".owl-video-link");
    
    function highLightVideoLink($singleVideoLink) {
      $videoLinks.removeClass("active");
      $singleVideoLink.addClass("active");
    }
    
    // Initialize Features Carousel
    $owlVideo.owlCarousel({
      loop: false,
      responsiveClass: true,
      margin: 0,
      autoplay: false,
      items: 1,
      nav: false,
      dots: false,
    });
    
    //Highlight the current link when owl changes
    $owlVideo.on("changed.owl.carousel", function (event) {
      //Fix the current link
      var current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
      var allItems = event.item.count;
      if (current > allItems || current === 0) {
        current = allItems - (current % allItems);
      }
      current--;
      var $videoLink = $(".owl-video-link:nth(" + current + ")");
      highLightVideoLink($videoLink);
      $videoLink.trigger('click');
    });
    
    //Highlight the current link when feature clicked
    $videoLinks.on("click", function () {
      var $item = $(this).data("owl-item");
      $owlVideo.trigger("to.owl.carousel", $item);
      highLightVideoLink($(this));
    });
    
    // Screenshots Owl Carousal
    $(".owl-screenshots, .owl-header2").owlCarousel({
      loop: true,
      responsiveClass: true,
      dots: true,
      margin: -50,
      center: true,
      autoplay: false,
      items: 3,
      nav: true,
      navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
      responsive: {
        0: {
          margin: -20
        },
        500: {
          margin: -20
        }
      }
    });
    
    // Testimonials Owl Carousal
    $(".owl-testimonials").owlCarousel({
      loop: true,
      responsiveClass: true,
      dots: true,
      items: 1,
      autoplay: false
    });
    
    // Team Owl Carousal
    $(".owl-teams, .owl-news").owlCarousel({
      loop: false,
      responsiveClass: true,
      dots: true,
      margin: 20,
      nav: false,
      stagePadding: 10,
      responsive: {
        0: {
          items: 1,
          margin: 300
        },
        500: {
          items: 2
        },
        992: {
          items: 3
        }
      }
    });
    
    // Coin Carousal
    $(".owl-coins").owlCarousel({
      loop: false,
      responsiveClass: true,
      dots: true,
      margin: 20,
      nav: false,
      stagePadding: 10,
      responsive: {
        0: {
          items: 1,
          margin: 300
        },
        500: {
          items: 2
        }
      }
    });
    
    // Subscribe Companies Owl Carousal
    $(".owl-companies").owlCarousel({
      loop: false,
      responsiveClass: true,
      dots: false,
      autoplay: true,
      nav: false,
      responsive: {
        0: {
          items: 2
        },
        500: {
          items: 3
        },
        992: {
          items: 5
        }
      }
    });
    
    
    /*----- AOS Setup-----*/
    
    if ($(window).width > 800) {
      AOS.init({
        disable: "mobile",
        once: true,
        duration: 600
      });
    } else {
      AOS.init({
        disable: "mobile",
        once: true,
        duration: 600,
        delay: 0
      });
    }
    
    
    /*----- Counter Up Setup for numbers section-----*/
    
    $(".counter").counterUp({
      delay: 10,
      time: 1500
    });
    
    
    /*----- Color Switcher Setup-----*/
    
    function colorSwitcher() {
      
      var div = $("#colors-switcher");
      
      $("#fa-cog").on('click', function (e) {
        e.preventDefault();
        div.toggleClass("active");
      });
      
      $(".colors li a").on("click", function (e) {
        e.preventDefault();
        var styleSheet = "./css/color/" + $(this).data("class");
        $("#colors").attr("href", styleSheet);
        $(this).parent().parent().find("a").removeClass("active");
        $(this).addClass("active");
      });
    }
    
    colorSwitcher();
    
    
    /*----- Same Height Plugin Setup -----*/
    
    //Match Height for Features section
    $(".single-feature a").matchHeight({
      property: "min-height",
      byRow: false
    });
    //Match Height for Statistics section
    $(".same-height-1").matchHeight({
      property: "min-height",
      byRow: false
    });
    //Match Height for Compare section
    $(".advantages .advantage").matchHeight({
      property: "min-height",
      byRow: false
    });
    //Match Height for News section
    $(".news-style-1 .news-container, .blog-page-news .news-container").matchHeight({
      property: "min-height",
      byRow: false
    });
    
    
    /*----- Section Title Animation When in View Setup-----*/
    var e1 = new Event('touchend');
    var e2 = new Event('touchhover');
    
    
    $('.menu__item').on('mouseenter', function () {
      this.dispatchEvent(e2);
    }).on('mouseleave', function () {
      this.dispatchEvent(e1);
    });
    
    
    /*----- Count-Down Setup -----*/
    
    var $countDownWrapper = $('.neomi-count-down-wrapper');
    
    //Set the dead line and time zone for your app
    var deadline = 'JUN 25 2019 18:40:18 GMT-0400';
    
    function time_remaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds};
    }
    
    function run_clock(id, endtime) {
      var clock = document.getElementById(id);
      
      // get spans where our clock numbers are held
      var days_span = clock.querySelector('.days');
      var hours_span = clock.querySelector('.hours');
      var minutes_span = clock.querySelector('.minutes');
      var seconds_span = clock.querySelector('.seconds');
      
      function update_clock() {
        var t = time_remaining(endtime);
        
        // update the numbers in each part of the clock
        days_span.innerHTML = t.days;
        hours_span.innerHTML = ('0' + t.hours).slice(-2);
        minutes_span.innerHTML = ('0' + t.minutes).slice(-2);
        seconds_span.innerHTML = ('0' + t.seconds).slice(-2);
        
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }
      
      update_clock();
      var timeinterval = setInterval(update_clock, 1000);
    }
    
    if ($countDownWrapper.length) {
      run_clock('clockdiv', deadline);
    }
    
    
    /*----- Coming Soon Demo Setup -----*/
    
    var $subscribeBtn = $('#subscribe-btn'),
        $closeBtn = $('#close-btn'),
        $comingSoon = $('#coming-soon'),
        $subscribeMenu = $('#subscribe-menu'),
        $container = $('.main-container'),
        $sideNavBtn = $('#side-nav-btn'),
        $aboutContent = $('#about-content'),
        $moreInfo = $('#more-info');
    
    $subscribeBtn.on('click', function (e) {
      e.stopPropagation();
      $subscribeMenu.addClass('active')
    });
    $closeBtn.on('click', function (e) {
      e.stopPropagation();
      $subscribeMenu.removeClass('active')
    });
    $subscribeMenu.on('click', function (e) {
      e.stopPropagation();
    });
    $comingSoon.on('click', function () {
      $subscribeMenu.removeClass('active')
    });
    $sideNavBtn.on('click', function () {
      $container.toggleClass('active');
      $aboutContent.toggleClass('active');
    });
    $moreInfo.on('click', function () {
      $container.toggleClass('active');
      $aboutContent.toggleClass('active');
      $socialHamburger.toggleClass('open');
    });
    
    
    /*----- Parallax Background Setup -----*/
    
    //Background Parallax Options
    var $interactiveBg = $('.bg');
    if ($interactiveBg.length) {
      $($interactiveBg).interactive_bg({
        strength: 25,
        scale: 1.03,
        animationSpeed: "100ms",
        contain: true,
        wrapContent: false
      });
    }
    
    
    /*----- Progress bar for statistics section-----*/
    
    var $progressBar = $('.progress-bar');
    $progressBar.each(function (index) {
      $(this).width($(this).attr('data-progress'));
      $(this).siblings('span').html($(this).attr('data-progress'))
    })
    
    
    /*----- Textillate Text Animation -----*/
    
    var animatedText = $('.textillate');
    animatedText.show();
    for (var index = 0; index < animatedText.length; index++) {
      $(animatedText[index]).textillate({
        selector: '.textillate-text',
      });
    }
  
    /*----- Full Page settings for index-fullpage.html -----*/
  
    if ($('#onepage-scroll').length) {
      $('#onepage-scroll').fullpage({
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        menu: '#menu',
        lockAnchors: true,
        anchors: ['firstPage', 'secondPage'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Home', 'Features', 'Testing', 'Statistics', 'Subscribe'],
        showActiveTooltip: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        responsiveHeight: 750,
        responsiveWidth: 992,
        sectionSelector: '.fullpage-section'
      });
    }
    
    
  });
  
})(jQuery);


