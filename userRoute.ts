import express, { Request, Response } from 'express';
import { db } from './db';
import { checkPassword, hashPassword } from './hash';
import fetch from 'node-fetch';

export let userRoute = express.Router();
userRoute.post('/logout', logout);
userRoute.post('/login', login);
userRoute.post('/register', register);
// userRoute.get('/login/google', loginGoogle);
userRoute.get('/google', loginGoogle);

userRoute.get('/current_user', (req, res) => res.json(req.session?.['user']));




export function logout(req: Request, res: Response) {
  req.session['user'] = false
  res.status(200).end()
}
export async function login(req: express.Request, res: express.Response) {
  console.log('login :', req.body);

  let result = await db.query(`select * from usersinfo where username = $1`, [
    req.body.username,
  ])
  console.log('after query');

  if (result.rows.length === 0) {
    res.status(403.1).end('wrong username')
    return
  }
  let user = result.rows[0]
  if (!user.password) {
    res.status(403.2).end(`User didn't sign-up with password`)
    return
  }
  let matched = await checkPassword(req.body.password, user.password)
  console.log('after check password');

  if (!matched) {
    res.status(403.3).end('wrong username or password')
    return
  }
  delete user.password
  req.session['user'] = user
  let loginDate = new Date();// update last login time after logout
  let localDate = loginDate.toString();
  console.log(loginDate);
  await db.query(`update usersinfo set last_login = $1 where email = $2`, [localDate, user.email]);
  ;
  console.log(user);

  res.status(200).redirect('/profile/profile.html')

}

export async function register(req: express.Request, res: express.Response) {
  let username = req.body.username
  if (!username) {
    res.status(401).end('missing username')
    return
  }
  let password = req.body.password
  if (!password) {
    res.status(402).end('missing password')
    return
  }
  let email = req.body.email
  if (!email) {
    res.status(403).end('Email is required')
    return
  }
  let password2 = req.body.password2
  if (password != password2) {
    res.status(405).end('Password not match!!')
    return
  }

  if (password.length < 6) {
    res.status(406).end('Password should be at least 6 digitals')
    return
  }
  let checkDoubleUser = await db.query(
    'select * from usersinfo where email = $1',[email],
  )
  console.log(checkDoubleUser);
  
  if(checkDoubleUser.rowCount === 1){
    res.status(407).end('Your Email is already registered')
    return
  }
  let passwordHash = await hashPassword(password)
  let result = await db.query(
    `insert into usersinfo (username,password,email) values ($1,$2,$3)`,
    [username, passwordHash, email],
  )
  if (result.rowCount === 1) {
    res.status(201).end('Created User')
  } else {
    console.log(result)
    res.status(500).end('Failed to create user')
  }
}
type GoogleResult = {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
  hd: string
}

export async function loginGoogle(req: express.Request, res: express.Response) {
  console.log(req.session)
  const accessToken = req.session?.['grant'].response.access_token

  console.log("101")
  console.log(accessToken)
  const fetchRes = await fetch(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  // console.log(fetchRes);

  const fetchResult: GoogleResult = await fetchRes.json()
  console.log("113")
  console.log(fetchResult);

  let dbResult = await db.query(`select * from usersinfo where email = $1`, [
    fetchResult.email,
  ])
  let user = dbResult.rows[0]
  console.log(user);


  // if this user is new comer
  if (!user) {
    dbResult = await db.query(
      `insert into usersinfo (username,email, google_access_token) values ($1,$2,$3) returning *`,
      [fetchResult.name, fetchResult.email, accessToken],
    )
    req.session['user'] = dbResult.rows[0]
    res.redirect('/profile/profile.html')
    let loginDate = new Date();// update last login time after logout
    let localDate = loginDate.toString();
    console.log(loginDate);
    await db.query(`update usersinfo set last_login = $1 where email = $2`, [localDate, user.email]);
    return
  }

  await db.query(`update usersinfo set google_access_token = $1 where id = $2`, [
    accessToken,
    user.id,
  ])
  user.google_access_token = accessToken
  delete user.password
  req.session['user'] = user
  let loginDate = new Date();// update last login time after logout
  let localDate = loginDate.toString();
  console.log(loginDate);
  await db.query(`update usersinfo set last_login = $1 where email = $2`, [localDate, user.email]);
  res.redirect('/profile/profile.html')

}





