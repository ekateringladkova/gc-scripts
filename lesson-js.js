document.addEventListener("DOMContentLoaded", function() {
  // Ищем все div с указанными классами
  let blocks = document.querySelectorAll(
    ".lite-block-live-wrapper.o-lt-lesson.o-lt-lesson-feedback-block"
  );

  blocks.forEach(function(block) {
    // Создаём элемент для вставки
    let note = document.createElement("div");
    note.textContent = "Hello, button";
    note.style.fontWeight = "bold"; // пример стиля (можно убрать/заменить)

    // Вставляем перед найденным div
    block.parentNode.insertBefore(note, block);
  });
});

