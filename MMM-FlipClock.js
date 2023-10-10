/* global Module */

/* Magic Mirror
 * Module: MMM-FlipClock
 *
 * By Dirk Rettschlag
 * MIT Licensed.
 */
Module.register("MMM-FlipClock", {
    // Module config defaults.
    defaults: {
        timeFormat: config.timeFormat,
        seperator: ":",
        displaySeconds: true,
        showPeriod: true,
        showPeriodUpper: true,
        showDate: true,
        showWeek: false,
        dateFormat: "dddd, LL",
        timezone: null,
        easing: "ease-out-bounce",
    },
    // Define required scripts.
    getScripts: function() {
        return ["moment.js", "moment-timezone.js", this.file("flip/flip.js")];
    },
    // Define styles.
    getStyles: function() {
        return [this.file("flip/flip.css"), "MMM-FlipClock.css"];
    },
    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        // Set locale.
        moment.locale(config.language);
        this.music = false;
    },
	notificationReceived(notification, payload, sender) {
		if (notification === 'SHOW_CLOCK') {
            this.music = false;
		}
        if (notification === "HIDE_CLOCK") {
            this.music = true;
		}
        this.updateDom(1000);
	},
    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");

        var dateWrapper = document.createElement("div");
        var timeWrapper = document.createElement("div");
        var weekWrapper = document.createElement("div");

        // Style Wrappers
        if (this.music) {
            dateWrapper.className = "date normal date-medium";
            timeWrapper.className = "time-medium";
        } else {
            dateWrapper.className = "date normal date-large";
            timeWrapper.className = "time-large";
        }
        
        weekWrapper.className = "week dimmed medium";

        // var timeString;
        var now = moment();
        if (this.config.timezone) {
            now.tz(this.config.timezone);
        }

        if (this.config.showDate) {
            // var dataKeyDate = document.createAttribute("data-key");
            // dataKeyDate.value = "date";
            // dateWrapper.attributes.setNamedItem(dataKeyDate);

            // var dataViewDate = document.createAttribute("data-view");
            // dataViewDate.value = "text";
            // dateWrapper.attributes.setNamedItem(dataViewDate);

            //Week Prefix
            var dataWeekPrefixWrapper = document.createElement("span");
            dataWeekPrefixWrapper.className = "tick-text-inline";

            var dataKeyHWeekPrefix = document.createAttribute("data-key");
            dataKeyHWeekPrefix.value = "weekprefix";
            dataWeekPrefixWrapper.attributes.setNamedItem(dataKeyHWeekPrefix);

            var dataViewWeekPrefix = document.createAttribute("data-view");
            dataViewWeekPrefix.value = "text";
            dataWeekPrefixWrapper.attributes.setNamedItem(dataViewWeekPrefix);

            dateWrapper.appendChild(dataWeekPrefixWrapper);

            //Day of Week
            var dataDoWWrapper = document.createElement("span");

            var dataKeyDoW = document.createAttribute("data-key");
            dataKeyDoW.value = "dow";
            dataDoWWrapper.attributes.setNamedItem(dataKeyDoW);

            var dataRepeatDoW = document.createAttribute("data-repeat");
            dataRepeatDoW.value = "true";
            dataDoWWrapper.attributes.setNamedItem(dataRepeatDoW);

            var dataDoWViewWrapper = document.createElement("span");

            var dataViewDoW = document.createAttribute("data-view");
            dataViewDoW.value = "flip";
            dataDoWViewWrapper.attributes.setNamedItem(dataViewDoW);

            var dataStyleDoW = document.createAttribute("data-style");
            dataStyleDoW.value = "flip-easing: " + this.config.easing;
            dataDoWViewWrapper.attributes.setNamedItem(dataStyleDoW);

            dataDoWWrapper.appendChild(dataDoWViewWrapper);

            dateWrapper.appendChild(dataDoWWrapper);

            //WeekSeperator
            var dataWeekSeperator1Wrapper = document.createElement("span");
            dataWeekSeperator1Wrapper.className = "tick-text-inline";

            var dataKeyHWeekSeperator1 = document.createAttribute("data-key");
            dataKeyHWeekSeperator1.value = "weeksep";
            dataWeekSeperator1Wrapper.attributes.setNamedItem(dataKeyHWeekSeperator1);

            var dataViewWeekSeperator1 = document.createAttribute("data-view");
            dataViewWeekSeperator1.value = "text";
            dataWeekSeperator1Wrapper.attributes.setNamedItem(dataViewWeekSeperator1);

            dateWrapper.appendChild(dataWeekSeperator1Wrapper);

            // Months
            var dataMonthsWrapper = document.createElement("span");

            var dataKeyMonths = document.createAttribute("data-key");
            dataKeyMonths.value = "months";
            dataMonthsWrapper.attributes.setNamedItem(dataKeyMonths);

            // var dataRepeatMonths = document.createAttribute("data-repeat");
            // dataRepeatMonths.value = "true";
            // dataMonthsWrapper.attributes.setNamedItem(dataRepeatMonths);

            var dataTransformMonths = document.createAttribute("data-transform");
            dataTransformMonths.value = "pad(00)";
            dataMonthsWrapper.attributes.setNamedItem(dataTransformMonths);

            var dataMonthsViewWrapper = document.createElement("span");

            var dataViewMonths = document.createAttribute("data-view");
            dataViewMonths.value = "flip";
            dataMonthsViewWrapper.attributes.setNamedItem(dataViewMonths);

            var dataStyleMonths = document.createAttribute("data-style");
            dataStyleMonths.value = "flip-easing: " + this.config.easing;
            dataMonthsViewWrapper.attributes.setNamedItem(dataStyleMonths);

            dataMonthsWrapper.appendChild(dataMonthsViewWrapper);

            dateWrapper.appendChild(dataMonthsWrapper);

            //MonthSeperator
            var dataMonthSeperator1Wrapper = document.createElement("span");
            dataMonthSeperator1Wrapper.className = "tick-text-inline";

            var dataKeyHMonthSeperator1 = document.createAttribute("data-key");
            dataKeyHMonthSeperator1.value = "monthsep";
            dataMonthSeperator1Wrapper.attributes.setNamedItem(dataKeyHMonthSeperator1);

            var dataViewMonthSeperator1 = document.createAttribute("data-view");
            dataViewMonthSeperator1.value = "text";
            dataMonthSeperator1Wrapper.attributes.setNamedItem(dataViewMonthSeperator1);

            dateWrapper.appendChild(dataMonthSeperator1Wrapper);

            //Days
            var dataDaysWrapper = document.createElement("span");

            var dataKeyDays = document.createAttribute("data-key");
            dataKeyDays.value = "days";
            dataDaysWrapper.attributes.setNamedItem(dataKeyDays);

            // var dataRepeatDays = document.createAttribute("data-repeat");
            // dataRepeatDays.value = "true";
            // dataDaysWrapper.attributes.setNamedItem(dataRepeatDays);

            var dataTransformDays = document.createAttribute("data-transform");
            dataTransformDays.value = "pad(00)";
            dataDaysWrapper.attributes.setNamedItem(dataTransformDays);

            var dataDaysViewWrapper = document.createElement("span");

            var dataViewDays = document.createAttribute("data-view");
            dataViewDays.value = "flip";
            dataDaysViewWrapper.attributes.setNamedItem(dataViewDays);

            var dataStyleDays = document.createAttribute("data-style");
            dataStyleDays.value = "flip-easing: " + this.config.easing;
            dataDaysViewWrapper.attributes.setNamedItem(dataStyleDays);

            dataDaysWrapper.appendChild(dataDaysViewWrapper);

            dateWrapper.appendChild(dataDaysWrapper);

            //DaySeperator
            var dataDaySeperator1Wrapper = document.createElement("span");
            dataDaySeperator1Wrapper.className = "tick-text-inline";

            var dataKeyHDaySeperator1 = document.createAttribute("data-key");
            dataKeyHDaySeperator1.value = "daysep";
            dataDaySeperator1Wrapper.attributes.setNamedItem(dataKeyHDaySeperator1);

            var dataViewDaySeperator1 = document.createAttribute("data-view");
            dataViewDaySeperator1.value = "text";
            dataDaySeperator1Wrapper.attributes.setNamedItem(dataViewDaySeperator1);

            dateWrapper.appendChild(dataDaySeperator1Wrapper);
        }
        if (this.config.showWeek) {
            var dataKeyWeek = document.createAttribute("data-key");
            dataKeyWeek.value = "week";
            weekWrapper.attributes.setNamedItem(dataKeyWeek);

            var dataViewWeek = document.createAttribute("data-view");
            dataViewWeek.value = "text";
            weekWrapper.attributes.setNamedItem(dataViewWeek);
        }

        // Hours
        var dataHoursWrapper = document.createElement("span");

        var dataKeyHours = document.createAttribute("data-key");
        dataKeyHours.value = "hours";
        dataHoursWrapper.attributes.setNamedItem(dataKeyHours);

        var dataRepeatHours = document.createAttribute("data-repeat");
        dataRepeatHours.value = "true";
        dataHoursWrapper.attributes.setNamedItem(dataRepeatHours);

        var dataTransformHours = document.createAttribute("data-transform");
        dataTransformHours.value = "pad(00)";
        dataHoursWrapper.attributes.setNamedItem(dataTransformHours);

        var dataHoursViewWrapper = document.createElement("span");

        var dataViewHours = document.createAttribute("data-view");
        dataViewHours.value = "flip";
        dataHoursViewWrapper.attributes.setNamedItem(dataViewHours);

        var dataStyleHours = document.createAttribute("data-style");
        dataStyleHours.value = "flip-easing: " + this.config.easing;
        dataHoursViewWrapper.attributes.setNamedItem(dataStyleHours);

        dataHoursWrapper.appendChild(dataHoursViewWrapper);

        timeWrapper.appendChild(dataHoursWrapper);

        //Seperator
        var dataSeperator1Wrapper = document.createElement("span");
        dataSeperator1Wrapper.className = "tick-text-inline";

        var dataKeyHSeperator1 = document.createAttribute("data-key");
        dataKeyHSeperator1.value = "sep";
        dataSeperator1Wrapper.attributes.setNamedItem(dataKeyHSeperator1);

        var dataViewSeperator1 = document.createAttribute("data-view");
        dataViewSeperator1.value = "text";
        dataSeperator1Wrapper.attributes.setNamedItem(dataViewSeperator1);

        timeWrapper.appendChild(dataSeperator1Wrapper);

        //Minutes
        var dataMinutesWrapper = document.createElement("span");

        var dataKeyMinutes = document.createAttribute("data-key");
        dataKeyMinutes.value = "minutes";
        dataMinutesWrapper.attributes.setNamedItem(dataKeyMinutes);

        var dataRepeatMinutes = document.createAttribute("data-repeat");
        dataRepeatMinutes.value = "true";
        dataMinutesWrapper.attributes.setNamedItem(dataRepeatMinutes);

        var dataTransformMinutes = document.createAttribute("data-transform");
        dataTransformMinutes.value = "pad(00)";
        dataMinutesWrapper.attributes.setNamedItem(dataTransformMinutes);

        var dataMinutesViewWrapper = document.createElement("span");

        var dataViewMinutes = document.createAttribute("data-view");
        dataViewMinutes.value = "flip";
        dataMinutesViewWrapper.attributes.setNamedItem(dataViewMinutes);

        var dataStyleMinutes = document.createAttribute("data-style");
        dataStyleMinutes.value = "flip-easing: " + this.config.easing;
        dataMinutesViewWrapper.attributes.setNamedItem(dataStyleMinutes);

        dataMinutesWrapper.appendChild(dataMinutesViewWrapper);

        timeWrapper.appendChild(dataMinutesWrapper);

        if (this.config.displaySeconds) {
            //Seperator
            var dataSeperator2Wrapper = document.createElement("span");
            dataSeperator2Wrapper.className = "tick-text-inline";

            var dataKeyHSeperator2 = document.createAttribute("data-key");
            dataKeyHSeperator2.value = "sep";
            dataSeperator2Wrapper.attributes.setNamedItem(dataKeyHSeperator2);

            var dataViewSeperator2 = document.createAttribute("data-view");
            dataViewSeperator2.value = "text";
            dataSeperator2Wrapper.attributes.setNamedItem(dataViewSeperator2);

            timeWrapper.appendChild(dataSeperator2Wrapper);

            //Seconds
            var dataSecondsWrapper = document.createElement("span");

            var dataKeySeconds = document.createAttribute("data-key");
            dataKeySeconds.value = "seconds";
            dataSecondsWrapper.attributes.setNamedItem(dataKeySeconds);

            var dataRepeatSeconds = document.createAttribute("data-repeat");
            dataRepeatSeconds.value = "true";
            dataSecondsWrapper.attributes.setNamedItem(dataRepeatSeconds);

            var dataTransformSeconds = document.createAttribute("data-transform");
            dataTransformSeconds.value = "pad(00)";
            dataSecondsWrapper.attributes.setNamedItem(dataTransformSeconds);

            var dataSecondsViewWrapper = document.createElement("span");

            var dataViewSeconds = document.createAttribute("data-view");
            dataViewSeconds.value = "flip";
            dataSecondsViewWrapper.attributes.setNamedItem(dataViewSeconds);

            var dataStyleSeconds = document.createAttribute("data-style");
            dataStyleSeconds.value = "flip-easing: " + this.config.easing;
            dataSecondsViewWrapper.attributes.setNamedItem(dataStyleSeconds);

            dataSecondsWrapper.appendChild(dataSecondsViewWrapper);

            timeWrapper.appendChild(dataSecondsWrapper);
        }

        if (this.config.showPeriod && this.config.timeFormat !== 24) {
            //Period
            var dataPeriodWrapper = document.createElement("span");

            var dataViewPeriod = document.createAttribute("data-view");
            dataViewPeriod.value = "flip";
            dataPeriodWrapper.attributes.setNamedItem(dataViewPeriod);

            var dataKeyPeriod = document.createAttribute("data-key");
            dataKeyPeriod.value = "period";
            dataPeriodWrapper.attributes.setNamedItem(dataKeyPeriod);

            timeWrapper.appendChild(dataPeriodWrapper);
        }

        wrapper.appendChild(dateWrapper);
        wrapper.appendChild(timeWrapper);
        wrapper.appendChild(weekWrapper);

        var timeFormat = "HH";
        if (this.config.timeFormat !== 24) {
            timeFormat = "h";
        }
        Tick.options.setConstant("HOUR_FORMAT", timeFormat);

        var periodFormat = "a";
        if (this.config.showPeriodUpper) {
            periodFormat = "A";
        }
        Tick.options.setConstant("PERIOD_FORMAT", periodFormat);

        var module = this;

        var tick = Tick.DOM.create(wrapper, {
            credits: false,
            didInit: function(tick) {
                Tick.helper.interval(function() {
                    var now = moment();
                    if (module.config.timezone) {
                        now.tz(module.config.timezone);
                    }
                    tick.value = {
                        sep: module.config.seperator,
                        hours: now.format(tick._constants["HOUR_FORMAT"]),
                        minutes: now.format("mm"),
                        seconds: now.format("ss"),
                        period: now.format(tick._constants["PERIOD_FORMAT"]),
                        weeksep: ' ',
                        weekprefix: '星期',
                        dow: now.format("dd"),
                        monthsep: '/',
                        months: now.format("M"),
                        days: now.format("D"),
                        daysep: '',
                        date: now.format(module.config.dateFormat),
                        week: module.translate("WEEK", { weekNumber: now.week() }),
                    };
                });
            },
        });

        // Return the wrapper to the dom.
        return wrapper;
    },
});