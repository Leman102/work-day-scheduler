$(function () {});
  
var today = moment().format("dddd, MMMM Do");

var now = moment().format("H A");

/* Current Day */
$("#currentDay").text(today);

//create schedule based on the work hours 9AM-5PM
var schedule = [
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 AM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
];

//check localStorage
var dailyEvents = JSON.parse(localStorage.getItem("workDay"));
if (dailyEvents) {
    schedule = dailyEvents;
}

//create rows
schedule.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = timeColor(timeLabel);
	var row =
		'<div class="timeblock" id="' + index + '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +timeLabel +
		'</div><textarea class="form-control ' + blockColor + '">' + timeBlock.event + '</textarea><div class="col-sm col-lg-1 input-group-append">' + 
        '<button class="saveBtn btn-block" type="submit"><span class="icon oi oi-pin "></span> Save </button></div></div></div>';

	//add rows to container
	$(".container").append(row);
});

//colors based on the scheduling time
function timeColor(time) {
	var timeNow =  moment(now, "H A");
	var workHour = moment(time, "H A");
	if (timeNow.isBefore(workHour) === true) {
		return "future";
	} else if (timeNow.isAfter(workHour) === true) {
		return "past";
	} else {
		return "present";
	}
}


/* Save Events */
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this).closest(".timeblock").attr("id")
	);
	var userEntry = $.trim(
		$(this).parent().siblings("textarea").val()
	);
	schedule[blockID].event = userEntry;

	/* Set local storage */
	localStorage.setItem("workDay", JSON.stringify(schedule));
});

