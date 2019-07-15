(function ($) {
 "use strict";

 function showImages(el) {
    var windowHeight = jQuery( window ).height();
    $(el).each(function(){
        var thisPos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (topOfWindow + windowHeight - 200 > thisPos ) {
            $(this).addClass("fadeIn");
        }
    });
}

// if the image in the window of browser when the page is loaded, show that image
$(document).ready(function(){
    showImages('#bg1');
    showImages('#bg2');
});

// if the image in the window of browser when scrolling the page, show that image
$(window).scroll(function() {
    showImages('#bg1');
    showImages('#bg2');
});


  //stejna vyska u novinek a akci
    var maxHeight = 0;
    var blueBlock = ".sameheight";
    $(blueBlock).each(function(){
       if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });
    $(blueBlock).height(maxHeight);  
    
/*-----------------------------
	Menu Stick
---------------------------------*/
    $(window).on('scroll',function() {
        //var w = document.width();
        //alert(w);
        if ($(this).scrollTop() > 1){  
            $('.sticker').addClass("stick");
            //$('.header-top-scroll').addClass('show');
        }   
        else{
            $('.sticker').removeClass("stick");
            //$('.header-top-scroll').removeClass('show');
        }
    });
    
/*----------------------------
    Toogle Search
------------------------------ */
    // Handle click on toggle search button
    $('.header-search').on('click', function() {
        $('.search').toggleClass('open');
        return false;
    });
    
/*----------------------------
    jQuery MeanMenu
------------------------------ */
	jQuery('nav#dropdown').meanmenu();	
	
    
/*----------------------------
    Nivo Slider Active
------------------------------ */
    $('#nivoslider').nivoSlider({
        effect: 'fade',
        //slices: 15,
        //boxCols: 10,
        //boxRows: 10,
        animSpeed: 800,
        pauseTime: 8000,
        startSlide: 0,
        directionNav: true,
        controlNavThumbs: false,
        pauseOnHover: false,
        manualAdvance: false
    });
/*----------------------------
    Wow js active
------------------------------ */
    new WOW().init();
 
/*--------------------------
    ScrollUp
---------------------------- */	
	$.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    }); 	   
    
/*--------------------------
    Counter Up
---------------------------- */	
    /*$('.counter').counterUp({
        delay: 70,
        time: 5000
    });*/ 
    
/*--------------------------------
	Testimonial Slick Carousel
-----------------------------------*/
    /*$('.testimonial-text-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: true,
        asNavFor: '.slider-nav'
    });*/
/*------------------------------------
	Testimonial Slick Carousel as Nav
--------------------------------------*/
    /*$('.testimonial-image-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.testimonial-text-slider',
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '10px',
        responsive: [
            {
              breakpoint: 450,
              settings: {
                dots: false,
                slidesToShow: 3,  
                centerPadding: '0px',
                }
            },
            {
              breakpoint: 420,
              settings: {
                autoplay: true,
                dots: false,
                slidesToShow: 1,
                centerMode: false,
                }
            }
        ]
    });*/
    
/*------------------------------------
	Textilate Activation
--------------------------------------*/
    $('.tlt').textillate({
        loop: true,
        minDisplayTime: 2500
    });
    
/*------------------------------------
	Video Player
--------------------------------------*/
    $(".player").YTPlayer({
        showControls: false
    });    
    
    $(".player-small").YTPlayer({
        showControls: false
    });
   
/*------------------------------------
	MailChimp
--------------------------------------*/
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'http://themeshaven.us8.list-manage.com/subscribe/post?u=759ce8a8f4f1037e021ba2922&amp;id=a2452237f8'
    });
    
    function mailChimpResponse(resp) {
        
        if (resp.result === 'success') {
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);
            
        } else if(resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }  
    }
    
/*------------------------------------
	ColorSwitcher
--------------------------------------*/
    /*$('.ec-handle').on('click', function(){
        $('.ec-colorswitcher').trigger('click')
        $(this).toggleClass('btnclose');
        $('.ec-colorswitcher') .toggleClass('sidebarmain');
        return false;
    });
    $('.ec-boxed,.pattren-wrap a,.background-wrap a').on('click', function(){
        $('.as-mainwrapper').addClass('wrapper-boxed');
        $('.as-mainwrapper').removeClass('wrapper-wide');
    });
    $('.ec-wide').on('click', function(){
        $('.as-mainwrapper').addClass('wrapper-wide');
        $('.as-mainwrapper').removeClass('wrapper-boxed');
    });*/
    
/*------------------------------------
	Magnific Popup Active
--------------------------------------*/
$('.popup-image').magnificPopup({
  type: 'image',
  gallery:{
            enabled:true
        }
  // other options
});
    
    
})(jQuery); 