// lesson-js (диагностическая версия)
(function () {
  console.log("[lesson-js] Скрипт загружен ✅");

  // Показать баннер в углу страницы
  var banner = document.createElement("div");
  banner.textContent = "lesson-js загружен ✅";
  banner.style.cssText = `
    position: fixed;
    bottom: 15px;
    right: 15px;
    background: #4caf50;
    color: #fff;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 6px;
    z-index: 999999;
    box-shadow: 0 2px 6px rgba(0,0,0,.2);
  `;
  document.body.appendChild(banner);

  // Автоудаление баннера через 5 секунд (чтобы не мешал)
  setTimeout(() => {
    if (banner && banner.parentNode) {
      banner.parentNode.removeChild(banner);
    }
  }, 5000);
})();




// Кнопки переключения уроков внизу урока
(()=>{
  let $nav_left = $('.lesson-navigation td:first-child a');
  let $nav_right = $('.lesson-navigation td:last-child a');
  let $chatium_nav_left = $('body>.lesson-title+style+div a:contains("←")');
  let $chatium_nav_right = $('body>.lesson-title+style+div a:contains("→")');
  let needPrev = ($nav_left.length && $nav_left.text().trim() != "") || (window.PageChecker.isChatium && $chatium_nav_left.length);
  let needNext = ($nav_right.length && $nav_right.text().trim() != "") || (window.PageChecker.isChatium && $chatium_nav_right.length);
  let arrowLeft = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 18L4 12L10 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  let arrowRight = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 18L20 12L14 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  // Объект с переводами
  const translations = {
    "ru": {
      "prevLesson": "Предыдущий урок",
      "nextLesson": "Следующий урок",
      "home": "На главную"
    },
    "en": {
      "prevLesson": "Previous lesson",
      "nextLesson": "Next lesson",
      "home": "Home"
    }
    // Добавить больше языков здесь
  };

  // Определение языка
  let lang = $('html').attr('lang') || 'ru';
  let texts = translations[lang] || translations['ru'];

  //Фикс поля ответа на комментарий
  /*$('.answer-content .answer-main-content .b-like-and-subscribe-notifications').prepend(`
    <a class="open-textarea-field" href="javascript:void(0)">Ответить</a>
  `)

  $('.answer-content .b-like-and-subscribe-notifications .open-textarea-field').click(function(){
    $(this).parents('.answer-content').find('.comment-list .new-comment').show()
  })

  $(document).ajaxSuccess(function(event, xhr, settings){
    if(settings.url.includes('/teach/control/lesson/viewRestAnswers')) {
        let inter = setInterval(function(){
	$('.comment .comment-time > .value').each((i,el)=> {
     let comment_title = $(el).parents('.comment').find('.title');
     let comment_title_pl = $(comment_title).find('.pseudo-link').eq(0);
     if($(comment_title_pl).length) $(comment_title_pl).before($(el));
     else $(comment_title).append($(el));
   });
            $('.other-answers > *').each(function(){
                if (!$(this).find('.answer-main-content .open-textarea-field').length){
                    $(this).find('.answer-main-content .b-like-and-subscribe-notifications').prepend(`
                        <a class="open-textarea-field" href="javascript:void(0)">Ответить</a>
                    `)
                }
            })
            $('.answer-content .b-like-and-subscribe-notifications .open-textarea-field').click(function(){
                $(this).parents('.answer-content').find('.comment-list .new-comment').show()
            })
            if ($('.other-answers > *').length == $('.other-answers > * .answer-main-content .open-textarea-field').length) {
                clearInterval(inter)
            }
        },100)
    }
})*/

  let $prevLink, $nextLink;

  if(window.PageChecker.isChatium) {
    $prevLink = $chatium_nav_left.clone().addClass("nav-prev").html(arrowLeft + texts.prevLesson);
    $nextLink = $chatium_nav_right.clone().addClass("nav-next").html(texts.nextLesson + arrowRight);
  } else {
    $prevLink = $nav_left.clone().addClass("nav-prev").html(arrowLeft + texts.prevLesson);
    $nextLink = $nav_right.clone().addClass("nav-next").html(texts.nextLesson + arrowRight);
  }

  if(!needPrev) {
    $prevLink = $('<a class="nav-prev inactive">' + arrowLeft + texts.prevLesson + '</a>');
  }
  if(!needNext) {
    $nextLink = $('<a class="nav-next inactive">' + texts.nextLesson + arrowRight + '</a>');
  }

  let $bottomNavBlock = $('<div class="bottom-nav"></div>');
  $bottomNavBlock.append($prevLink);
  $bottomNavBlock.append($('<a href="/teach/control/stream">' + texts.home + '</a>'));
  $bottomNavBlock.append($nextLink);

  if($('.lt-lesson-comment-block').length) {
    $('.lt-lesson-comment-block').before($bottomNavBlock);
  } else {
    $('.lite-page.block-set').append($bottomNavBlock);
  }
})();




});};

})();
