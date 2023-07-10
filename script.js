const localSettings = {};
dayjs.locale(localeSettings);

$(function() {
    const currentHour = dayjs().format('H');

    function hourlyColor() {
        $('.time-block').each(function() {
            const blockHour = parseInt(this.id);
            $(this).toggleClass('past', blockHour < currentHour);
            $(this).toggleClass('present', blockHour === currentHour);
            $(this).toggleClass('future', blockHour > currentHour);
        });
    }

    function textEntry() {
        $('.saveBtn').on('click', function(){
            const key = $(this).parent().attr('id');
            const value = $(this).siblings('.description').val();
            localStorage.setItem(key, value);
        });
    }

    function refreshColor() {
        $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        if(blockHour == currentHour) {
            $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
            $(this).removeClass('future present').addClass('future';)
        }
    });

    $('.time-block').each(function() {
        const key = $(this).attr('id');
        const value = localStorage.getItem(key);
        $(this).children('.description').val(value);
    });

    function updateTime() {
        const dateElement = $('#date');
        const timeElement = $('#time');
        const currentDate = dayjs().format('dddd, MMMM D, YYYY');
        const currentTime = dayjs().format('hh:mm:ss A');
        dateElement.text(currentDate);
        timeElement.text(currentTime);
    }

    hourlyColor();
    textEntry();
    refreshColor();

    setInterval(updateTime, 1000);

});