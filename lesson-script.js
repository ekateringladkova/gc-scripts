(()=>{

if (window.PageChecker.isChatium) loadLessonScripts();
else $(()=>{ loadLessonScripts(); });
function loadLessonScripts(){setTimeout(()=>{
   
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

   // Убираем <br> из хлебных крошек
   $('.header-box .breadcrumb a').each((i,el)=>{
     $(el).html($(el).html().replace('<br>', ' ')) 
   });

   $('.xdget-lessonTitle').addClass('header-view');
   $('.xdget-lessonTitle h2').addClass('lesson-title-value');
   if(typeof $('.xdget-lessonTitle h2')[0] !== "undefined" && $('.xdget-lessonTitle h2')[0].nextSibling.nodeType == 3) {
     $($('.xdget-lessonTitle h2')[0].nextSibling).wrapAll('<span class="lesson-description-value" />');
   }
   $('.xdget-lessonNavigation').addClass('lesson-navigation');
   $('.xdget-lessonTitle, .xdget-lessonNavigation').wrapAll('<div class="lesson-header-block" />');
   $('.header-box').append($('.lesson-header-block'));
   $('.header-box .lesson-header-block h2').parent().append($('.page-header .page-actions')); 
   $('.header-box .breadcrumb').append('<li>'+$('.page-header > h1').html()+'</li>'); 

   // Выпадающее меню перемещаем в другую сторону
   $('.header-box .dropdown-menu.pull-right').removeClass('pull-right').addClass('pull-left');
   
   $('.header-box').insertBefore($('.gc-main-content > .container, .main-page-block > .container').eq(0));

   $(document).trigger('header-box-ready');
   console.log('header-box-ready');

   // Добавляем имя пользователя в блок задания и комментариев
   $('.lesson-mission-wrapper .answer-form .user-profile-image, .lt-lesson-comment-block .new-comment .user-image').after(
     '<div class="username">'+window.accountSafeUserName+'</div>'
   );

   // Ресайзим бейджики
   $('.user-answer .title img[src*="/14x/"]').each((i,el)=> {
    $(el).attr('src',$(el).attr('src').replace("/14x/","/16x16/"));
   });

   // Перемещаем дату коммента в другое место
   $('.comment .comment-time > .value').each((i,el)=> {
     let comment_title = $(el).parents('.comment').find('.title');
     let comment_title_pl = $(comment_title).find('.pseudo-link').eq(0);
     if($(comment_title_pl).length) $(comment_title_pl).before($(el));
     else $(comment_title).append($(el));
   });

   // Добавляем заголовок к блоку комментариев, когда комментариев нет
   if($('.lt-lesson-comment-block .new-comment').length) {
     $('.lt-lesson-comment-block > .lt-block-wrapper > .container > .row > div:not(:has(.lesson-answers-title))')
       .before('<div class="lesson-answers-title"><h3 style="margin-bottom: 20px;">Комментарии</h3></div>');
   } else if(!$('.lt-lesson-comment-block .other-answers.answers-list > *').length) {
     $('.lt-lesson-comment-block').remove();
   }

   // Добавляем доп блок для стилизации чекбоксов и радиокнопок
   setTimeout(()=>{
    $('.custom-field.type-select input[type="radio"]').after('<'+'span class="tick-icon" />');
    $('.custom-field.type-multi_select input[type="checkbox"]').after('<'+'span class="tick-icon" />');
   });

   $('.addfield-type-checkbox').each((i,el)=>{
     let input = $(el).find('input[type="checkbox"]');
     let label = $(input).next('label');
     if(input.length && label.length) {
       input.attr('id', label.attr('for'));
     }
   })
   
   // Перемещаем информацию о макс размере файла внутрь кнопки
   setTimeout(()=>{
     $('.uploadifive-button').each((i,el)=>{
        $(el).nextAll('.text-muted').appendTo($(el));
     })       
   });

   // Отмечаем выбранный ответ в тестировании, если стоит опция "не показывать правильный ответ".
   $(document).ajaxSend((e,xhr,settings) => {
    if (settings.url == "/pl/teach/questionary-public/do-question-answer") {
      let s = (new URLSearchParams(settings.data)).get("answerValue");
      s !== null ? s : false;
      if(s) $('.testing-widget .btn-send-variant').filter((i,el)=>{
        return $(el).html().indexOf(s) > -1;
      }).addClass('btn-answered');
    }
   });

   // Изменяем отображание номеров вопросов тестирования
   $(()=>{replaceQuestionNumberView()});
   $(document).ajaxSuccess((e,xhr,settings) => {
     if (settings.url.indexOf("/pl/teach/questionary-public/testing?id=") > -1) {
       replaceQuestionNumberView()
     }
   });
   function replaceQuestionNumberView(){
     setTimeout(()=>{
       $('.question-number').html((i,h)=>{
         let parts = h.split(" из ");
         let n1 = parts[0].replace(/\D+/g,'');
         let n2 = parts[1].replace(/\D+/g,'');
         return `${n1}<span>/${n2}</span>`;
       });
       // Jquery плагин для определения размера фоновой картинки
       let t_imgs = $('.testing-widget .question-answer-block .button-list .image-wrapper .image');
       if(t_imgs) {
         !function(t){var i=/px/,e=/%/,s=/url\(['"]*(.*?)['"]*\)/g;t.fn.getBackgroundSize=function(t){var h,n,r=new Image,a=this.css("background-size").split(" ");return i.test(a[0])&&(h=parseInt(a[0])),e.test(a[0])&&(h=this.parent().width()*(parseInt(a[0])/100)),i.test(a[1])&&(n=parseInt(a[1])),e.test(a[1])&&(n=this.parent().height()*(parseInt(a[0])/100)),void 0!==h&&void 0!==n?(t({width:h,height:n}),this):(r.onload=function(){void 0===h&&(h=this.width),void 0===n&&(n=this.height),t({width:h,height:n})},r.src=this.css("background-image").replace(s,"$1"),this)}}(jQuery);
         $(t_imgs).each((i,el)=>{
           $(el).attr('style', $(el).attr('style').replace('330x','500x'));
           $(el).getBackgroundSize((size)=>{
             $(el).css('padding-bottom', (size.height*100/size.width)+"%");
           })
         });
       }
     })
   }

   // Убираем лишний символ из даты ответа
   $('.lesson-mission-wrapper .answer-date .text-muted').each((i,el)=>{
     $(el).html($(el).html().replace(' • ',''));
   });

   // Принимаем урок автоматически
   let lessonMissionSkipInterval = setInterval(()=>{
     if(typeof window.lessonMissionSkip != 'object' || typeof window.lessonMissionSkip.lessons != 'object') return false;
     else if(
         window.location.href.indexOf('/chatium') == -1 &&
         window.location.href.indexOf('editMode=1') == -1
     ) {
       clearInterval(lessonMissionSkipInterval);
       window.lessonId = typeof window.lessonId != "undefined" ? window.lessonId : parseInt(/id=(\d+)/gm.exec(window.location.href)[1]);
       if(lessonMissionSkip.lessons.indexOf(window.lessonId) > -1) {
         if(typeof window.lessonMissionSkip.hideMissionBlock != 'undefined' && window.lessonMissionSkip.hideMissionBlock === true) {
           $('.lt-lesson-mission-block, nav.mode-selector .link[data-mode="mission"]').hide();
         }
         $.get("/pl/teach/control/lesson/webview?mode=mission&id="+window.lessonId, function(data){
           if(!data.success) return false;
           let pageDom = $('<xxx/>').append($.parseHTML(data.data.html));       
           if (!$(pageDom).find('.self-answers .user-answer').length) {
             sendFormThroughIframe("/pl/teach/control/lesson/webview?id="+window.lessonId, {
               "LessonAnswer[answer_text]":'Просмотрено ✅',
               "LessonAnswer[lesson_id]":window.lessonId,
               "send-answer":"true",
             });
           }
         });
       }
       function sendFormThroughIframe(url,formData) {
         let iframe = $('<'+'iframe>', {name:'gagFrame',frameborder:0,border:0,width:0,height:0,style:'display:none'}).appendTo('body');
         let form = $('<'+'form>', {action:url,method:'post',target:'gagFrame'}).appendTo('body');
         $.each(formData, function (name, val) {
           form.append('<'+'input type="hidden" name="'+name+'" value="'+val+'">');
         });
         form.submit();
         setTimeout(function(){$(iframe).remove();$(form).remove()},1000);
       }
     }
   }, 50);

   // Cмена темы плеера
   $('link[href*="/public/jplayer-2.9.2/skin/pink.flag"]')
    .after('<link href="/fileservice/file/download/a/447724/sc/330/h/c803ce4c0a93dc3d9f545bc0cad9812d.css" rel="stylesheet" type="text/css">')
    .remove();

  // Блок оценки урока (Контроль качества)
  function updateFeedbackBlock(){
    $('.lt-lesson-feedback-block').each((i,el)=>{
      let $header = $(el).find('h3');
      let $description = $(el).find('.form-group:nth-child(1) label');
      let $textarea_description = $(el).find('.form-group:nth-child(2) label');
      $header.text('Поделитесь мнением об уроке');
      if($(el).find('.filled-stars[style="width: 0%"], .filled-stars:not([style])').length) {
          $description.html(`
            Оцените урок
          `)
          $textarea_description.html(`
            Все ли было понятно в уроке? Сложное ли было задание? Чего вам не хватило?<br/>Нам важно узнать ваше мнение, чтобы сделать курс лучше.
          `)
      } else {
          $description.text($description.text().replace('курс','урок'));
      }
    });
  }
  updateFeedbackBlock();
  $(document).on("ajaxSuccess", function( event, xhr, settings ) {
      if (settings.url == "/pl/teach/training/give-feedback") setTimeout(()=>{updateFeedbackBlock()});
  });

  // Меняем аудиоплеер
$(window).on('load', function(){
  $('.o-lt-lesson-audio').each(function(){
		$(this).append('<audio class="audio-src"></audio><div class="audio-container"><div class="ht-container"><div class="audio-playpause"></div><div class="ft-container"><div class="audio-name-volume"><div class="audio-name">Название трека</div><div class="audio-volume"><input class="styled-slider slider-progress" type="range" min="0" max="1" step="0.01" value="0.5"></div></div><progress class="audio-progress" value="0" max="1"></progress><div class="time-wrapper"><div class="audio-time">00:00 / 00:00</div><div class="audio-speed"><a class="audio-speed-10 active" href="javascript:void(0)">1x</a> / <a class="audio-speed-15" href="javascript:void(0)">1.5x</a> / <a class="audio-speed-20" href="javascript:void(0)">2x</a></div></div></div></div></div>')
		$(this).find('.audio-name').text($(this).find('.jp-playlist-item').text());
		$(this).find('.audio-src').attr('src', $(this).find('.jp-jplayer audio').attr('src'))
	})
	function toHHMMSS(sec) {
    	let sec_num = parseInt(sec, 10); 
    	let hours   = Math.floor(sec_num / 3600);
    	let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    	let seconds = sec_num - (hours * 3600) - (minutes * 60);

    	if (hours   < 10) {hours   = "0"+hours;}
    	if (minutes < 10) {minutes = "0"+minutes;}
    	if (seconds < 10) {seconds = "0"+seconds;}
    	return hours == "00" ? minutes+':'+seconds : hours+':'+minutes+':'+seconds;
	}
	$('.audio-src').on("canplay", function(){
		$(this).parents('.o-lt-lesson-audio').find('.audio-time').html(toHHMMSS(this.currentTime)+" / "+toHHMMSS(this.duration))
	});
	$('.audio-playpause').on('click', function() {
		let audio = $(this).parents('.o-lt-lesson-audio').find('audio').get(0);
		if($(this).hasClass('playing')) {
    		$(this).removeClass('playing');
    		audio.pause();
    		$(audio).off('timeupdate');
		} else {
			$('.audio-playpause').not(this).removeClass('playing')
    		$(this).addClass('playing');
    		audio.play();
    		$(audio).on('timeupdate', function() { 
    		$(this).parents('.o-lt-lesson-audio').find('.audio-progress').attr("value", this.currentTime / this.duration);
    		$(this).parents('.o-lt-lesson-audio').find('.audio-time').html(toHHMMSS(this.currentTime)+" / "+toHHMMSS(this.duration))
    		});
		}
	});
	$('.audio-speed a').on('click', function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		let audio = $(this).parents('.o-lt-lesson-audio').find('audio').get(0);
		if($(this).hasClass('audio-speed-10')) {
    		audio.playbackRate=1;
		}
		else if($(this).hasClass('audio-speed-15')) {
    		audio.playbackRate=1.5;
		}
		else if($(this).hasClass('audio-speed-20')) {
    		audio.playbackRate=2;
		}
	});
	$('.audio-progress').on('click', function(e) { 
		let audio = $(this).parents('.o-lt-lesson-audio').find('audio').get(0);
		var percent = e.offsetX / this.offsetWidth;
		audio.currentTime = percent * audio.duration;
		$(this).val(percent);
		$(this).parents('.o-lt-lesson-audio').find('.audio-time').html(toHHMMSS(audio.currentTime)+" / "+toHHMMSS(audio.duration))
	});
	for (let e of document.querySelectorAll('.audio-volume input[type="range"].slider-progress')) {
  		e.style.setProperty('--value', e.value);
  		e.style.setProperty('--min', e.min == '' ? '0' : e.min);
  		e.style.setProperty('--max', e.max == '' ? '100' : e.max);
  		e.addEventListener('input', () => e.style.setProperty('--value', e.value));
	}
	$('.audio-volume input').on('input', function() {
		let audio = $(this).parents('.o-lt-lesson-audio').find('audio').get(0);
        	audio.volume = $(this).val(); // Устанавливаем громкость в соответствии с ползунком
    	});
});



// Добавляем переход на след/пред модуль
(()=>{
  let $nav_left = $('.lesson-navigation td:first-child');
  let $nav_right = $('.lesson-navigation td:last-child');
  let $chatium_nav_left = $('body>.lesson-title+style+div a:contains("←")');
  let $chatium_nav_right = $('body>.lesson-title+style+div a:contains("→")');
  let needPrev = ($nav_left.length && $nav_left.text().trim() == "") || (window.PageChecker.isChatium && !$chatium_nav_left.length);
  let needNext = ($nav_right.length && $nav_right.text().trim() == "") || (window.PageChecker.isChatium && !$chatium_nav_right.length);
  if(needPrev || needNext) {
    getModule((data)=>{
      if(needPrev && typeof data.prev != "undefined") {
        if(!window.PageChecker.isChatium) {
          $nav_left.html(`
            <a class="prev-module-link" target="_self" href="${data.prev.link}"><span class="fui fui-arrow-left"></span> Предыдущий модуль</a>
            <div class="hidden-xs" style="font-weight: normal; font-size: 1em; line-height: 16px "> ${data.prev.name}</div>
          `);
        } else {
          $('body>.lesson-title+style+div').prepend(`
            <div style="flex-grow: 1; padding-left: 10px; padding-bottom: 10px;">
              <a class="prev-module-link" href="${data.prev.link}">← Предыдущий модуль</a>
            </div>
          `);
        }
      }
      if(needNext && typeof data.next != "undefined") {
        if(!window.PageChecker.isChatium) {
          $nav_right.html(`
            <a class="next-module-link" target="_self" href="${data.next.link}">Следующий модуль <span class="fui fui-arrow-right"></span> </a>
            <div class="hidden-xs" style="font-weight: normal; font-size: 1em; line-height: 16px "> ${data.next.name}</div>
          `);
        } else {
          $('body>.lesson-title+style+div').append(`
            <div style="flex-grow: 1; text-align: right; padding-right: 10px; padding-bottom: 10px;">
              <a class="next-module-link" href="${data.next.link}">Следующий модуль →</a>
            </div>
          `);
        }
      }
    });
  }
  function getModule(callback){
   let interv = setInterval(()=>{
    let m, parents = [], regex = /p-(\d+)/gm;
    if(!regex.test($('body').attr('class'))) return false;
    clearInterval(interv);
    regex.lastIndex = 0;
    while ((m = regex.exec($('body').attr('class'))) !== null) {
      if (m.index === regex.lastIndex)  regex.lastIndex++;
      parents.push(m[1]);
    }
    if(parents.length >=2 ) {
      let currentTraining = '/teach/control/stream/view/id/'+parents[parents.length - 1];
      let parentTraining = '/teach/control/stream/view/id/'+parents[parents.length - 2];
      $.get(parentTraining, (data)=>{
        let pageDom = $('<xxx/>').append($.parseHTML(data));
        let $currentTraining = pageDom.find('.stream-table tr[data-training-id="'+currentTraining.replace(/\D+/,"")+'"]');
        let $nextTraining = $currentTraining.next('tr');
        let $prevTraining = $currentTraining.prev('tr');
        let result = {};
        if($nextTraining.length) Object.assign(result, {
          "next":{
            "name": $nextTraining.find('.stream-title').text().trim(),
            "link": $nextTraining.find('a').eq(0).attr('href'),
          }
        });
        if($prevTraining.length) Object.assign(result, {
          "prev":{
            "name": $prevTraining.find('.stream-title').text().trim(),
            "link": $prevTraining.find('a').eq(0).attr('href'),
          }
        });
        callback(result);
      });
    } else callback({});
   },10);
  }
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
