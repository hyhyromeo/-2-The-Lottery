

var timeInSecs;
var ticker;

function startTimer(secs) {
timeInSecs = parseInt(secs);
ticker = setInterval("tick()", 1000); 
}

function tick( ) {
var secs = timeInSecs;
if (secs > 0) {
timeInSecs--; 
}
if (secs == 0){
    window.location="http://localhost:8080/simulator/lottery-page.html"

clearInterval(ticker);
startTimer(60*60); 
}

var days= Math.floor(secs/86400); 
secs %= 86400;
var hours= Math.floor(secs/3600);
secs %= 3600;
var mins = Math.floor(secs/60);
secs %= 60;
var pretty = " " + ( (hours < 10 ) ? "0" : "" ) + hours + " " + "Hour " + " " + ( (mins < 10) ? "0" : "" ) + mins + " " + " Minute " + " " + ( (secs < 10) ? "0" : "" ) + secs + " " + "Second ";
document.getElementById("countdown").innerHTML = pretty;
}

startTimer(22*60); 


window.onload = function profile() {
    $.ajax({
      types: "GET",
      url: "/lotteryRound",
      success: function (data) {
        let $data = $("#roundId");
  
        $data.append(`<span> ${data[data.length - 1].id} </span><br>`);
      },
    });
  };

