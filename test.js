let playerResult;
let lotteryResult;
let matchResult = []

function playerRandomPick() {

    // check the length of the results on the HTML
    // if (document.getElementsByClassName('circle').length) {
    //     // function to remove duplicated entries
    //     const removeElements = function (elms) {
    //         return elms.forEach(function (el) { // forEach elements, remove it
    //             return el.remove();
    //             // see: https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
    //         });
    //     };
    //     removeElements(document.querySelectorAll(".circle"));
    //     // see: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll#accessing_the_matches
    // }


    let arr = []; // set a array in preparation to store the lottery numbers
    while (arr.length < 6) { //limit the lottery result to 6 numbers, please adjust if you want more
        let r = Math.floor(Math.random() * 49) + 1; // random number generator between 1 to 49
        if (arr.indexOf(r) === -1) arr.push(r); // checks the array whether it contains a randomly generated number:
        // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
        // push the generated numbers to the array
        let add = true;

        for (let i = 0; i < 49; i++) { // runs through the array
            if (arr[i] == arr) { //
                add = false;
            }
        }
    }

    let sorted = [...arr].sort(function (a, b) {
        return a - b;
        // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    });

    // sorted.forEach(function (content) {
    //     let lotto = document.getElementById("lotto");
    //     let circle = document.createElement('span');
    //     circle.setAttribute('class', 'circle m-3');
    //     circle.textContent = content;
    //     lotto.append(circle);

    // });
    playerResult = sorted

    console.log(playerResult)
}




function lotteryResults() {

    // if (document.getElementsByClassName('circleOfResult').length) {
    //     const removeElements = function (elms) {
    //         return elms.forEach(function (el) {
    //             return el.remove();
    //         });
    //     };
    //     removeElements(document.querySelectorAll(".circleOfResult"));
    // }

    let arr2 = [];
    while (arr2.length < 6) {
        let r2 = Math.floor(Math.random() * 49) + 1;
        if (arr2.indexOf(r2) === -1) arr2.push(r2);
        let add = true;

        for (let y = 0; y < 49; y++) {
            if (arr2[y] == arr2) { //
                add = false;
            }
        }
    }

    const sorted = [...arr2].sort(function (a, b) {
        return a - b;
    });

    // sorted.forEach(function (cont) {
    //     let lottoResult = document.getElementById("lottoResult");
    //     let circleOfResult = document.createElement('span');
    //     circleOfResult.setAttribute('class', 'circleOfResult m-3');
    //     circleOfResult.textContent = cont;
    //     lottoResult.append(circleOfResult);
    // });
    lotteryResult = sorted

    console.log(lotteryResult);


    for (let officallottery of lotteryResult) {
        for (let playerPickResult of playerResult) {
            if (officallottery === playerPickResult) {
                matchResult.push(officallottery)
            }
        }
    }
    console.log(" " + matchResult.length + 'numbers matched :D ');
    console.log("Number that matched is :" + matchResult);

}

// ProgressCountdown(3, 'pageBeginCountdownText').then(value => lotteryResults());

// function ProgressCountdown(timeleft, text) {
//     return new Promise((resolve, reject) => {
//         var countdownTimer = setInterval(() => {
//             timeleft--;

//             // document.getElementById(bar).value = timeleft;
//             document.getElementById(text).textContent = timeleft;

//             if (timeleft <= 0) {
//                 clearInterval(countdownTimer);
//                 resolve(true);
//             }
//         }, 1000);
//     });
// }

// let object = { // placeholder JSON - work in progress (26 Mar 2021)
//     "playID": Number,
//     "record": Number


// }

playerRandomPick()

lotteryResults()

// const addOrRemove = (array, item) => {
//     const exists = array.includes(item)

//     if (exists) {
//       return array.filter(function (c) { 
//           return c !== item; 
//         })
//     } else {
//       const result = array
//       result.push(item)
//       return result
//     }
//   }

//   const array = []
//   console.log(array);
//   const index = array.indexOf(${});
//   if (index > -1) {
//       array.splice(index, 1);
//   }

//   onclick, return true or false
//   if true, change colour (function 1) and remove from array (function 2)
//   if false, change colour (function 3) and add to array (function 4)

let pickColors = document.querySelectorAll("button");
function changeBackground() {
    let pickColors = true || false;
    if (pickColors = true) {
        document.getElementById("").style.backgroundColor = "#007bff";
        return;
    } else {
        document.getElementById("").style.backgroundColor = "#D28375";
        return;
    }
}

function setArray() {
    let pickedNumbers = document.querySelectorAll("button");
    let chosenNumber = [];

}