// const localSettings = {};
// dayjs.locale(localeSettings);

// $(function() {
//     const currentHour = dayjs().format('H');

//     function hourlyColor() {
//         $('.time-block').each(function() {
//             const blockHour = parseInt(this.id);
//             $(this).toggleClass('past', blockHour < currentHour);
//             $(this).toggleClass('present', blockHour === currentHour);
//             $(this).toggleClass('future', blockHour > currentHour);
//         });
//     }

//     function textEntry() {
//         $('.saveBtn').on('click', function(){
//             const key = $(this).parent().attr('id');
//             const value = $(this).siblings('.description').val();
//             localStorage.setItem(key, value);
//         });
//     }

//     function refreshColor() {
//         $('.time-block').each(function() {
//         const blockHour = parseInt(this.id);
//         if(blockHour == currentHour) {
//             $(this).removeClass('past future').addClass('present');
//         } else if (blockHour < currentHour) {
//             $(this).removeClass('future present').addClass('future');
//         }
//         });
//     }

//     $('.time-block').each(function() {
//         const key = $(this).attr('id');
//         const value = localStorage.getItem(key);
//         $(this).children('.description').val(value);
//     });

//     function updateTime() {
//         const dateElement = $('#date');
//         const timeElement = $('#time');
//         const currentDate = dayjs().format('dddd, MMMM D, YYYY');
//         const currentTime = dayjs().format('hh:mm:ss A');
//         dateElement.text(currentDate);
//         timeElement.text(currentTime);
//     }

//     hourlyColor();
//     textEntry();
//     refreshColor();

//     setInterval(updateTime, 1000);

// });

var today = moment().format("dddd, MMMM Do YYYY ");

var now = moment().format("H A");

// current day

$("#currentDay").text(today);


/* planWorkday entries for each hour of the workday */
var planWorkday = [
    { time: "9 AM", 
        event: "" },
    { time: "10 AM", 
        event: "" },
    { time: "11 AM", 
        event: "" },
    { time: "12 PM", 
        event: "" },
    { time: "1 PM", 
        event: "" },
    { time: "2 PM", 
        event: "" },
    { time: "3 PM", 
        event: "" },
    { time: "4 PM", 
        event: "" },
    { time: "5 PM", 
        event: "" },
  ];

/* Local Storage check */
var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
  planWorkday = workEvents;
}

/* Current Day */
$("#currentDay").text(today);

/* Create rows */
planWorkday.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	/* Adding rows to container div */
	$(".container").append(row);
});

/* Color rows based on current time */
function colorRow(time) {
	var planNow = moment(now, "H A");
	var planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

/* Save Events */
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	planWorkday[blockID].event = userEntry;

	/* Set local storage */
	localStorage.setItem("workDay", JSON.stringify(planWorkday));
});