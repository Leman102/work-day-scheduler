var schedule = {};

//Create current day on the header
var date = $(".calendar-display").text();
var today = moment();
var currentDate = $(".calendar-display").replaceWith(today.format("dddd, MMMM Do YYYY"));

// Create/edit task on the task-content field 
$(".task-content").on("dblclick", function() {
    
    var text = $(this).text().trim();
    console.log(text)

    var textInput = $("<textarea>").addClass("task-edit").val(text);
    $(this).replaceWith(textInput);



    // auto focus new element
    textInput.trigger("focus");

});




//load schedule
var loadSchedule = function(){
    schedule = JSON.parse(localStorage.getItem("schedule"));
    if (!schedule){
        schedule = {
            nine: [],
            ten: [],
            eleven: [],
            twelve: [],
            thirteen: [],
            fourteen: [],
            fifteen: [],
            sixteen: [],
            seventeen: []
        };
        saveTasks()
    }
    
    $.each(schedule, function(list, arr) {
        console.log(list, arr);
        arr.forEach(function(schedule) {
            createTask(schedule.text, schedule.date, list);
        });
    });
    
}

console.log(schedule);

var saveTasks = function() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
};

  

loadSchedule();