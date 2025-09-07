// app.js — простой рендер HTML на страницу GetCourse
(function () {
  // 1) ТВОЙ HTML — сюда поставь свою разметку
  const html = `
    <div id="my-widget" style="padding:16px; border:1px solid #ddd; background:#fff; margin:16px 0;">
      <h3 style="margin:0 0 8px;">Привет из внешнего скрипта 👋</h3>
      <p style="margin:0;">Этот блок вставлен через app.js</p>
    </div>
  `;

  // 2) КУДА ВСТАВЛЯТЬ
  // Вариант А: в специально созданный плейсхолдер <div id="gc-widget"></div>
  function mountIntoPlaceholder() {
    const el = document.querySelector('#gc-widget');
    if (!el) return false;
    el.innerHTML = html;
    return true;
  }

  // Вариант Б: если плейсхолдера нет — вставим в конец основного контента/тела
  function mountFallback() {
    // попробуем «главную колонку» (если есть), иначе — в body
    const host =
      document.querySelector('.content, .gc-main, .layout__content') ||
      document.body;
    host.insertAdjacentHTML('beforeend', html);
    return true;
  }

  // 3) ИНИЦИАЛИЗАЦИЯ (в правильный момент)
  function init() {
    // сначала пробуем в плейсхолдер, если создали его на странице
    if (mountIntoPlaceholder()) return;
    // иначе — просто вставим в конец
    mountFallback();
  }

  // 4) ЗАПУСК: когда DOM готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 5) Подстрахуемся на динамических страницах GetCourse (контент подгружается без перезагрузки)
  let t;
  new MutationObserver(() => {
    clearTimeout(t);
    t = setTimeout(() => {
      // если нашего блока нет (например, контент перерисовали) — добавим снова
      if (!document.querySelector('#my-widget')) init();
    }, 150);
  }).observe(document.body, { childList: true, subtree: true });
})();
