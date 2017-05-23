(function(){
    console.log('fff');
    renderHtml();
    function renderHtml(){
        var calendar = document.getElementById("calendar");
        var titleBox = document.createElement("div");
        var bodyBox = document.createElement("div");
        titleBox.className = "calendar-title-box";
        titleBox.innerHTML = "<span class='prev-month' id='prevMonth'></span>"+"<span class='calendar-title' id='calendarTitle'></span>"+"<span class='next-month' id='nextMonth'></span>";
        calendar.appendChild(titleBox);
    }
})();

