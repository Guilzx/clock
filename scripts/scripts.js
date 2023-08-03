function Clock() {
    let time = new Date();

    let timeZoneOffsetInMinutes = time.getTimezoneOffset();
    let timeZoneSign = timeZoneOffsetInMinutes > 0 ? '-' : '+';
    let timeZoneOffsetHours = Math.abs(Math.floor(timeZoneOffsetInMinutes / 60));

    this.hour = time.getHours();
    this.minute = time.getMinutes();
    this.second = time.getSeconds();
    this.period = (this.hour < 12) ? '"AM"' : '"PM"';
    this.day = time.getDate();
    this.weekday = en_week_days_name[time.getDay()];
    this.month = en_month_name[time.getMonth()];
    this.year = time.getFullYear();
    this.timezone = `"GMT${timeZoneSign}${timeZoneOffsetHours.toString().padStart(2, '0')}"`;
    this.unix = Math.floor(Date.now() / 1000);
}

function Settings() {
    this.clock = {
        enable: false,
        hide_hour: false,
        hide_minute: false,
        hide_second: false,
        hide_period: false,
        hide_day: false,
        hide_weekday: true,
        hide_month: false,
        hide_year: false,
        hide_timezone: true,
        hide_unix: true,
    }

    this.clock_format = {
        use_12h_format: false,
        show_leading_zero: false,
    }

    this.theme = {
        enable: false,
        change_theme: 'main',
        change_font_family: 'inherit'
    }

    this.font = {
        change_font_size: 32,
    }

}

const en_month_name = ['"January"', '"February"', '"March"', '"April"', '"May"', '"June"', '"July"', '"August"', '"September"', '"October"', '"November"', '"December"'];
const en_week_days_name = ['"Sunday"', '"Monday"', '"Tuesday"', '"Wednesday"', '"Thursday"', '"Friday"', '"Saturday"'];

const theme = {
    main: "./styles/main.css",
    jb_dark: "./styles/jb-dark.css",
    jb_light: "./styles/jb-light.css",
    dark_moder: "./styles/dark-modern.css",
    light_moder: "./styles/light-modern.css",
    one_dark_pro: "./styles/one-dark-pro.css",
    dracula_official: "./styles/dracula-official.css",
    github_theme: "./styles/github-theme.css",
    code_time: "./styles/code-time.css"
}

const default_settings = new Settings();

function changeTo12hFormat(hour) {
    hour %= 12;

    if (hour === 0) {
        return 12;
    }

    return hour;
}

function use12hFormat(flag, object) {
    if (flag) {
        object['hour'] = changeTo12hFormat(object['hour']);
    }
}

function addLeadingZero(num) {
    if (num < 10) {
        return `"${num.toString().padStart(2, '0')}"`;
    }

    return `"${num}"`;
}

function changeClass(element, from, to) {
    if (!element.classList.contains(to)) {
        element.classList.add(to);
    }
    if (element.classList.contains(from)) {
        element.classList.remove(from);
    }
}

function hideElement(flag, id) {
    let element = document.getElementById(id);

    if (flag) {
        changeClass(element, 'on', 'hidden');
    } else {
        changeClass(element, 'hidden', 'on');
    }
}

function drawElements(settings) {
    hideElement(settings.clock.hide_hour, 'hour');
    hideElement(settings.clock.hide_minute, 'minute');
    hideElement(settings.clock.hide_second, 'second');
    hideElement(settings.clock.hide_period, 'period');
    hideElement(settings.clock.hide_day, 'day');
    hideElement(settings.clock.hide_weekday, 'weekday');
    hideElement(settings.clock.hide_month, 'month');
    hideElement(settings.clock.hide_year, 'year');
    hideElement(settings.clock.hide_timezone, 'timezone');
    hideElement(settings.clock.hide_unix, 'unix');
}

function showLeadingZero(flag, object) {
    if (flag) {
        object['hour'] = addLeadingZero(object['hour']);
        object['minute'] = addLeadingZero(object['minute']);
        object['second'] = addLeadingZero(object['second']);
        object['day'] = addLeadingZero(object['day']);

        changeClass(document.getElementById('hour_value'), 'number', 'string');
        changeClass(document.getElementById('minute_value'), 'number', 'string');
        changeClass(document.getElementById('second_value'), 'number', 'string');
        changeClass(document.getElementById('day_value'), 'number', 'string');
    } else {
        changeClass(document.getElementById('hour_value'), 'string', 'number');
        changeClass(document.getElementById('minute_value'), 'string', 'number');
        changeClass(document.getElementById('second_value'), 'string', 'number');
        changeClass(document.getElementById('day_value'), 'string', 'number');
    }
}

function changeFontSize(size) {
    document.body.style.fontSize = size + "px";
}

function changeFontFamily(family = 'inherit') {
    document.body.style.fontFamily = family;
}

function changeTheme(theme_key = 'main') {
    let link = document.querySelectorAll('link')[1];

    if (link.getAttribute('href') !== theme[theme_key]) {
        link.setAttribute('href', theme[theme_key]);
    }
}

function addComma() {
    let elements = document.querySelectorAll('.tab.on');

    elements.forEach((element, index) => {
        if (index !== elements.length - 1) {
            changeClass(element.querySelector('.comma'), 'hidden', 'on');
        } else {
            changeClass(element.querySelector('.comma'), 'on', 'hidden');
        }
    })
}

function updateElementValue(object, key) {
    document.getElementById(key + '_value').innerHTML = object[key].toString();
}

function updateAllClockElement(object) {
    updateElementValue(object, 'hour');
    updateElementValue(object, 'minute');
    updateElementValue(object, 'second');
    updateElementValue(object, 'period');
    updateElementValue(object, 'day');
    updateElementValue(object, 'weekday');
    updateElementValue(object, 'month');
    updateElementValue(object, 'year');
    updateElementValue(object, 'timezone');
    updateElementValue(object, 'unix');
}

function updateClock(object, settings) {
    object = new Clock();

    if (settings.clock.enable) {
        drawElements(settings);
    } else {
        drawElements(default_settings);
    }

    use12hFormat(settings.clock_format.use_12h_format, object);
    showLeadingZero(settings.clock_format.show_leading_zero, object);

    changeFontSize(settings.font.change_font_size);

    changeTheme(settings.theme.change_theme);

    if (settings.theme.enable) {
        changeFontFamily(settings.theme.change_font_family);
    } else {
        changeFontFamily(default_settings.theme.change_font_family);
    }

    addComma();

    updateAllClockElement(object);
}

export {Clock, Settings, updateClock};