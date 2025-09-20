 // ===== Добавляем переход на след/пред модуль (исправлено) =====
      (function () {
        let $nav_left = $('.lesson-navigation td:first-child');
        let $nav_right = $('.lesson-navigation td:last-child');
        let $chatium_nav_left = isChatium ? $('body>.lesson-title+style+div a:contains("←")') : $();
        let $chatium_nav_right = isChatium ? $('body>.lesson-title+style+div a:contains("→")') : $();

        // нужно добавить, если НЕТ ссылок
        let needPrev = ($nav_left.length && $nav_left.text().trim() == '') || (isChatium && !$chatium_nav_left.length);
        let needNext = ($nav_right.length && $nav_right.text().trim() == '') || (isChatium && !$chatium_nav_right.length);

        if (needPrev || needNext) {
          getModule((data) => {
            if (needPrev && typeof data.prev != 'undefined') {
              if (!isChatium) {
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
            if (needNext && typeof data.next != 'undefined') {
              if (!isChatium) {
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

        function getModule(callback) {
          let interv = setInterval(() => {
            let m,
              parents = [],
              regex = /p-(\d+)/gm;
            if (!regex.test($('body').attr('class') || '')) return false;
            clearInterval(interv);
            regex.lastIndex = 0;
            while ((m = regex.exec($('body').attr('class'))) !== null) {
              if (m.index === regex.lastIndex) regex.lastIndex++;
              parents.push(m[1]);
            }
            if (parents.length >= 2) {
              let currentTraining = '/teach/control/stream/view/id/' + parents[parents.length - 1];
              let parentTraining = '/teach/control/stream/view/id/' + parents[parents.length - 2];
              $.get(parentTraining, (data) => {
                let pageDom = $('<xxx/>').append($.parseHTML(data));
                let $currentTraining = pageDom.find('.stream-table tr[data-training-id="' + currentTraining.replace(/\D+/, '') + '"]');
                let $nextTraining = $currentTraining.next('tr');
                let $prevTraining = $currentTraining.prev('tr');
                let result = {};
                if ($nextTraining.length)
                  Object.assign(result, {
                    next: {
                      name: $nextTraining.find('.stream-title').text().trim(),
                      link: $nextTraining.find('a').eq(0).attr('href')
                    }
                  });
                if ($prevTraining.length)
                  Object.assign(result, {
                    prev: {
                      name: $prevTraining.find('.stream-title').text().trim(),
                      link: $prevTraining.find('a').eq(0).attr('href')
                    }
                  });
                callback(result);
              });
            } else callback({});
          }, 10);
        }
      })();

      // ===== Кнопки переключения уроков внизу урока (исправлено) =====
      (function () {
        let $nav_left = $('.lesson-navigation td:first-child a');
        let $nav_right = $('.lesson-navigation td:last-child a');
        let $chatium_nav_left = isChatium ? $('body>.lesson-title+style+div a:contains("←")') : $();
        let $chatium_nav_right = isChatium ? $('body>.lesson-title+style+div a:contains("→")') : $();

        let needPrev = ($nav_left.length && $nav_left.text().trim() != '') || (isChatium && $chatium_nav_left.length);
        let needNext = ($nav_right.length && $nav_right.text().trim() != '') || (isChatium && $chatium_nav_right.length);

        let arrowLeft =
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 18L4 12L10 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        let arrowRight =
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 18L20 12L14 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

        const translations = {
          ru: { prevLesson: 'Предыдущий урок', nextLesson: 'Следующий урок', home: 'На главную' },
          en: { prevLesson: 'Previous lesson', nextLesson: 'Next lesson', home: 'Home' }
        };
        let lang = $('html').attr('lang') || 'ru';
        let texts = translations[lang] || translations['ru'];

        let $prevLink, $nextLink;

        if (isChatium) {
          $prevLink = $chatium_nav_left.clone().addClass('nav-prev').html(arrowLeft + texts.prevLesson);
          $nextLink = $chatium_nav_right.clone().addClass('nav-next').html(texts.nextLesson + arrowRight);
        } else {
          $prevLink = $nav_left.clone().addClass('nav-prev').html(arrowLeft + texts.prevLesson);
          $nextLink = $nav_right.clone().addClass('nav-next').html(texts.nextLesson + arrowRight);
        }

        if (!needPrev) $prevLink = $('<a class="nav-prev inactive">' + arrowLeft + texts.prevLesson + '</a>');
        if (!needNext) $nextLink = $('<a class="nav-next inactive">' + texts.nextLesson + arrowRight + '</a>');

        let $bottomNavBlock = $('<div class="bottom-nav"></div>');
        $bottomNavBlock.append($prevLink);
        $bottomNavBlock.append($('<a href="/teach/control/stream">' + texts.home + '</a>'));
        $bottomNavBlock.append($nextLink);

        if ($('.lt-lesson-comment-block').length) {
          $('.lt-lesson-comment-block').before($bottomNavBlock);
        } else {
          ($('.lite-page.block-set').eq(0).length ? $('.lite-page.block-set').eq(0) : $('body')).append($bottomNavBlock);
        }
      })();
      // ===== конец setTimeout =====
    }, 0);
  });
})();
