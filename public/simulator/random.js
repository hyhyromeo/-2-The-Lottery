let playerResult = [];
let lotteryResult;
let matchResult = [];

function displayResult(result) {
  let lottoResult = document.getElementById("result-container");
  lottoResult.innerHTML = "";
  result.forEach(function (cont) {
    let displayNumber = document.createElement("span");

    displayNumber.textContent = cont;
    displayNumber.className = "displayCircle m-3";
    displayNumber.id = `circle_result_${cont}`;

    lottoResult.append(displayNumber);
  });
}

function randomNumberPick() {
  // check the length of the results on the HTML
  if (document.getElementsByClassName("circle").length) {
    // function to remove duplicated entries
    const removeElements = function (elms) {
      return elms.forEach(function (el) {
        // forEach elements, remove it
        return el.remove();
        // see: https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
      });
    };
    removeElements(document.querySelectorAll(".circle"));
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll#accessing_the_matches
  }
  let arr = []; // set a array in preparation to store the lottery numbers
  while (arr.length < 6) {
    //limit the lottery result to 6 numbers, please adjust if you want more
    let r = Math.floor(Math.random() * 49) + 1; // random number generator between 1 to 49
    if (arr.indexOf(r) === -1) arr.push(r); // checks the array whether it contains a randomly generated number:
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    // push the generated numbers to the array
    let add = true;
    for (let i = 0; i < 49; i++) {
      // runs through the array
      if (arr[i] == arr) {
        //
        add = false;
      }
    }
  }
  const sorted = [...arr].sort(function (a, b) {
    return a - b;
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  });
  sorted.forEach(function (content) {
    let lotto = document.getElementById("lotto");
    let circle = document.createElement("span");
    circle.setAttribute("class", "circle m-3");
    circle.setAttribute("id", `circle_pick_${content}`);
    circle.textContent = content;
    lotto.append(circle);
  });
  playerResult = sorted;
  console.log(playerResult);
}

// function lotteryResults() {
//   if (document.getElementsByClassName("circleOfResult").length) {
//     const removeElements = function (elms) {
//       return elms.forEach(function (el) {
//         return el.remove();
//       });
//     };
//     removeElements(document.querySelectorAll(".circleOfResult"));
//   }
//   let arr2 = [];
//   while (arr2.length < 6) {
//     let r2 = Math.floor(Math.random() * 49) + 1;
//     if (arr2.indexOf(r2) === -1) arr2.push(r2);
//     let add = true;

//     for (let y = 0; y < 49; y++) {
//       if (arr2[y] == arr2) {
//         //
//         add = false;
//       }
//     }
//   }

//   const sorted = [...arr2].sort(function (a, b) {
//     return a - b;
//   });

//   lotteryResult = sorted;
//   console.log(lotteryResult);

//   sorted.forEach(function (cont) {
//     let lottoResult = document.getElementById("lottoResult");
//     let circleOfResult = document.createElement("span");
//     // circleOfResult.setAttribute("class", "circleOfResult m-3");

//     circleOfResult.textContent = cont;
//     circleOfResult.className = "circleOfResult m-3";
//     circleOfResult.id = `circle_result_${cont}`;

//     lottoResult.append(circleOfResult);
//   });
//   if ((playerResult.length = 6)) {
//     for (let officalLottery of lotteryResult) {
//       for (let playerPickResult of playerResult) {
//         if (officalLottery === playerPickResult) {
//           matchResult.push(officalLottery);
//           console.log(officalLottery);
//           let circleMatched = document.querySelector(
//             `#circle_pick_${officalLottery}`
//           );
//           circleMatched.classList.add("matched");
//           let circleMatchedresult = document.querySelector(
//             `#circle_result_${officalLottery}`
//           );
//           console.log(circleMatchedresult);
//           setTimeout(function () {
//             circleMatchedresult.classList.add("matched");
//           }, 0);
//         }
//       }
//     }
//   }
//   console.log(matchResult.length + " " + "Numbers matched :D ");
//   console.log("Number that matched :" + matchResult);
// }

let object = {
  // placeholder JSON - work in progress (26 Mar 2021)
  playID: Number,
  record: Number,
};

function setColor(e) {
  let target = e.target,
    count = +target.dataset.count;
  target.style.backgroundColor = count === 1 ? "#007bff" : "#D28375";
  target.dataset.count = count === 1 ? 0 : 1;
}

let pickedNumbers = document.querySelectorAll(".button");
let chosenNumber = [];

for (let pickedNumber of pickedNumbers) {
  pickedNumber.addEventListener("click", function (event) {
    if (chosenNumber.length < 15) {
      if (chosenNumber.includes(event.target.value)) {
        chosenNumber = chosenNumber.filter(
          (number) => number !== event.target.value
        );
        setColor(event);
        displayResult(chosenNumber);
        console.log(chosenNumber);
      } else {
        pushChosenNumber(chosenNumber, event.target.value);
        setColor(event);
        console.log(chosenNumber);
        displayResult(chosenNumber);
      }
    } else {
      if (chosenNumber.includes(event.target.value)) {
        // chosenNumber.splice(event.target.value)
        chosenNumber = chosenNumber.filter(
          (number) => number !== event.target.value
        );
        setColor(event);
        console.log(chosenNumber);
        displayResult(chosenNumber);
      }
      return;
    }
  });
}

function submitRandomPick() {
  let round = document.querySelector("#roundId").innerText;
  postRandomPickToTicket(round);
}

function submitManualPick() {
  let round = document.querySelector("#roundId").innerText;
  postToTicket(round);
}

function pushChosenNumber(chosenNumberArr, num) {
  if (num == "" ){
    return
  }
  chosenNumberArr.push(num);
  return chosenNumberArr.sort(function (a, b) { 
    return a - b;
  });
}
async function postRandomPickToTicket(round) {
  if (playerResult.length < 6 || playerResult == []) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You have not PICK 6 numbers!",
      footer: " ",
    });
    console.log(playerResult);

    return;
  } else {
    Swal.fire(
      "Good luck! Your Ticket is submitted!",
      "back to simulator page in 3 sec :D",
      "success"
    );
    const res = await fetch("/userTicketNum", {
      method: "POST", // Specific your HTTP method
      headers: {
        // Specify any HTTP Headers Here
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ playerResult, round }), // Specify the Request Body
    });
    const content = await res.json();
    console.log(content);
    if ((content.result == " YOU HAVE'T SIGN IN !!")) {
      console.log('random');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have not sign in yet!",
        footer: "",
      });
    }
    // resetPick();
    timeRefresh();
  }
}
async function postToTicket(round) {
  if (chosenNumber.length >15 ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "PICK minium 1 and maximum 15 numbers!",
      footer: "",
      
    });
    console.log('chose more than 15');
    return;
  } 
  if (chosenNumber.length < 3 ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "PICK minium 3 and maximum 15 numbers!",
      footer: " ",
    });
    console.log('chose less than 1');

    return;
    
  } else {
    Swal.fire(
      "Good luck! Your Ticket is submitted!",
      "back to simulator page in 3 sec :D",
      "success"
    );
    const res = await fetch("/userManualTicketNum", {
      method: "POST", // Specific your HTTP method
      headers: {
        // Specify any HTTP Headers Here
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ chosenNumber, round }), // Specify the Request Body
    }) ;
    const content = await res.json();
    console.log(content.chosenNumber);
    console.log(content);

    if (content.result == " YOU HAVE'T SIGN IN !!") {
      console.log("work?");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have not sign in yet!",
        footer: " ",
      });
    }
    resetPick()
  } 
}

function timeRefresh() {
  setTimeout("location.reload(true);", 3000);
}
function resetPick() {
  document.getElementById("result-container").innerHTML = " ";
  submittedTicketAlert();
}

function submittedTicketAlert() {
  // Swal.fire(
  //   "Good luck! Your Ticket is submitted!",
  //   "back to simulator page in 5 sec :D",
  //   "success"
  // );
  timeRefresh();
}

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
