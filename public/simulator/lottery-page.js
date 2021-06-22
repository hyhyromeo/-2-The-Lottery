let playerResult = [];
let lotteryResult;
let matchResult = [];

async function lotteryResults() {
  if (document.getElementsByClassName("circleOfResult").length) {
    const removeElements = function (elms) {
      return elms.forEach(function (el) {
        return el.remove();
      });
    };
    removeElements(document.querySelectorAll(".circleOfResult"));
  }
  let arr2 = [];
  while (arr2.length < 6) {
    let r2 = Math.floor(Math.random() * 49) + 1;
    if (arr2.indexOf(r2) === -1) arr2.push(r2);
    let add = true;

    for (let y = 0; y < 49; y++) {
      if (arr2[y] == arr2) {
        //
        add = false;
      }
    }
  }

  const sorted = [...arr2].sort(function (a, b) {
    return a - b;
  }); 

  lotteryResult = sorted;
  console.log(lotteryResult);

  sorted.forEach(function (cont) {
    let lottoResult = document.getElementById("lottoResult");
    let circleOfResult = document.createElement("span");
    // circleOfResult.setAttribute("class", "circleOfResult m-3");

    circleOfResult.textContent = cont;
    circleOfResult.className = "circleOfResult m-3";
    circleOfResult.id = `circle_result_${cont}`;

    lottoResult.append(circleOfResult);
  });
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
let round = document.querySelector('#roundId').innerText
  await postToLotteryResult(round)
  await createNextLotteryRound()
  await checkUserTicketResult(round)
}




function ProgressCountdown(timeleft, text) {
  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft--;

      // document.getElementById(bar).value = timeleft;
      document.getElementById(text).textContent = timeleft;

      if (timeleft <= 0) {
        clearInterval(countdownTimer);
        resolve(true);
      }
    }, 1000);
  });
}

ProgressCountdown(4, "pageBeginCountdownText").then((value) =>
lotteryResults()

);

let object = {
  // placeholder JSON - work in progress (26 Mar 2021)
  playID: Number,
  record: Number,
};

async function checkUserTicketResult(round){
  await fetch('/checkUserResult',{
    method : 'POST',
    headers : {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({lotteryResult,round}),
  })
}

    async function postToLotteryResult(round) {
          const res = await fetch("/lotteryResultNum", {
            method: "POST", // Specific your HTTP method
            headers: {
              // Specify any HTTP Headers Here
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({lotteryResult,round}), // Specify the Request Body
          });
          const content = await res.text();
          console.log(content);
        }

        async function createNextLotteryRound() {
          const res = await fetch("/lotteryRound", {
            method: "POST", // Specific your HTTP method
            headers: {
              // Specify any HTTP Headers Here
              "Content-Type": "application/json; charset=utf-8",
            },
          });
          const content = await res.text();
          console.log(content);
        }
      
      