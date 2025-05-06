  const mainHeader = article.querySelector('h1');
  if (!mainHeader) return;
  
  // Проверяем, есть ли информация об авторе (обычно в формате "Написано Имя")
  const mainHeaderText = mainHeader.textContent || '';
  let authorInfo = '';
  
  // Ищем шаблон "Написано [имя]" или вариации
  const authorPattern = /Написано\s+(.*?)(?:\.\s*|$)/;
  const authorMatch = mainHeaderText.match(authorPattern);
  
  if (authorMatch && authorMatch[1]) {
    // Извлекаем информацию об авторе
    authorInfo = authorMatch[1];
    
    // Удаляем информацию об авторе из основного заголовка
    const cleanedHeaderText = mainHeaderText.replace(authorPattern, '').trim();
    
    // Создаем структуру заголовка страницы
    const pageHeader = document.createElement('div');
    pageHeader.className = 'page-header';
    
    // Новый заголовок без информации об авторе
    const titleElement = document.createElement('h1');
    titleElement.textContent = cleanedHeaderText;
    
    // Элемент для информации об авторе
    const authorElement = document.createElement('div');
    authorElement.className = 'author-info';
    authorElement.textContent = `Написано ${authorInfo}`;
    
    // Добавляем элементы в заголовок страницы
    pageHeader.appendChild(titleElement);
    pageHeader.appendChild(authorElement);
    
    // Заменяем оригинальный заголовок на новую структуру
    mainHeader.parentNode?.insertBefore(pageHeader, mainHeader);
    mainHeader.remove();
  } else {
    // Если нет информации об авторе, просто добавляем класс для стилизации
    mainHeader.classList.add('article-title');
  }
  
  // Обработка других заголовков h1 (могут быть в .popover)
  document.querySelectorAll('.popover h1, .header h1').forEach(header => {
    if (header.parentElement === article) return; // Пропускаем, если это уже обработанный основной заголовок
    header.classList.add('article-title');
  });
  
  // Исправляем проблему переполнения текста для заголовков
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(header => {
    const headerEl = header as HTMLElement;
    headerEl.style.wordWrap = 'break-word';
    headerEl.style.overflowWrap = 'break-word';
    headerEl.style.maxWidth = '100%';
  });
}

// DOMContentLoaded - запускаем все функции
document.addEventListener('DOMContentLoaded', init);

// Экспортируем строку для совместимости с интерфейсом QuartzComponent
export default `(() => {
  ${init.toString()}
  document.addEventListener('DOMContentLoaded', init);
})();`;
