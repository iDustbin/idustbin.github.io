(function ($) {
"use strict";

// meanmenu with sidebar

$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "991"
});

$('.open-mobile-menu').on('click', function () {
	$('.side-info').addClass('info-open');
	$('.offcanvas-overlay').addClass('overlay-open');
})

$('.side-info-close,.offcanvas-overlay,.mobile_one_page li.menu-item a.nav-link').on('click', function () {
	$('.side-info').removeClass('info-open');
	$('.offcanvas-overlay').removeClass('overlay-open');
})


$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$(".header-sticky").removeClass("sticky");
	} else {
		$(".header-sticky").addClass("sticky");
	}
});

// mainSlider
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: false,
		autoplaySpeed: 10000,
		dots: false,
		fade: true,
		arrows: false,
		responsive: [
			{ breakpoint: 767, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}
mainSlider();


/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup_video').magnificPopup({
	type: 'iframe'
});


// Data-background
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})
// Data-background color
$("[data-bg-color]").each(function () {
	$(this).css("background", $(this).attr("data-bg-color"))
})

// Data width
$("[data-width]").each(function(){
	$(this).css("width",$(this).attr("data-width"))
})


// isotop
if (jQuery(".filter-wrapper").length > 0) {
    $('.filter-wrapper .filter-grid').imagesLoaded(function () {
        let $grid = $('.filter-wrapper .filter-grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-item' // columnWidth: 1
            }
        });

        // filter items on button click
        $('.filter-nav').on('click', 'button', function () {
            let filterValue = $(this).attr('data-filter');
            $grid.isotope({filter: filterValue});
        });

    });

	
}

//for menu active class
$('.portfolio_nav button').on('click', function(event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});

// scrollToTop
$.scrollUp({
	scrollName: 'scrollUp', // Element ID
	topDistance: '300', // Distance from top before showing element (px)
	topSpeed: 300, // Speed back to top (ms)
	animation: 'fade', // Fade, slide, none
	animationInSpeed: 200, // Animation in speed (ms)
	animationOutSpeed: 200, // Animation out speed (ms)
	scrollText: '<i class="icofont icofont-long-arrow-up"></i>', // Text for element
	activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
});

// WOW active
new WOW().init();

//Adding class on visibility
$.fn.visible = function(partial) {
    
	var $t            = $(this),
		$w            = $(window),
		viewTop       = $w.scrollTop(),
		viewBottom    = viewTop + $w.height(),
		_top          = $t.offset().top,
		_bottom       = _top + $t.height(),
		compareTop    = partial === true ? _bottom : _top,
		compareBottom = partial === true ? _top : _bottom;
  
  return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

};

	$.fn.visible = function(partial) {
	  
		var $t            = $(this),
			$w            = $(window),
			viewTop       = $w.scrollTop(),
			viewBottom    = viewTop + $w.height(),
			_top          = $t.offset().top,
			_bottom       = _top + $t.height(),
			compareTop    = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;
	  
	  return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  
	};
	
	$(window).on('scroll',function(event) {
	
		$(".scale-img-animation-left").each(function(i, el) {
		var el = $(el);
			if (el.visible(true)) {
				el.addClass("img-animation-left"); 
			} else {
				el.removeClass("img-animation-left");
			}
		});
		$(".scale-img-animation-right").each(function(i, el) {
		var el = $(el);
			if (el.visible(true)) {
				el.addClass("img-animation-right"); 
			} else {
				el.removeClass("img-animation-right");
			}
		});

		$(".top_right_visible").each(function(i, el) {
			var el = $(el);
				if (el.visible(true)) {
					el.addClass("top_right_visible_animation"); 
				} else {
					el.removeClass("top_right_visible_animation");
				}
		});

		
		$(".width_visible").each(function(i, el) {
			var el = $(el);
				if (el.visible(true)) {
					el.addClass("width_visible_animation"); 
				} else {
					el.removeClass("width_visible_animation");
				}
		});

		// testimonial slider
		if (jQuery(".team-active-3").length > 0) {
			let swiperteam = new Swiper('.team-active-3', {
				slidesPerView: 1,
				spaceBetween: 30,
				// direction: 'vertical',
				loop: true,
				infinite: false,
				centeredSlides: true,
				autoplay: {
					delay: 5000,
				},
			
				// If we need pagination
				pagination: {
				el: '.swiper-pagination',
				clickable: true,
				},
			
				// Navigation arrows
				navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
				},
			
				// And if we need scrollbar
				scrollbar: {
				el: '.swiper-scrollbar',
				dynamicBullets: true,
				},
				breakpoints: {
					0: {
					slidesPerView: 1,
					centeredSlides: false,
					spaceBetween: 0,
					},
					767: {
					slidesPerView: 2,
					},
					991: {
					slidesPerView: 2,
					},
					1400: {
						slidesPerView: 4,
					}
				}
	
			});
		}
  	});
	
	// Active Odometer Counter 
	jQuery('.odometer').appear(function (e) {
		var odo = jQuery(".odometer");
		odo.each(function () {
			var countNumber = jQuery(this).attr("data-count");
			jQuery(this).html(countNumber);
		});
	});

	// preloader - start
	// --------------------------------------------------
	$(window).on('load', function() {
		$('.preloader').addClass('loaded');

		if ($('.preloader').hasClass('loaded')) {
		$('.spinner').delay(1000).queue(function () {
			$(this).remove();
		});
		}
	});
	// preloader - end


})(jQuery);