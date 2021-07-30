;(function($){
  const adminBar = $('#wpadminbar');

  const desktopMenuContainer = $('.header-bottom[data-show-on="desktop"], .header-main[data-show-on="desktop"]');
  const desktopMenu = $('.header-bottom-inner, .header-main-inner', desktopMenuContainer);

  const mobileMenuContainer = $('.header-bottom[data-show-on="mobile"], .header-main[data-show-on="mobile"]');
  const mobileMenu = $('.header-bottom-inner, .header-main-inner', mobileMenuContainer);

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
      body.append('<div style="display: block; position: fixed; z-index: -10; top: 100px; left: 0; bottom: 0; right: 0; transform: translateY(100px); background-image: url(\''+body.style['background-image']+'\'); background-position: center center; background-size: cover; background-repeat: no-repeat; background-attachment: fixed;"></div>');
    }
  });

})(jQuery);
