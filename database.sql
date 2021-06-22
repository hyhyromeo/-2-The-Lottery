create database luckysix;
DROP TABLE if exists UsersInfo,
HKJCMarkSixResult,
lotteryResult,
ticket,
Jackpot CASCADE;
-- This table us user information
create table if not exists UsersInfo (
    ID serial,
    UserName varchar(255) unique not null,
    Password varchar(255) ,
    email varchar(255) unique not null,
    CoinAmount integer default 500,
    create_at VARCHAR(255) default now(),
    last_login VARCHAR(255),
    google_access_token VARCHAR(255),
    Primary Key(ID)
);

create table if not exists Jackpot(
    ID serial primary key,
    RoundID int,
    Date DATE,
    Amount int,
    winner_User_ID int unique
);
create table if not exists lotteryRound(
    ID serial primary key,
    lottery_date TIMESTAMP  ,
    create_date TIMESTAMP,
    update_date TIMESTAMP
);
INSERT INTO lotteryRound (lottery_date, create_date,update_date)
VALUES('2021-04-07 18:00:00',now(),now());

create table if not exists lotteryResultNum(
    ID serial primary key,
    lottery_round_ID INT NOT NULL,
    foreign key (lottery_round_ID) REFERENCES lotteryRound (id),
    num INTEGER,
    create_date TIMESTAMP,
    update_date TIMESTAMP
);
create table if not exists userTicketRound(
    ID serial primary key,
    round_ID INT NOT NULL,
    foreign key (round_ID) REFERENCES lotteryRound (id),
    user_ID INTEGER,
    foreign key (user_ID) REFERENCES UsersInfo (id),
    buy_Date Date DEFAULT NOW()::DATE,
    match_checked Boolean default false,
    matched_count INT default 0,
     create_date TIMESTAMP,
    update_date TIMESTAMP
);
create table if not exists userTicketNum(
    ID serial primary key,
    round_ID INT NOT NULL,
    foreign key (round_ID) REFERENCES lotteryRound (id),
    num INTEGER,
    user_ID INTEGER,
    foreign key (user_ID) REFERENCES UsersInfo (id),
    ticket_ID INTEGER,
     foreign key (ticket_ID) REFERENCES userTicketRound (id),
    is_matched boolean default false,
     create_date TIMESTAMP,
    update_date TIMESTAMP
);


-- matching result 
SELECT lottery.numid,
    ticketFin.roundid,
    lotteryFin.num,
    lotteryFin.roundid
FROM ticketFin
    INNER JOIN lotteryFin on ticketFin.numid = lotteryFin.num;

-----------------------------