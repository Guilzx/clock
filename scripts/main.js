import {Clock, Settings, updateClock} from "./scripts.js";

let clock = new Clock();
let settings = new Settings();

updateClock(clock, settings);

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.ui_use_12h_format) {
            settings.clock_format.use_12h_format = properties.ui_use_12h_format.value;
        }

        if (properties.ui_customize_clock_enable) {
            settings.clock.enable = properties.ui_customize_clock_enable.value;
        }
        if (properties.ui_hide_hour) {
            settings.clock.hide_hour = properties.ui_hide_hour.value;
        }
        if (properties.ui_hide_minute) {
            settings.clock.hide_minute = properties.ui_hide_minute.value;
        }
        if (properties.ui_hide_second) {
            settings.clock.hide_second = properties.ui_hide_second.value;
        }
        if (properties.ui_hide_period) {
            settings.clock.hide_period = properties.ui_hide_period.value;
        }
        if (properties.ui_hide_day) {
            settings.clock.hide_day = properties.ui_hide_day.value;
        }
        if (properties.ui_hide_weekday) {
            settings.clock.hide_weekday = properties.ui_hide_weekday.value;
        }
        if (properties.ui_hide_month) {
            settings.clock.hide_month = properties.ui_hide_month.value;
        }
        if (properties.ui_hide_year) {
            settings.clock.hide_year = properties.ui_hide_year.value;
        }
        if (properties.ui_hide_timezone) {
            settings.clock.hide_timezone = properties.ui_hide_timezone.value;
        }
        if (properties.ui_hide_unix) {
            settings.clock.hide_unix = properties.ui_hide_unix.value;
        }

        if (properties.ui_show_leading_zero) {
            settings.clock_format.show_leading_zero = properties.ui_show_leading_zero.value;
        }

        if (properties.ui_font_size) {
            settings.font.change_font_size = properties.ui_font_size.value;
        }

        if (properties.ui_customize_theme_enable) {
            settings.theme.enable = properties.ui_customize_theme_enable.value;
        }
        if (properties.ui_theme) {
            settings.theme.change_theme = properties.ui_theme.value;
        }
        if (properties.ui_font_family) {
            settings.theme.change_font_family = properties.ui_font_family.value;
        }

        updateClock(clock, settings);
    }
};

setInterval(function () {
    updateClock(clock, settings);
}, 1000);