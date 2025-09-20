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
