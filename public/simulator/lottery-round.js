window.onload = function profile() {
  $.ajax({
    types: "GET",
    url: "/lotteryRound",
    success: function (data) {
      let $data = $("#roundId");

      $data.append(`<span > ${data[data.length - 1].id} </span>`);
    },
  });
};
