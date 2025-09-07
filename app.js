// app.js — простой рендер HTML на страницу GetCourse
(function () {
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

    <script>
        let currentDate = new Date();
        const eventInfo = document.getElementById("event-info");
        const eventDetails = document.getElementById("event-details");
        const calendar = document.getElementById("calendar");
        const eventsList = document.getElementById("events-list");

        const events = {
            "2025-2-28": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Моделирование тюльпана в SpeedTree", 
                    time: "16:00", 
                    description: "Александр Абрамов. Прямой эфир проходит в Telegram-чате клуба", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-3-5": [ 
                { 
                    type: 'Конкурс', 
                    text: "Окнончание приёма работ на конкурс «Букет к 8 марта»", 
                    time: "23:59", 
                    description: "Приём работ ведется через Бот поддержки!", 
                    link: "https://t.me/happy3d_bot",
                    link_text: "Перейти в Бот поддержки"
                }
            ],
            "2025-3-6": [ 
                { 
                    type: 'Конкурс', 
                    text: "Голосование по конкурсу «Букет к 8 марта»", 
                    time: "10:00", 
                    description: "Конкурс не состоялся", 
                    link: "",
                    link_text: ""
                }
            ],
            "2025-3-7": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир", 
                    time: "", 
                    description: "Прямой эфир отменён, встречаемся 14 марта!", 
                    link: "",
                    link_text: ""
                }
            ],
            "2025-3-14": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Ошибки при настройке материалов Corona Legacy/Physical", 
                    time: "16:00", 
                    description: "Екатерина Гладкова<br>Для разбора работы в прямом эфире, присылайте ссылку на архив в Бот поддержки с пометкой «На эфир».<br>Прямой эфир будет проходить в Telegram-чате Клуба.", 
                    link: "",
                    link_text: ""
                }
            ],
            "2025-3-21": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Александром Поспеловым", 
                    time: "16:00", 
                    description: "Тема: Использование нейросетей в моделировании", 
                    link: "",
                    link_text: ""
                }
            ],
            "2025-3-28": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Радмиром Аминевым", 
                    time: "19:00", 
                    description: "Substance 3D Painter", 
                    link: "",
                    link_text: ""
                }
            ],
            "2025-4-4": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Андреем Фроловым", 
                    time: "19:00", 
                    description: "Создание мрамора в Substance 3D Designer - часть 1", 
                    link: "https://t.me/c/1971553732/42507",
                    link_text: "Ссылка на стрим"
                }
            ],
            "2025-4-11": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Евгением Носиком", 
                    time: "19:00", 
                    description: "Создание реалистичного полотенца от А до Я - часть 1", 
                   link: "https://t.me/c/1971553732/42922",
                    link_text: "Ссылка на стрим"
                }
            ],
            "2025-4-18": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Екатериной Гладковой", 
                    time: "19:00", 
                    description: "Конвертация материалов между Legacy и Physical", 
                   link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-4-25": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Александром Абрамовым ", 
                    time: "19:00", 
                    description: "Создание подсолнуха в Speed Tree", 
                    link: "https://t.me/c/1971553732/43577",
                    link_text: "Запись стрима"
                }
            ],
            "2025-5-9": [ 
                { 
                    type: 'Объявление', 
                    text: "С днём Победы!", 
                    time: "", 
                    description: "На этой неделе стрима не будет. Желаем отличных майских праздников!", 
                    link: "",
                    link_text: ""
                }
            ],
            "2025-5-16": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Евгением Носиком", 
                    time: "16:00", 
                    description: "Создание реалистичного полотенца от А до Я - часть 2", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-5-23": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Андреем Фроловым", 
                    time: "19:00", 
                    description: "Создание мрамора в Substance 3D Designer - часть 2", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-5-30": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Радмиром Аминевым", 
                    time: "16:00", 
                    description: "Моделирование спортивных товаров", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-6-6": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Екатериной Гладковой", 
                    time: "19:00", 
                    description: "PhysX симуляция падения объектов в TyFlow", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-6-13": [ 
                { 
                    type: 'Объявление', 
                    text: "С днём России!", 
                    time: "", 
                    description: "На этой неделе стрима не будет. Желаем хороших выходных!", 
                    link: "",
                    link_text: ""
                }
            ],
            "2025-6-20": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Евгением Носиком", 
                    time: "16:00", 
                    description: "Моделирование обуви в Marvelous Designer", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-6-27": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Радмиром Аминевым", 
                    time: "16:00", 
                    description: "Моделирование спортивных товаров - часть 2", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-7-4": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Екатериной Гладковой", 
                    time: "19:00", 
                    description: "Голографические, радужные и перламутровые материалы в Chaos Corona", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-7-11": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Андреем Фроловым", 
                    time: "19:00", 
                    description: "Dirt-карты в Substance Designer", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-7-18": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Андреем Фроловым", 
                    time: "19:00", 
                    description: "Материал бетонной стены в Substance Designer", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-7-25": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Радмиром Аминевым", 
                    time: "16:00", 
                    description: "Моделирование для стока", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-8-1": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Евгением Носиком", 
                    time: "16:00", 
                    description: "Моделирование обуви в Marvelous Designer - часть 2", 
                    link: "https://t.me/+IFvqrBU-nkg1OWIy",
                    link_text: "Telegram"
                }
            ],
            "2025-8-15": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Екатериной Гладковой", 
                    time: "19:00", 
                    description: "CoronaTileMap", 
                    link: "https://vk.com/video-42798791_456239544?list=ln-ZCbLxOLip2PLbxLV2Y",
                    link_text: "VK Видео"
                }
            ],
            "2025-8-24": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Кириллом Воиновым", 
                    time: "13:00", 
                    description: "Основы Zbrush", 
                    link: "https://vk.com/video-42798791_456239545?list=ln-uGSSCSdfsj70G4eBTv",
                    link_text: "VK Видео"
                }
            ],
            "2025-8-29": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Александром Поспеловым", 
                    time: "16:00", 
                    description: "Геометрические ноды в Blender - процедурное кашпо", 
                    link: "https://vk.com/video-42798791_456239542?list=ln-WquqaTbuaPZLOe4NVO",
                    link_text: "VK Видео"
                }
            ],
            "2025-9-12": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Евгением Носиком", 
                    time: "19:00", 
                    description: "Marvelous Designer", 
                    link: "",
                    link_text: "VK Видео"
                }
            ],
            "2025-9-19": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Андреем Фроловым", 
                    time: "19:00", 
                    description: "Substance Designer", 
                    link: "",
                    link_text: "VK Видео"
                }
            ],
            "2025-9-26": [ 
                { 
                    type: 'Прямой эфир', 
                    text: "Прямой эфир с Екатериной Гладковой", 
                    time: "19:00", 
                    description: "Rail Clone", 
                    link: "",
                    link_text: "VK Видео"
                }
            ]
        };

        let selectedDay = null;

        // Функция для рендеринга календаря
        function renderCalendar() {
const monthYear = document.getElementById("month-year");
let monthYearText = currentDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
monthYearText = monthYearText.charAt(0).toUpperCase() + monthYearText.slice(1); // Делаем первую букву заглавной
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
            const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Сдвиг на понедельник
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            const nextMonthDays = 42 - (adjustedFirstDay + daysInMonth);

            // Заполняем дни предыдущего месяца
            for (let i = adjustedFirstDay - 1; i >= 0; i--) {
                const dayDiv = document.createElement("div");
                dayDiv.classList.add("day", "outside-month");
                dayDiv.textContent = prevMonthDays - i;
                calendar.appendChild(dayDiv);
            }

            // Создаем ячейки с днями текущего месяца
            for (let day = 1; day <= daysInMonth; day++) {
                const dayDiv = document.createElement("div");
                dayDiv.classList.add("day");

                // Вставляем число в блок date-num
                const dateNumDiv = document.createElement("div");
                dateNumDiv.classList.add("date-num");
                dateNumDiv.textContent = day;
                dayDiv.appendChild(dateNumDiv);

                // Проверка выходного дня
                if (new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay() === 0 || new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay() === 6) {
                    dayDiv.classList.add("weekend");
                }

                const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`; 

                // Проверка на наличие событий и добавление класса day-has-event
                if (events[key]) {
                    const eventArray = events[key];

                    // Добавляем класс day-has-event
                    dayDiv.classList.add("day-has-event");

                    // Создаем блок для кружочков
                    const eventDots = document.createElement("div");
                    eventDots.classList.add("event-dots");

                    // Создаем кружочки для всех событий в этот день
                    eventArray.forEach(event => {
                        const dot = document.createElement("div");
                        dot.classList.add("event-dot");

                        if (event.type === 'Конкурс') {
                            dot.style.backgroundColor = '#ffc738';
                        } else if (event.type === 'Прямой эфир') {
                            dot.style.backgroundColor = '#e63946';
                        } else if (event.type === 'Объявление') {
                            dot.style.backgroundColor = '#d2d2d2';
                        }

                        eventDots.appendChild(dot);
                    });

                    dayDiv.appendChild(eventDots);

                    dayDiv.addEventListener("click", (e) => {
                        e.stopPropagation(); // Чтобы клик не прокачивался на body
                        toggleSelectDay(dayDiv, eventArray);
                    });
                }

                // Добавляем класс today для сегодняшнего дня
                const today = new Date();
                const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

                if (key === todayKey) {
                    dayDiv.classList.add("today");
                }

                calendar.appendChild(dayDiv);
            }

            // Заполняем дни следующего месяца
            for (let i = 1; i <= nextMonthDays; i++) {
                const dayDiv = document.createElement("div");
                dayDiv.classList.add("day", "outside-month");
                dayDiv.textContent = i;
                calendar.appendChild(dayDiv);
            }

            renderUpcomingEvents();
        }

// Функция для рендеринга списка событий на следующие 30 дней
        function renderUpcomingEvents() {
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

            // Группировка событий по дате
            const groupedEvents = upcomingEvents.reduce((acc, event) => {
                const dateStr = event.date.toLocaleDateString('ru-RU');
                if (!acc[dateStr]) acc[dateStr] = [];
                acc[dateStr].push(event);
                return acc;
            }, {});

            eventsList.innerHTML = '';
            Object.keys(groupedEvents).forEach(dateStr => {
                const dateEvents = groupedEvents[dateStr];
                const eventItem = document.createElement('li');
                eventItem.innerHTML = `
                    <strong>${dateStr}</strong>
                    <ul>
                        ${dateEvents.map(event => `
                            <li class="${event.type}">
                                <span>${event.time ? event.time + ' - ' : ''}${event.text} - ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
                            </li>
                        `).join('')}
                    </ul>
                `;
                eventsList.appendChild(eventItem);
            });
        }


        function toggleSelectDay(dayDiv, eventArray) {
            if (selectedDay === dayDiv) {
                dayDiv.classList.remove("selected-day");
                eventInfo.classList.remove("show");
                selectedDay = null;
            } else {
                if (selectedDay) {
                    selectedDay.classList.remove("selected-day");
                }
                selectedDay = dayDiv;
                dayDiv.classList.add("selected-day");
                showEventInfo(eventArray);
            }
        }

        function showEventInfo(eventArray) {
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
                ${event.link ? `<p class="cal-event-descrip"><a href="${event.link}" target="_blank">${event.link_text}</a></p>` : ''}
        </div>
                
                
                </div>
                `;
            });
            eventInfo.classList.add("show");
        }

        function closeEventInfo() {
            eventInfo.classList.remove("show");
            if (selectedDay) {
                selectedDay.classList.remove("selected-day");
                selectedDay = null;
            }
        }

        function prevMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        }

        renderCalendar();
    </script>
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
