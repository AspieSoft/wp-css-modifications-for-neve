;(function($){
  const adminBar = $('#wpadminbar');

  const desktopMenuContainer = $('.header-main[data-show-on="desktop"]');
  const desktopMenu = $('.header-main-inner', desktopMenuContainer);

  const mobileMenuContainer = $('.header-main[data-show-on="mobile"]');
  const mobileMenu = $('.header-main-inner', mobileMenuContainer);

  let lastTop = 0;
  function setStickyMenu(){
    let windowScroll = $(window).scrollTop();

    let menuContainer, menu;
    if(window.innerWidth < 960){
      menuContainer = mobileMenuContainer;
      menu = mobileMenu;
    }else{
      menuContainer = desktopMenuContainer;
      menu = desktopMenu;
    }

    let containerBG = menuContainer.css('background-color');
    if(containerBG && containerBG !== 'rgba(0, 0, 0, 0)'){
      menu.css('background-color', menuContainer.css('background-color'));
    }

    let menuTop = (function(){
			let offset = menuContainer.offset();
			if(offset){
				return offset.top
			}
			return 0;
		})();

    let changeMenuState = 0;
    let setTopStr = '0';
    if(adminBar.length && window.innerWidth > 600){
      let offset = adminBar.height();
      if(windowScroll+offset > menuTop){
        changeMenuState = 1;
        setTopStr = offset+'px';
      }else if(windowScroll+offset < lastTop){
        changeMenuState = -1;
        setTopStr = offset+'px';
      }
    }else{
      if(windowScroll > menuTop){
        changeMenuState = 1;
      }else if(windowScroll < lastTop){
        changeMenuState = -1;
      }
    }

    if(changeMenuState === 1){
      lastTop = menuTop;

      menuContainer.css({
        height: menuContainer.height()+'px',
      });

      menu.css({
        position: 'fixed',
        top: setTopStr,
        left: '0',
        right: '0',
        'z-index': '10000',
      });
    }else if(changeMenuState === -1){
      lastTop = 0;

      menu.css({
        position: '',
        top: '',
        left: '',
        right: '',
      });

      menuContainer.css({
        height: '',
      });
    }
  }

  $(document).ready(function(){
    setStickyMenu();
    $(window).on('scroll', setStickyMenu);
    $(window).resize(setStickyMenu);
  });


  /* new: jul 30, 2021 */
  $(document).ready(function(){
    const body = $('body');
    if(body.hasClass('custom-background')){
      body.append('<div style="display: block; position: fixed; z-index: -10; top: -100px; left: 0; bottom: 0; right: 0; transform: translateY(100px); background-image: url(\''+body.css('background-image')+'\'); background-position: center center; background-size: cover; background-repeat: no-repeat; background-attachment: fixed;"></div>');
    }
  });


  /* new: aug 15, 2021 */
	// open all external links in a new window
	$(document).on('click', 'a', function(e){
		if(this.href && !this.href.startsWith('/') && !this.href.startsWith(window.location.origin)){
			e.preventDefault();
			window.open(this.href, '_blank');
		}
	});


  /* new: aug 27, 2021 */
	// fix issue with mobile menu not opening
	$(document).ready(function(){
		let lastClick = 0;
		$('.menu-mobile-toggle, .navbar-toggle').on('click', function(){
			let now = new Date().getTime();
			if(now - 100 < lastClick){
				return;
			}
			lastClick = now;
			if($('.menu-mobile-toggle').hasClass('is-active-2')){
				$('.header-menu-sidebar').removeAttr('style');
				$('body').removeClass('is-menu-sidebar').addClass('hiding-header-menu-sidebar');
				setTimeout(function(){$('body').removeClass('is-menu-sidebar').addClass('hiding-header-menu-sidebar');}, 10);
				setTimeout(function(){$('body').removeClass('is-menu-sidebar').removeClass('hiding-header-menu-sidebar');}, 500);
				$('.menu-mobile-toggle').removeClass('is-active').removeClass('is-active-2');
			}else{
				$('.header-menu-sidebar').css({transform: 'none', visibility: 'visible'});
				$('body').addClass('is-menu-sidebar');
				setTimeout(function(){$('body').addClass('is-menu-sidebar');}, 10);
				$('.menu-mobile-toggle').addClass('is-active').addClass('is-active-2');
			}
		});
	});


  /* new: oct 12, 2021 */
  let nvDarkBackground = getComputedStyle(document.documentElement || document.body).getPropertyValue('--nv-dark-bg');
  if(nvDarkBackground && typeof nvDarkBackground === 'string') {
    nvDarkBackground = nvDarkBackground.replace(/rgba\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*[0-9.]+\s*\)/g, 'rgb($1, $2, $3)')
      .replace(/hsla\(\s*([0-9.]+)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*[0-9.]+\s*\)/g, 'hsl($1, $2, $3)')
      .replace(/#([a-fA-F0-9]{6})[a-fA-F0-9]{2}/g, '#$1')
      .replace(/#([a-fA-F0-9]{3})[a-fA-F0-9]/g, '#$1');
    $('.header').css('background-color', nvDarkBackground);
  }

})(jQuery);
