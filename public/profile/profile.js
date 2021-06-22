// Set the date we're counting down to
var countDownDate = new Date("April 12, 2021 15:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);
// end of countdown timer

// load username
window.onload = function profile() {
  $.ajax({
    types: "GET",
    url: "/user",
    success: function (data) {
      let $data = $("#userinfo");
      $.each(data, function (i, data) {
        $data.append(
          '<div class="col-sm">Username: ' + data.username + "</div>"
        );
      });
    },
  });
};

// load user coins
// window.onload = function coins() {
//   $.ajax({
//     types: "GET",
//     url: "/user",
//     success: function (data) {
//       let $data = $("#coins");
//       $.each(data, function (i, data) {
//         $data.append(
//           '<div class="col-sm">Coins: ' + data.coinamount + "</div>"
//         );
//       });
//     },
//   });
// };

// window.onload = function coins() {
//   console.log("coins");
//   $.getJSON("/user", function (data) {
//     let usercoin = "";
//     $.each(data, function (i, data) {
//       usercoin += "<div>" + data.coinamount + "</div>";
//     });
//     console.log(usercoin);
//     $("#coins").append(usercoin);
//   });
// };
function coins() {
  console.log("coins");
  $.getJSON("/user", function (data) {
    let usercoin = "";
    $.each(data, function (i, data) {
      usercoin += "<div>" + "Coins Amount: "+ data.coinamount + "</div>";
    });
    console.log(usercoin);
    $("#coins").append(usercoin);
  });
};
coins()

// load user's tickets
// window.onload = function ticket() {
//   $.ajax({
//     types: "GET",
//     url: "/ticket",
//     dataType: "json",
//     success: function (data) {
//       let ticket_data = "";
//       let ticket_number = "";
//       $.each(data, function (i, data) {
//         ticket_data += "<td>" + data.roundid + "</td>";
//         ticket_number +=
//           "<td>" +
//           data.num1 +
//           ", " +
//           data.num2 +
//           ", " +
//           data.num3 +
//           ", " +
//           data.num4 +
//           ", " +
//           data.num5 +
//           ", " +
//           data.num6 +
//           "</td>";
//       });
//       $("#ticketid").append(ticket_data);
//       $("#ticketnumber").append(ticket_number);
//     },
//   });
// };

// load past-draws
// window.onload = function draw(){
//   $.getJSON('/ticket', function(data) {
//     let draw_data = '';
//     let ticketDate_data = '';
//     let ticket_number = '';
//     $.each(data, function(i, data) {
//       draw_data += '<td>'+data.id+'</td>';
//       ticketDate_data += '<td>'+data.ticketdate+'</td>';
//       ticket_number += '<td>'+data.num1+', '+data.num2+', '+data.num3+', '+data.num4+', '+data.num5+', '+data.num6+'</td>';
//     });
//     $('draw_id').append(draw_data);
//     $('date_id').append(ticketDate_data);
//     $('#numbers_id').append(ticket_number);
//   });
// }

window.onload = function draw() {
  $.getJSON("/ticket", function (data) {
    let draw_data = "";
    let ticketDate_data = "";
    let ticket_number = "";
    let ticket_data = "";
    let ticket_num = "";
    let row = "";
    let row2 = "";
    $.each(data, function (i, data) {
      row +=
        "<tr>" +
        "<td>" +
        data.id +
        "</td>" +
        "<td>" +
        data.num1 +
        ", " +
        data.num2 +
        ", " +
        data.num3 +
        ", " +
        data.num4 +
        ", " +
        data.num5 +
        ", " +
        data.num6 +
        "</td>" +
        "</tr>";
      row2 +=
        "<tr>" +
        "<td>" +
        data.id +
        "</td>" +
        "<td>" +
        data.ticketdate +
        "</td>" +
        "<td>" +
        data.num1 +
        ", " +
        data.num2 +
        ", " +
        data.num3 +
        ", " +
        data.num4 +
        ", " +
        data.num5 +
        ", " + 
        data.num6 + 
        "</td>" + 
        ", " +  "<td>" + "1 " +", "+ "2" +", " + "4 " +", "+ "5 "+ ", " +"6 " + ", " +"7 "+"</td>" +  
 

      
        "</tr>";

      // draw_data += '<td>' + data.roundid + '</td>';
      // ticketDate_data += '<td>' + data.ticketdate + '</td>';
      // ticket_number += '<td>' + data.num1 + ', ' + data.num2 + ', ' + data.num3 + ', ' + data.num4 + ', ' + data.num5 + ', ' + data.num6 + '</td>';
      // ticket_data += '<td>' + data.roundid + '</td>';
      // ticket_num += '<td>' + data.num1 + ', ' + data.num2 + ', ' + data.num3 + ', ' + data.num4 + ', ' + data.num5 + ', ' + data.num6 + '</td>';
    });
    // $('#draw_id').append(draw_data);
    // $('#date_id').append(ticketDate_data);
    // $('#numbers_id').append(ticket_number);
    // $('#ticketid').append(ticket_data);
    // $('#ticketnumber').append(ticket_num);
    $("#tbody2").append(row);
    $("#tbody3").append(row2);
  });
};

// matched winning numbers
function matchresults() {
  let checker1 = $.getJSON("/ticket");
  let checker2 = $.getJSON("/lotteryresult");
}
