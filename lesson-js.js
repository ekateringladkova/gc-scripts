   // Формируем шапку урока 
   let $breadcrumb = $('.gc-main-content > .container > .standard-page-content > .breadcrumb');
   let $breadcrumbs = $('.gc-main-content > .page-full-block > .main-page-block > .container > .breadcrumbs');
   $breadcrumbs.find('a').wrap('<li />').parent().after(document.createTextNode(" "));
   $breadcrumbs.contents().filter(function() {
     return this.nodeType == 3; //Node.TEXT_NODE
   }).remove();
   $breadcrumbs.find('li').after(document.createTextNode(" "));
   $breadcrumbs.replaceWith('<ul class="breadcrumb">' + $breadcrumbs.html() +'</ul>');
   $breadcrumbs = $('.gc-main-content > .page-full-block > .main-page-block > .container > .breadcrumb'); 
   $breadcrumb.add($breadcrumbs).wrapAll('<div class="header-box" />');
