// app.js — рендер календаря на страницу GetCourse из внешнего скрипта
(function () {
  // 0) Куда монтировать: если есть <div id="gc-widget"></div> — вставим туда; иначе в конец body
  function getMount() {
    return document.querySelector('#gc-widget') || document.body;
  }

  // 1) Вставляем HTML в DOM (твоя разметка из вопроса)
  const html = `
  <div class="calendar-wrapper">
    <div class="cal-header">
      <button onclick="prevMonth()" class="cal-arrow">&#9668;</button>
      <h2 id="month-year" class="cal"></h2>
      <button onclick="nextMonth()" class="cal-arrow">&#9658;</button>
    </div>
    <div class="calendar" id="calendar"></div>
    <div id="event-info">
      <button class="close-btn" onclick="closeEventInfo()">×</button>
      <div id="event-details"></div>
    </div>
    <ul id="events-list" class="events-list"></ul>
  </div>
  `;

  function mount() {
    const mountPoint = getMount();
    // чтобы не дублировать при повторной инициализации:
    if (!document.getElementById('month-year')) {
      mountPoint.insertAdjacentHTML('beforeend', html);
    }
  }

  // 2) ДАННЫЕ событий (твои)
  const events = {
      "2025-2-28": [{
          "type": "Прямой эфир",
          "text": "Моделирование тюльпана в SpeedTree",
          "time": "16:00",
          "description": "Александр Абрамов. Прямой эфир проходит в Telegram-чате клуба",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-3-5": [{
          "type": "Конкурс",
          "text": "Окнончание приёма работ на конкурс «Букет к 8 марта»",
          "time": "23:59",
          "description": "Приём работ ведется через Бот поддержки!",
          "link": "https://t.me/happy3d_bot",
          "link_text": "Перейти в Бот поддержки"
      }],
      "2025-3-6": [{
          "type": "Конкурс",
          "text": "Голосование по конкурсу «Букет к 8 марта»",
          "time": "10:00",
          "description": "Конкурс не состоялся",
          "link": "",
          "link_text": ""
      }],
      "2025-3-7": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир",
          "time": "",
          "description": "Прямой эфир отменён, встречаемся 14 марта!",
          "link": "",
          "link_text": ""
      }],
      "2025-3-14": [{
          "type": "Прямой эфир",
          "text": "Ошибки при настройке материалов Corona Legacy/Physical",
          "time": "16:00",
          "description": "Екатерина Гладкова<br>Для разбора работы в прямом эфире, присылайте ссылку на архив в Бот поддержки с пометкой «На эфир».<br>Прямой эфир будет проходить в Telegram-чате Клуба.",
          "link": "",
          "link_text": ""
      }],
      "2025-3-21": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Александром Поспеловым",
          "time": "16:00",
          "description": "Тема: Использование нейросетей в моделировании",
          "link": "",
          "link_text": ""
      }],
      "2025-3-28": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Радмиром Аминевым",
          "time": "19:00",
          "description": "Substance 3D Painter",
          "link": "",
          "link_text": ""
      }],
      "2025-4-4": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Андреем Фроловым",
          "time": "19:00",
          "description": "Создание мрамора в Substance 3D Designer - часть 1",
          "link": "https://t.me/c/1971553732/42507",
          "link_text": "Ссылка на стрим"
      }],
      "2025-4-11": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Евгением Носиком",
          "time": "19:00",
          "description": "Создание реалистичного полотенца от А до Я - часть 1",
          "link": "https://t.me/c/1971553732/42922",
          "link_text": "Ссылка на стрим"
      }],
      "2025-4-18": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Екатериной Гладковой",
          "time": "19:00",
          "description": "Конвертация материалов между Legacy и Physical",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-4-25": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Александром Абрамовым ",
          "time": "19:00",
          "description": "Создание подсолнуха в Speed Tree",
          "link": "https://t.me/c/1971553732/43577",
          "link_text": "Запись стрима"
      }],
      "2025-5-9": [{
          "type": "Объявление",
          "text": "С днём Победы!",
          "time": "",
          "description": "На этой неделе стрима не будет. Желаем отличных майских праздников!",
          "link": "",
          "link_text": ""
      }],
      "2025-5-16": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Евгением Носиком",
          "time": "16:00",
          "description": "Создание реалистичного полотенца от А до Я - часть 2",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-5-23": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Андреем Фроловым",
          "time": "19:00",
          "description": "Создание мрамора в Substance 3D Designer - часть 2",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-5-30": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Радмиром Аминевым",
          "time": "16:00",
          "description": "Моделирование спортивных товаров",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-6-6": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Екатериной Гладковой",
          "time": "19:00",
          "description": "PhysX симуляция падения объектов в TyFlow",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-6-13": [{
          "type": "Объявление",
          "text": "С днём России!",
          "time": "",
          "description": "На этой неделе стрима не будет. Желаем хороших выходных!",
          "link": "",
          "link_text": ""
      }],
      "2025-6-20": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Евгением Носиком",
          "time": "16:00",
          "description": "Моделирование обуви в Marvelous Designer",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-6-27": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Радмиром Аминевым",
          "time": "16:00",
          "description": "Моделирование спортивных товаров - часть 2",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-7-4": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Екатериной Гладковой",
          "time": "19:00",
          "description": "Голографические, радужные и перламутровые материалы в Chaos Corona",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-7-11": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Андреем Фроловым",
          "time": "19:00",
          "description": "Dirt-карты в Substance Designer",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-7-18": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Андреем Фроловым",
          "time": "19:00",
          "description": "Материал бетонной стены в Substance Designer",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-7-25": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Радмиром Аминевым",
          "time": "16:00",
          "description": "Моделирование для стока",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-8-1": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Евгением Носиком",
          "time": "16:00",
          "description": "Моделирование обуви в Marvelous Designer - часть 2",
          "link": "https://t.me/+IFvqrBU-nkg1OWIy",
          "link_text": "Telegram"
      }],
      "2025-8-15": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Екатериной Гладковой",
          "time": "19:00",
          "description": "CoronaTileMap",
          "link": "https://vk.com/video-42798791_456239544?list=ln-ZCbLxOLip2PLbxLV2Y",
          "link_text": "VK Видео"
      }],
      "2025-8-24": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Кириллом Воиновым",
          "time": "13:00",
          "description": "Основы Zbrush",
          "link": "https://vk.com/video-42798791_456239545?list=ln-uGSSCSdfsj70G4eBTv",
          "link_text": "VK Видео"
      }],
      "2025-8-29": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Александром Поспеловым",
          "time": "16:00",
          "description": "Геометрические ноды в Blender - процедурное кашпо",
          "link": "https://vk.com/video-42798791_456239542?list=ln-WquqaTbuaPZLOe4NVO",
          "link_text": "VK Видео"
      }],
      "2025-9-12": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Евгением Носиком",
          "time": "19:00",
          "description": "Моделирование дивана Lowell в Marvelous Designer",
          "link": "https://vk.com/video-42798791_456239549?list=ln-VQcDkNG4zlv73a2yw8",
          "link_text": "VK Видео"
      }],
      "2025-9-26": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Андреем Фроловым",
          "time": "19:00",
          "description": "Адаптивная плитка с дождём и снегом в Substance Designer - часть 1",
          "link": "https://vkvideo.ru/video-42798791_456239558?list=ln-XH3rMOLf9BtCFw5j0I",
          "link_text": "VK Видео"
      }],
      "2025-10-3": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Александром Поспеловым",
          "time": "16:00",
          "description": "Геоноды в Blender",
          "link": "https://vkvideo.ru/video-42798791_456239564",
          "link_text": "VK Видео"
      }],
      "2025-10-13": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Радмиром Аминевым",
          "time": "16:00",
          "description": "Моделирование спортивных товаров. Продолжение",
          "link": "https://vk.com/video-42798791_456239566?list=ln-BGzfiovqxLwnVjprtQ",
          "link_text": "VK Видео"
      }],
      "2025-10-17": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Екатериной Гладковой",
          "time": "19:00",
          "description": "Все про превью для 3DDD. Результаты конкурса.",
          "link": "https://vk.com/video-42798791_456239569?list=ln-0QY9izAp3GNNE1pI3A",
          "link_text": "VK Видео"
      }],
      "2025-10-24": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Евгением Носиком",
          "time": "19:00",
          "description": "Моделирование сумки в Marvelous Designer",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=345144024&editMode=0",
          "link_text": "Перейти на стрим"
      }],
      "2025-10-31": [{
          "type": "Прямой эфир",
          "text": "Прямой эфир с Екатериной Гладковой",
          "time": "19:00",
          "description": "Знакомство с ForestPack",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=345247229&editMode=0",
          "link_text": "Перейти на стрим"
      }],
      "2025-11-4": [{
          "type": "Объявление",
          "text": "С днём народного единства!",
          "time": "",
          "description": "",
          "link": "",
          "link_text": ""
      }],
          "2025-11-7": [{
          "type": "Прямой эфир",
          "text": "Адаптивная плитка с дождём и снегом в Substance Designer - часть 2",
          "time": "19:00",
          "description": "с Андреем Фроловым",
          "link": "",
          "link_text": "Перейти на стрим"
      }],
          "2025-11-14": [{
          "type": "Объявление",
          "text": "Стрим на этой неделе отменён",
          "time": "",
          "description": "К сожалению, вынуждены стрим на этой неделе отменить. Увидимся на следующей неделе! Хороших выходных!",
          "link": "",
          "link_text": ""
      }],
          "2025-11-21": [{
          "type": "Прямой эфир",
          "text": "Chaos Corona 14",
          "time": "19:00",
          "description": "с Екатериной Гладковой",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=345528554&editMode=0",
          "link_text": "Перейти на стрим"
      }],
          "2025-11-28": [{
          "type": "Прямой эфир",
          "text": "Моделирование сумки в Marvelous Designer - часть 2",
          "time": "19:00",
          "description": "с Евгением Носиком",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=345653027&editMode=0",
          "link_text": "Перейти на стрим"
      }],
    
          "2025-12-5": [{
          "type": "Прямой эфир",
          "text": "Результаты конкурса. Геоноды Blender.",
          "time": "19:00",
          "description": "с Александром Поспеловым",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=345815476&editMode=0",
          "link_text": "Перейти на стрим"
      }],
          "2025-12-12": [{
          "type": "Объявление",
          "text": "Стрим перенесен",
          "time": "",
          "description": "",
          "link": "",
          "link_text": "Перейти на стрим"
      }],
          "2025-12-19": [{
          "type": "Прямой эфир",
          "text": "Развертка",
          "time": "16:00",
          "description": "с Радмиром Аминевым",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=345897870&editMode=0",
          "link_text": "Перейти на стрим"
      }],
          "2025-12-26": [{
          "type": "Прямой эфир",
          "text": "Вода в tyFlow",
          "time": "16:00",
          "description": "с Екатериной Гладковой",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=346103010&editMode=0",
          "link_text": "Перейти на стрим"
      }],
      "2025-12-31": [{
          "type": "Объявление",
          "text": "С Новым годом!",
          "time": "",
          "description": "",
          "link": "",
          "link_text": ""
      }],
      "2026-1-15": [{
          "type": "Прямой эфир",
          "text": "Моделирование новогоднего декора",
          "time": "18:00",
          "description": "с Александром Поспеловым",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=346339296&editMode=0",
          "link_text": "Перейти на стрим"
      }],
      "2026-1-23": [{
          "type": "Объявление",
          "text": "Стрим отменен",
          "time": "",
          "description": "",
          "link": "",
          "link_text": ""
      }],
      "2026-1-30": [{
          "type": "Объявление",
          "text": "Стрим отменен",
          "time": "",
          "description": "",
          "link": "",
          "link_text": ""
      }],
      "2026-2-6": [{
          "type": "Прямой эфир",
          "text": "Ретопология нейросетевой модели",
          "time": "17:30",
          "description": "с Александром Поспеловым",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=346456077",
          "link_text": "Перейти на стрим"
      }],
      "2026-2-13": [{
          "type": "Прямой эфир",
          "text": "Моделирование Serip Geyser Fontain Oval - часть 1",
          "time": "18:00",
          "description": "с Екатериной Гладковой",
          "link": "https://happy3d.ru/pl/teach/control/lesson/view?id=346778393",
          "link_text": "Перейти на стрим"
      }]
  };

  // 3) ЛОГИКА календаря (твоя, с минимальными доп. правками)
  let currentDate = new Date();
  let selectedDay = null;

  function renderCalendar() {
    const monthYear = document.getElementById("month-year");
    const calendar = document.getElementById("calendar");
    const eventsList = document.getElementById("events-list");

    if (!monthYear || !calendar || !eventsList) return; // если DOM ещё не вставился

    let monthYearText = currentDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
    monthYearText = monthYearText.charAt(0).toUpperCase() + monthYearText.slice(1);
    monthYear.textContent = monthYearText;

    calendar.innerHTML = "";

    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    weekDays.forEach(day => {
      const headerDiv = document.createElement("div");
      headerDiv.classList.add("weekday-header");
      headerDiv.textContent = day;
      calendar.appendChild(headerDiv);
    });

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // сдвиг на понедельник
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const nextMonthDays = 42 - (adjustedFirstDay + daysInMonth);

    // предыдущий месяц
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day", "outside-month");
      dayDiv.textContent = prevMonthDays - i;
      calendar.appendChild(dayDiv);
    }

    // текущий месяц
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");

      const dateNumDiv = document.createElement("div");
      dateNumDiv.classList.add("date-num");
      dateNumDiv.textContent = day;
      dayDiv.appendChild(dateNumDiv);

      const dow = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay();
      if (dow === 0 || dow === 6) dayDiv.classList.add("weekend");

      const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;

      if (events[key]) {
        const eventArray = events[key];
        dayDiv.classList.add("day-has-event");

        const eventDots = document.createElement("div");
        eventDots.classList.add("event-dots");

        eventArray.forEach(event => {
          const dot = document.createElement("div");
          dot.classList.add("event-dot");
          if (event.type === 'Конкурс') dot.style.backgroundColor = '#ffc738';
          else if (event.type === 'Прямой эфир') dot.style.backgroundColor = '#e63946';
          else if (event.type === 'Объявление') dot.style.backgroundColor = '#d2d2d2';
          eventDots.appendChild(dot);
        });

        dayDiv.appendChild(eventDots);
        dayDiv.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleSelectDay(dayDiv, eventArray);
        });
      }

      const today = new Date();
      const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      if (key === todayKey) dayDiv.classList.add("today");

      calendar.appendChild(dayDiv);
    }

    // следующий месяц
    for (let i = 1; i <= nextMonthDays; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day", "outside-month");
      dayDiv.textContent = i;
      calendar.appendChild(dayDiv);
    }

    renderUpcomingEvents();
  }

  function renderUpcomingEvents() {
    const eventsList = document.getElementById("events-list");
    if (!eventsList) return;

    const upcomingEvents = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const futureDate = new Date(today.getTime());
      futureDate.setDate(today.getDate() + i);

      const key = `${futureDate.getFullYear()}-${futureDate.getMonth() + 1}-${futureDate.getDate()}`;
      if (events[key]) {
        events[key].forEach(event => {
          upcomingEvents.push({
            date: futureDate,
            text: event.text,
            type: event.type,
            time: event.time
          });
        });
      }
    }

    const grouped = upcomingEvents.reduce((acc, ev) => {
      const dateStr = ev.date.toLocaleDateString('ru-RU');
      (acc[dateStr] = acc[dateStr] || []).push(ev);
      return acc;
    }, {});

    eventsList.innerHTML = '';
    Object.keys(grouped).forEach(dateStr => {
      const dateEvents = grouped[dateStr];
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${dateStr}</strong>
        <ul>
          ${dateEvents.map(ev => `
            <li class="${ev.type}">
              <span>${ev.time ? ev.time + ' - ' : ''}${ev.text} - ${ev.type.charAt(0).toUpperCase() + ev.type.slice(1)}</span>
            </li>
          `).join('')}
        </ul>
      `;
      eventsList.appendChild(li);
    });
  }

  function toggleSelectDay(dayDiv, eventArray) {
    const eventInfo = document.getElementById("event-info");
    if (!eventInfo) return;

    if (window._selectedDay === dayDiv) {
      dayDiv.classList.remove("selected-day");
      eventInfo.classList.remove("show");
      window._selectedDay = null;
    } else {
      if (window._selectedDay) window._selectedDay.classList.remove("selected-day");
      window._selectedDay = dayDiv;
      dayDiv.classList.add("selected-day");
      showEventInfo(eventArray);
    }
  }

  function showEventInfo(eventArray) {
    const eventInfo = document.getElementById("event-info");
    const eventDetails = document.getElementById("event-details");
    if (!eventInfo || !eventDetails) return;

    eventDetails.innerHTML = "";
    eventArray.forEach(event => {
      eventDetails.innerHTML += `
        <div class="each-cal-event">
          <div class="cal-event-container">
            <div class="cal-event-box">
              ${event.time ? `<span class="cal-event-time">${event.time}</span>` : ''}
            </div>
            <div class="cal-event-box">
              <span class="cal-event-name">${event.text}</span>
              <p class="cal-event-type">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
              <p class="cal-event-descrip">${event.description}</p>
              ${event.link ? `<p class="cal-event-descrip"><a href="${event.link}" target="_blank" rel="noopener noreferrer">${event.link_text}</a></p>` : ''}
            </div>
          </div>
        </div>
      `;
    });
    eventInfo.classList.add("show");
  }

  // 4) Глобальные обработчики для inline onclick (важно!)
  window.prevMonth = function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  };
  window.nextMonth = function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  };
  window.closeEventInfo = function () {
    const eventInfo = document.getElementById("event-info");
    if (eventInfo) eventInfo.classList.remove("show");
    if (window._selectedDay) {
      window._selectedDay.classList.remove("selected-day");
      window._selectedDay = null;
    }
  };

  // 5) Инициализация
  function init() {
    mount();
    renderCalendar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 6) Подстраховка для динамической смены контента на GetCourse
  let to;
  new MutationObserver(() => {
    clearTimeout(to);
    to = setTimeout(() => {
      if (!document.getElementById('month-year')) {
        init();
      }
    }, 150);
  }).observe(document.body, { childList: true, subtree: true });
})();
