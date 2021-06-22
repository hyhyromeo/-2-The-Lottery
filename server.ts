import express from "express";
import { userRoute } from "./userRoute";
import expressSession from "express-session";
import { env } from "./env";
import { isLoggedIn } from "./guards";
import path from "path";
import dotenv from "dotenv";
import grant from "grant";
import cors from "cors";
import { db } from "./db";

dotenv.config();

let app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/sim", isLoggedIn, express.static("simulator"));

let sessionMiddleWare = expressSession({
  secret: env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
});

app.use(sessionMiddleWare);

const grantExpress = grant.express({
  defaults: {
    origin: "http://localhost:8080",
    transport: "session",
    state: true,
  },
  google: {
    key:
      "81581351538-o0ssts78c51tmqfkk8ko018qs36dpivh.apps.googleusercontent.com" ||
      "",
    secret: "haJK86w46BO9N-12f5nTEhe2" || "",
    scope: ["profile", "email"],
    callback: "/google",
  },
});
app.use(grantExpress as express.RequestHandler);
app.use(userRoute);
// const cors = require("cors")
// app.use(cors())

// app.post("/lotteryResult", async (req,res)=>{
//     console.log(req.body);
//     await db.query('insert into lotteryresult (num1,num2,num3,num4,num5,num6) values($1,$2,$3,$4,$5,$6)', [req.body[0],req.body[1],req.body[2],req.body[3],req.body[4],req.body[5]] )
//     res.json({result:"Lottery Result submit"+ req.body})
// });

app.post("/lotteryResultNum", async (req, res) => {
  console.log(req.body);
  console.log(req.body.round);
  for (let i = 0; i < req.body.lotteryResult.length; i++) {
    await db.query(
      "insert into lotteryResultNum (lottery_round_id, num, create_date, update_date) values($1,$2,now(),now())",
      [req.body.round, req.body.lotteryResult[i]]
    );
  }
  res.json({ result: "Lottery Result" + req.body + "posted" });
});

app.post("/userTicketNum", async (req, res) => {
  try {
    if (req.session?.["user"]) {
      console.log("69", req.session["user"]);
      let ticket_id = await db.query(
        "insert into userTicketRound (round_id, buy_date , user_id) values ($1, now(), $2) returning id",
        [req.body.round, req.session["user"].id]
      );
      await db.query(
        "update usersinfo set coinamount= coinamount -10 where usersinfo.id = $1",
        [req.session["user"].id]
      );
      for (let i = 0; i < req.body.playerResult.length; i++) {
        await db.query(
          "insert into userTicketNum (round_id, num, ticket_id, user_id ,create_date,update_date) values($1,$2,$3,$4, now(),now())",
          [
            req.body.round,
            req.body.playerResult[i],
            ticket_id.rows[0].id,
            req.session["user"].id,
          ]
        );
      }
    } else {
      res.json({ result: " YOU HAVEN'T SIGN IN !!" });
    }
  } catch (error) {
    console.error(error.message);
  }
  res.json({ result: "chosen Result" + req.body + "posted" });
});

app.post("/userManualTicketNum", async (req, res) => {
  try {
    if (req.session?.["user"]) {
      console.log("69", req.session["user"]);
      let ticket_id = await db.query(
        "insert into userTicketRound (round_id, buy_date, user_id) values ($1, now(),$2) returning id",
        [req.body.round, req.session["user"].id]
      );
      await db.query(
        "update usersinfo set coinamount= coinamount -10 where usersinfo.id = $1",
        [req.session["user"].id]
      );
      for (let i = 0; i < req.body.chosenNumber.length; i++) {
        await db.query(
          "insert into userTicketNum (round_id, num, ticket_id, user_id,create_date,update_date) values($1,$2,$3,$4,now(),now())",
          [
            req.body.round,
            req.body.chosenNumber[i],
            ticket_id.rows[0].id,
            req.session["user"].id,
          ]
        );
      }
    } else {
      res.json({ result: " YOU HAVEN'T SIGN IN !!" });
    }
  } catch (error) {
    console.error(error.message);
  }
  res.json({ result: "chosen Result" + req.body + "posted" });
});

app.post("/lotteryRound", async (req, res) => {
  try {
    console.log("round added");
    await db.query(
      "insert into lotteryRound (lottery_date, create_date, update_date) values (now() + '1 hour'::interval,now(),now())"
    );
  } catch (error) {
    console.error(error.message);
  }
  res.json({ result: "new round submit" });
});

app.post("/checkUserResult", async (req, res) => {
  try {
    let findUserRound = await db.query(
      "select id, matched_count from userTicketRound where round_id = ($1) and match_checked = false",
      [req.body.round]
      // find all ticket that is not yet check_match, it will show which Round//
    );

    for (let i = 0; i < findUserRound.rows.length; i++) {
      let selectUserNum = await db.query(
        // selectUserNum = all picked ticket numbers //
        "select num from userTicketNum where ticket_id = ($1)",
        [findUserRound.rows[i].id] // [findUserRound.rows[i].id] = find all numbers that are not checked_match by ticket//
      );

      for (let j = 0; j < selectUserNum.rows.length; j++) {
        if (req.body.lotteryResult.includes(selectUserNum.rows[j].num)) {
          // selectUserNum.rows[j].num = every single picked number //
          await db.query(
            "update userTicketNum set is_matched = true where userTicketNum.ticket_id = $1 and num = $2",
            [findUserRound.rows[i].id, selectUserNum.rows[j].num]
          );
          await db.query(
            "update userTicketRound set matched_count = matched_count + 1 where userTicketRound.id = $1",
            [findUserRound.rows[i].id]
          );
          console.log("correct num :", selectUserNum.rows[j].num);
        } else {
          await db.query(
            "update userTicketNum set is_matched = false  where userTicketNum.ticket_id = $1 and num = $2 ",
            [findUserRound.rows[i].id, selectUserNum.rows[j].num]
          );
          console.log("wrong num :", selectUserNum.rows[j].num);
        }
      }
    }
    for (let i = 0; i < findUserRound.rows.length; i++) {
      await db.query(
        "update userTicketRound set match_checked = true where userTicketRound.id = $1",
        [findUserRound.rows[i].id]
      );
      if (findUserRound.rows[i].matched_count == 6) {
        await db.query(
          "update usersinfo set coinamount = coinamount + 100000 where usersinfo.id = $1",
          [req.session["user"].id]
        );
      } else if (findUserRound.rows[i].matched_count == 5) {
        await db.query(
          "update usersinfo set coinamount = coinamount + 50000 where usersinfo.id = $1",
          [req.session["user"].id]
        );
      } else if (findUserRound.rows[i].matched_count == 4) {
        await db.query(
          "update usersinfo set coinamount = coinamount + 9000 where usersinfo.id = $1",
          [req.session["user"].id]
        );
      } else if (findUserRound.rows[i].matched_count == 3) {
        await db.query(
          "update usersinfo set coinamount = coinamount + 2000 where usersinfo.id = $1",
          [req.session["user"].id]
        );
      }
    }
  } catch (error) {
    console.error(error.message);
  }
  res.json({ result: "new round submit" });
});

app.use("/user", isLoggedIn, express.static("protected"));
app.use(userRoute);

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/public/index-backup.html"));
});

// app.use((req, res) => {
//     console.log(req.method,req.url);

//     res.sendFile(path.join(__dirname,'public','index-backup.html'))
// })

// this app.get is calling data from usersinfo to a json format.
// a separate JS file will be used with profile.html in order to push the data to front-end.
// note: to be assessed whether the entire usersinfo will be disclosed after user logged in or not (data security)
app.get("/user", async (req, res) => {
  try {
    console.log(req.session["user"]);
    const result = await db.query("select * from usersinfo where id = $1", [
      req.session["user"].id,
    ]);
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

// calling data from HKJCMarkSixResult to a json format.
app.get("/HKJCMarkSixResult", async (req, res) => {
  try {
    const result = await db.query("select * from HKJCMarkSixResult");
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/lotteryRound", async (req, res) => {
  try {
    const result = await db.query("select id from lotteryRound");
    const data = result.rows;
    res.json(data);
    console.log("lottery round found ");
  } catch (error) {
    console.error(error.message);
  }
});

// calling data from lotteryResult to a json format.
app.get("/lotteryresult", async (req, res) => {
  try {
    const result = await db.query("select * from lotteryresultnum");
    const data = result.rows;
    res.json({data});
  } catch (error) {
    console.error(error.message);
  }
});

// calling data from ticket to a json format.
// "isLoggedIn" provides a method where data would only be accessed if the user is logged in.
// "...= $1, [req.session["user"].id]" provides a method where data would only show user's information.
app.get("/ticket", isLoggedIn, async (req, res) => {
  try {
    const result = await db.query("select * from ticket where id = $1", [
      req.session["user"].id,]);
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

// calling data from Jackpot to a json format.
app.get("/jackpot", async (req, res) => {
  try {
    const result = await db.query("select * from Jackpot");
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

// match players' tickets with draw results
// app.get("/matchedresults", async (req,res) => {
//     try {
//         const result = await db.query("");
//         const data = result.rows;
//         res.json(data);
//     } catch (error) {
//         console.error(error.message);
//     }
// })

app.listen(env.PORT, () => {
  console.log(`listening on http://localhost:${env.PORT}`);
});
